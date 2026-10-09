#!/usr/bin/env python3
"""为每个中文路由生成 /en/ 英文镜像，并给双方加 hreflang / og:locale / keywords。

SEO 要求「一个 URL 对应一种语言」。本站主语言是中文（根路径），英文走 /en/ 前缀。
本脚本在 vite build 之后、预渲染之前跑：

1. 枚举 dist 下所有 index.html（相对 dist 的目录 = 路由），排除已有的 /en/。
2. 中文页：加 hreflang、og:locale=zh_CN、og:locale:alternate=en_US、中文 keywords。
3. 复制成 /en/<route>/index.html：lang=en、canonical=/en/、og:locale=en_US、
   英文 keywords。

预渲染随后按路径渲染出对应语言的内容（LanguageContext 按路径判语言）。
"""
import datetime
import glob
import os
import re
import sys

DIST = sys.argv[1] if len(sys.argv) > 1 else "dist"
ORIGIN = "https://vgoapp.com"

# 每个路由的中/英关键词（缺失的路由用所在产品的通用词）
KEYWORDS = {
    "/": {
        "zh": "VGO,本地优先,AI 工具,效率工具,开发者工具,Mac 软件,MDDock,MacSlim,RemoteCrab",
        "en": "VGO, local-first, AI tools, productivity tools, developer tools, macOS apps, MDDock, MacSlim, RemoteCrab",
    },
    "/macslim/": {
        "zh": "Mac 清理,缓存清理,NPM 缓存,Docker 清理,Xcode DerivedData,进程管理,应用卸载,系统优化,MacSlim",
        "en": "Mac cleaner, cache cleanup, npm cache, Docker cleanup, Xcode DerivedData, process manager, app uninstaller, macOS optimization, MacSlim",
    },
    "/remotecrab/": {
        "zh": "iPhone 摄像头,电脑摄像头,无线麦克风,iPhone 触控板,iPhone 键盘,网络摄像头,远程控制,RemoteCrab",
        "en": "iPhone webcam, use iPhone as a webcam, wireless microphone, iPhone trackpad, iPhone keyboard, remote control, RemoteCrab",
    },
}
PRODUCT_FALLBACK = {
    "/macslim/": KEYWORDS["/macslim/"],
    "/remotecrab/": KEYWORDS["/remotecrab/"],
}


def keywords_for(route: str, lang: str) -> str:
    if route in KEYWORDS:
        return KEYWORDS[route][lang]
    for prefix, kw in PRODUCT_FALLBACK.items():
        if route.startswith(prefix):
            return kw[lang]
    return KEYWORDS["/"][lang]


def set_meta(html: str, name: str, value: str, attr: str = "name") -> str:
    """替换或插入 <meta name/property="..."> 标签。"""
    pat = re.compile(rf'<meta {attr}="{re.escape(name)}" content="[^"]*"\s*/?>')
    tag = f'<meta {attr}="{name}" content="{value}" />'
    if pat.search(html):
        return pat.sub(tag, html, count=1)
    return html.replace("</head>", f"    {tag}\n  </head>", 1)


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

    # 中文页：og:locale + 中文 keywords
    html = set_meta(html, "og:locale", "zh_CN", attr="property")
    html = set_meta(html, "og:locale:alternate", "en_US", attr="property")
    html = set_meta(html, "keywords", keywords_for(route, "zh"))
    open(f, "w", encoding="utf-8").write(html)

    # 英文镜像：lang / canonical / og:locale / keywords
    en_html = html.replace('<html lang="zh-CN">', '<html lang="en">', 1)
    en_html = re.sub(
        r'(rel="canonical" href=")[^"]*(")',
        lambda m: m.group(1) + en_url + m.group(2),
        en_html,
        count=1,
    )
    en_html = set_meta(en_html, "og:locale", "en_US", attr="property")
    en_html = set_meta(en_html, "og:locale:alternate", "zh_CN", attr="property")
    en_html = set_meta(en_html, "keywords", keywords_for(route, "en"))
    en_dir = os.path.join(DIST, en_route.strip("/"))
    os.makedirs(en_dir, exist_ok=True)
    open(os.path.join(en_dir, "index.html"), "w", encoding="utf-8").write(en_html)

# 生成完整 sitemap.xml（全部路由 + 双语 hreflang 备用链接）
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
