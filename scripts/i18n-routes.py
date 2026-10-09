#!/usr/bin/env python3
"""为每个中文路由生成 /en/ 英文镜像，并给双方加 hreflang。

SEO 要求「一个 URL 对应一种语言」。本站主语言是中文（根路径），英文走 /en/ 前缀。
本脚本在 vite build 之后、预渲染之前跑：

1. 枚举 dist 下所有 index.html（相对 dist 的目录 = 路由），排除已有的 /en/。
2. 给中文页加 hreflang（zh-Hans → 本页，en → /en/ 本页，x-default → 本页）。
3. 复制成 /en/<route>/index.html：把 <html lang> 改成 en、canonical 改成 /en/ 前缀。

预渲染随后按路径渲染出对应语言的内容（LanguageContext 按路径判语言）。
"""
import glob
import os
import re
import sys

DIST = sys.argv[1] if len(sys.argv) > 1 else "dist"
ORIGIN = "https://vgoapp.com"


def route_of(path: str) -> str:
    rel = os.path.relpath(path, DIST)  # macslim/index.html
    return "/" + rel[: -len("index.html")]  # /macslim/


zh_routes = []
for f in glob.glob(os.path.join(DIST, "**", "index.html"), recursive=True):
    route = route_of(f)
    if route.startswith("/en/"):
        continue
    zh_routes.append((f, route))

for f, route in sorted(zh_routes):
    html = open(f, encoding="utf-8").read()
    en_route = "/en" + route
    zh_url = ORIGIN + route
    en_url = ORIGIN + en_route

    hreflang = (
        f'    <link rel="alternate" hreflang="zh-Hans" href="{zh_url}" />\n'
        f'    <link rel="alternate" hreflang="en" href="{en_url}" />\n'
        f'    <link rel="alternate" hreflang="x-default" href="{zh_url}" />\n'
    )
    if "hreflang=" not in html:
        html = html.replace("</head>", hreflang + "  </head>", 1)
        open(f, "w", encoding="utf-8").write(html)

    # 英文镜像：改 lang + canonical
    en_html = html.replace('<html lang="zh-CN">', '<html lang="en">', 1)
    en_html = re.sub(
        r'(rel="canonical" href=")[^"]*(")',
        lambda m: m.group(1) + en_url + m.group(2),
        en_html,
        count=1,
    )
    en_dir = os.path.join(DIST, en_route.strip("/"))
    os.makedirs(en_dir, exist_ok=True)
    open(os.path.join(en_dir, "index.html"), "w", encoding="utf-8").write(en_html)

# 生成完整 sitemap.xml（全部路由 + 双语 hreflang 备用链接）
import datetime  # noqa: E402

today = datetime.date.today().isoformat()
out = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">',
]
for _f, route in sorted(zh_routes):
    en_route = "/en" + route
    depth = route.strip("/").count("/")
    pri = "1.0" if route == "/" else ("0.9" if depth == 0 else ("0.6" if depth >= 2 else "0.7"))
    for r in (route, en_route):
        out.append("  <url>")
        out.append(f"    <loc>{ORIGIN + r}</loc>")
        out.append(f"    <lastmod>{today}</lastmod>")
        out.append(f"    <priority>{pri}</priority>")
        out.append(
            f'    <xhtml:link rel="alternate" hreflang="zh-Hans" href="{ORIGIN + route}" />'
        )
        out.append(
            f'    <xhtml:link rel="alternate" hreflang="en" href="{ORIGIN + en_route}" />'
        )
        out.append("  </url>")
out.append("</urlset>")
open(os.path.join(DIST, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(out) + "\n")

print(f"i18n 路由生成完成：{len(zh_routes)} 个中文路由 + 对应英文镜像 + sitemap.xml")
