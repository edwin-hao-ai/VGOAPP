import type { Language } from './translations'

export interface FeatureStep {
  title: string
  body: string
}

export interface FeatureDetailItem {
  title: string
  body: string
}

export interface FeaturePageContent {
  slug: string
  nav: { back: string }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    bullets: string[]
  }
  problem: { title: string; body: string }
  how: { title: string; description: string; steps: FeatureStep[] }
  details: { title: string; description: string; items: FeatureDetailItem[] }
  tips: { title: string; description: string; items: string[] }
  requires: { title: string; items: string[]; note: string }
  next: { title: string; body: string; cta: string; href: string }
  cta: { title: string; body: string; download: string; ios: string }
}

const ORDER = [
  'notifications',
  'extended-display',
  'camera',
  'microphone',
  'screen-mirror',
  'trackpad',
  'keyboard',
  'voice',
  'app-switcher',
  'transfer',
  'automation',
] as const

export type FeatureSlug = (typeof ORDER)[number]

export const FEATURE_ORDER: FeatureSlug[] = [...ORDER]

export const FEATURE_SLUGS: Record<FeatureSlug, string> = {
  notifications: 'notifications',
  'extended-display': 'extended-display',
  camera: 'camera',
  microphone: 'microphone',
  'screen-mirror': 'screen-mirror',
  trackpad: 'trackpad',
  keyboard: 'keyboard',
  voice: 'voice',
  'app-switcher': 'app-switcher',
  transfer: 'transfer',
  automation: 'automation',
}

const zh: Record<FeatureSlug, FeaturePageContent> = {
  notifications: {
    slug: 'notifications',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '通知中继',
      title: '电脑上的通知,手机上收;点一下就跳回去',
      subtitle:
        '不用再盯着电脑。通知像本机通知一样弹在 iPhone 上;点一下,电脑立刻切回发通知的那个应用和窗口。',
      bullets: [
        '通知横幅实时送到 iPhone,不丢不延迟',
        '点通知,电脑切到对应应用,并把你带到那个窗口',
        '隐私类应用默认不转发,名单可以自己改',
      ],
    },
    problem: {
      title: '「刚才电脑上弹了什么?」',
      body:
        '跑一个长任务、等一次构建、等同事回消息,你却不敢离开电脑 —— 走开就错过,回来还得一个个窗口翻。手机上明明有通知中心,为什么电脑上的通知来不了?',
    },
    how: {
      title: '打开开关就行',
      description: '在电脑端偏好设置里打开「转发通知到 iPhone」,之后完全自动。',
      steps: [
        { title: '打开开关', body: '电脑端 → 偏好设置 → 通知,打开「转发通知到 iPhone」。' },
        { title: '照常工作', body: '电脑上出现的通知横幅会同时出现在 iPhone 上,并进入 App 内的通知列表。' },
        { title: '点一下就回去', body: '点通知,电脑立刻切到发通知的应用和它当时那个窗口,接着干活。' },
      ],
    },
    details: {
      title: '它怎么工作',
      description: '基于系统通知横幅,实时、无感。',
      items: [
        { title: '实时转发', body: '电脑上弹出的横幅,同一时刻出现在手机上 —— 不是轮询,也不是延迟汇总。' },
        { title: '点在应用上,而不只是应用', body: '点通知会激活发通知的应用,并把它当时那个窗口取消最小化、提到最前;应用已经退出则什么都不做,不打扰你。' },
        { title: '隐私应用默认不转发', body: '信息、邮件、微信、1Password 等默认不进转发名单,可在偏好设置里增删。' },
        { title: '只转发横幅', body: '专注模式(勿扰)下不弹出的通知不会被捕获 —— 和你屏幕上看到的一致。' },
        { title: '内容不出局域网', body: '通知只在你自己的 WiFi 里传输,不经过任何服务器。' },
        { title: 'App 里还有一个收件箱', body: '错过也没关系:转发过的通知都在 App 的通知列表里,点任意一条同样能跳回那个窗口。' },
      ],
    },
    tips: {
      title: '什么时候最好用',
      description: '尤其是「等一个后台任务」。',
      items: [
        '**等 Agent / 等构建**:任务跑完的通知落到手机上,点一下直接回到那个窗口,接着下一条指令。',
        '**离开工位**:在会议室、厨房、沙发上,重要通知一条都不漏。',
        '**多机切换**:手机就在手上,不用反复走回电脑前。',
        '**专注不被打断**:通知收在手机上,电脑屏幕保持干净,不弹窗打断你。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '电脑需要授予「辅助功能」权限(用于读取通知横幅)',
      ],
      note: '通知文本只在你的两台设备之间传输,不经过任何服务器;不想用了,关掉开关即可。',
    },
    next: {
      title: '通知能追着你走,顺便还能控制电脑',
      body: '通知让你不用回电脑前看结果;而应用切换器让你直接在手机上把电脑上那个 App 提到面前。',
      cta: '看应用切换器 →',
      href: '/remotecrab/features/app-switcher/',
    },
    cta: {
      title: '让通知找到你',
      body: '下载 Mac 版,打开通知转发,把手机放到一边试试。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  'extended-display': {
    slug: 'extended-display',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '第二显示器',
      title: '让 iPhone 变成你的第二块屏幕',
      subtitle:
        '电脑上多出一块真实的虚拟显示器。把窗口拖过去,再用手上的 iPhone 直接操作它 —— 躺着看文档、当副屏放消息、当演讲备注机,都可以。',
      bullets: [
        '不用再花几百块买一台副屏显示器',
        '系统「显示器」设置里会出现它,和真显示器一模一样',
        '可以只显示某一个 App 窗口,也可以显示整个桌面',
      ],
    },
    problem: {
      title: '副屏是笔记本电脑最贵的配件',
      body:
        '一块 27 寸副屏要两三百块,占掉半张桌子,只能固定在一个角度,接线还永远打成一团。而你手上这台 iPhone —— 抽屉里躺着、吃灰、每天早上还在充电 —— 它的屏幕、触控、电池,一样都不缺。',
    },
    how: {
      title: '三步多出一块屏幕',
      description: '从零到把窗口拖过去,通常不到一分钟。',
      steps: [
        { title: '连上你的设备', body: 'iPhone 和电脑在同一个 WiFi 下,RemoteCrab 自动配对连接。' },
        { title: '打开「扩展屏」', body: '在 iPhone 顶部工具栏点一下扩展屏图标,电脑上会立刻多出一块显示器。' },
        { title: '把窗口拖过去', body: '在电脑的「显示器」设置里选中新屏幕,把 App 窗口拖上去,手机就变成那块屏了。' },
      ],
    },
    details: {
      title: '不只是「多一块屏」',
      description: '扩展屏真正的价值在于:你在手机上用手指和触控板,像操作一块真的屏幕那样操作电脑上的那个窗口。',
      items: [
        { title: '自动跟随当前 App', body: '在电脑上切到哪个 App,手机就跟着显示哪个 App 的窗口,不用手动选。' },
        { title: '钉住某一个窗口', body: '如果你只想盯着 Slack 或者某个终端,把它钉住,之后它就一直在那里。' },
        { title: '一键切到整个桌面', body: '不想看某个 App 的时候,直接显示整个桌面,和「显示桌面」是同一种操作。' },
        { title: '缩放、适配、放大', body: '双指捏合可以局部放大,双击可以放大或还原,「填充/适应」可以切换画面铺满还是完整显示。' },
        { title: '修饰键随便用', body: '按住 ⌘⌥⌃⇧ 之后,下面的点按、拖拽、滚动都会带上修饰键 —— 和真触控板一模一样。' },
        { title: '横屏沉浸', body: '横过来用的时候界面会自动收起多余的部分,只留画面,给你一整块屏幕。' },
      ],
    },
    tips: {
      title: '别人不会想到的用法',
      description: '这些是真正每天都会用上的场景。',
      items: [
        '**躺在床上看长文**:电脑架在床头,文档铺在 iPhone 上,手不用离开屏幕。',
        '**盯消息不打断工作**:把 Slack 或微信挂在副屏上,眼角扫一眼就走。',
        '**演讲备注屏**: Keynote 演讲时把提词器放在手机上,只给自己看。',
        '**当第二块参数面板**:一边写代码,一边开着日志或文档。',
        '**出差只带电脑和手机**:一块 6.1 寸的屏,比带个显示器轻松。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        'iPhone 或 iPad 均可,iPad 屏幕更大,当副屏更合适',
        '两台设备在同一个 WiFi 下',
      ],
      note: '扩展屏只在你点开它的时候才会创建,关掉就没有了 —— 不会一直占着资源,也不会影响电脑的正常使用。',
    },
    next: {
      title: '把整个电脑窗口搬到手机上',
      body: '扩展屏是「多一块屏」;屏幕镜像更进一步 —— 手机上看到的是电脑上任意一个 App 的窗口,而且可以直接用手指在上面点、拖、滚、捏合。',
      cta: '看屏幕镜像 →',
      href: '/remotecrab/features/screen-mirror/',
    },
    cta: {
      title: '现在就把那块副屏省下来',
      body: '下载 Mac 版,在 iPhone 上装好,两台设备几秒就能连上。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  camera: {
    slug: 'camera',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '虚拟摄像头',
      title: '让你的 iPhone 出现在摄像头列表里',
      subtitle:
        '在 Zoom、Teams、FaceTime、OBS 里,「RemoteCrab Camera」和任何普通摄像头一模一样 —— 以 4K(3840×2160)30 帧输出,视频用硬件编码,不占用 CPU。',
      bullets: [
        '任何 App 都能直接选到,不用改任何设置',
        '以 4K 30 帧输出,视频用硬件 H.264 编码',
        '4K 输出,细节比普通 1080p 摄像头更清楚',
        '手机架在哪儿,画面就从哪儿拍',
      ],
    },
    problem: {
      title: '笔记本摄像头是上个时代的',
      body:
        '大多数笔记本的摄像头只有 720p,逆光下糊成一片,会议室里只能拍到你的后脑勺。想换个角度?插一根线。而你口袋里那台手机,后置摄像头通常比电脑好一个档次 —— 唯一的问题是,系统不认识它。',
    },
    how: {
      title: '两分钟接上',
      description: '装一次,之后在所有 App 里都能直接选到。',
      steps: [
        { title: '装好并连接', body: 'iPhone 和电脑连上之后,按引导打开「虚拟摄像头」。' },
        { title: '在系统里授权', body: '第一次会弹窗,确认安装相机扩展(仅需一次)。' },
        { title: '在任何 App 里选它', body: '打开摄像头的下拉菜单,选「RemoteCrab Camera」。' },
      ],
    },
    details: {
      title: '它到底做了什么',
      description: '不是「截屏再模拟」,是真的把 iPhone 的摄像头接到系统的摄像头接口上。',
      items: [
        { title: '真正的系统级摄像头', body: '通过 macOS 的相机扩展机制注册,系统、App Store 的 App、第三方软件都认。' },
        { title: '硬件编码,不烧 CPU', body: '用 iPhone 的硬件编码器压成 H.264 再传,所以电脑这边几乎不吃性能。' },
        { title: '4K 输出', body: '摄像头对外的格式是 4K(3840×2160)30 帧。手机送到电脑后由虚拟摄像头以 4K 输出,细节比 1080p 摄像头更清楚 —— 想让细节最实,把手机端的视频分辨率也设为 4K。' },
        { title: '前后摄像头随时切', body: '在手机上切换前后摄像头,电脑端的 App 立刻跟着变。' },
        { title: '也能当直播输入', body: 'OBS 里把它加进「视频采集设备」,就是一个真实的第二机位。' },
        { title: '延迟很低', body: '局域网直连 + 硬件编解码,实测延迟在一两百毫秒量级,日常开会完全够用。' },
        { title: '可以只当麦克风用', body: '不想让画面过?单独关掉画面,只留声音。' },
      ],
    },
    tips: {
      title: '几个真正常见的用法',
      description: '不一定非得是会议。',
      items: [
        '**当第二机位**:笔记本摄像头拍全景,手机架在旁边拍特写。',
        '**临时当监控**:把手机立在门口,电脑上看整个房间。',
        '**拍白板 / 文档**:手机贴着桌子拍,画面比电脑摄像头稳得多。',
        '**给孩子上课拍手写**:手机架在桌角,电脑上看投影。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '第一次使用需要确认安装相机扩展',
      ],
      note: '镜头对着人时,系统会显示标准的相机使用指示。手机锁屏或切到后台时,相机会自动停止。',
    },
    next: {
      title: '画面有了,声音呢?',
      body: '同样地,RemoteCrab 也能把你的 iPhone 变成一个全系统可用的虚拟麦克风 —— 任何会议软件、录音软件都能直接选到。',
      cta: '看虚拟麦克风 →',
      href: '/remotecrab/features/microphone/',
    },
    cta: {
      title: '把手机接进你的会议软件',
      body: '下载 Mac 版,授权一次,之后在摄像头列表里就能看到它。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  microphone: {
    slug: 'microphone',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '虚拟麦克风',
      title: '让你的 iPhone 变成一个系统麦克风',
      subtitle:
        '装一个签名并经 Apple 公证的驱动,iPhone 立刻出现在「系统设置 › 声音 › 输入」里 —— Zoom、Teams、微信会议、录音软件,全部通用。',
      bullets: [
        '真正驱动级的设备,不是软件里的一层壳',
        '签名 + Apple 公证,不修改系统文件',
        '任何录音和会议软件都能直接选到',
      ],
    },
    problem: {
      title: '隔着屏幕说话,别人听不清',
      body:
        '电脑的麦克风阵列是朝着屏幕的,你一往后靠就全被背对着了。会议室里更尴尬 —— 笔记本放在桌子中间,所有人共享一个几米外的麦克风。于是每个人都靠耳机,或者干脆听不清。',
    },
    how: {
      title: '装一个驱动,然后选它',
      description: '整个过程在应用里点几下就行,只有安装驱动那一步需要输密码。',
      steps: [
        { title: '打开「虚拟麦克风」', body: '在 iPhone 上点开,电脑端会出现安装引导。' },
        { title: '确认安装驱动', body: '需要输入一次管理员密码。驱动是签名并经 Apple 公证的,随时可以在系统设置里停用。' },
        { title: '在软件里选它', body: '打开任何会议或录音软件的音频设置,输入设备里就有「RemoteCrab Microphone」。' },
      ],
    },
    details: {
      title: '为什么它和「虚拟摄像头」不一样',
      description: '摄像头可以靠系统的扩展机制,麦克风不行 —— 这也是为什么这里需要装一个真正的驱动。',
      items: [
        { title: '代码签名 + Apple 公证', body: '驱动经过签名和公证,系统不会拦它,也不会报「无法验证开发者」。' },
        { title: '不改动系统文件', body: '它是一个独立的音频插件包,装在标准的音频插件目录里,卸载就是删掉。' },
        { title: '随时可撤销', body: '不想要了,卸载驱动包、重启一次音频服务,电脑就回到原样。' },
        { title: '标准采样率', body: '48 kHz,任何会议和录音软件都能直接吃,不需要转码。' },
        { title: '可以脱离电脑摆放', body: '手机架在桌子另一头、对着你说话,效果比对着屏幕说好得多。' },
        { title: '后台也能用', body: '手机切到后台或锁屏时,麦克风依然在传输 —— 你不需要一直盯着它。' },
      ],
    },
    tips: {
      title: '聪明的摆法',
      description: '位置比设备本身更影响听感。',
      items: [
        '**放在会议桌中央**:所有人对着手机说话,比对着一个远处的笔记本麦克风清楚太多。',
        '**手机横过来靠墙**:利用一点混响,比贴着嘴干说自然。',
        '**当手写白板的讲解麦**:边写边讲,不用来回调整电脑位置。',
        '**录制网课/播客**:手机架在高处,离声源远一点反而减少齿音。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '安装驱动时需要一次管理员密码',
      ],
      note: '首次安装后需要重启一次音频服务,之后所有 App 都会长期记住这个输入设备。',
    },
    next: {
      title: '不用手,直接说',
      body: '按住手机上的按钮说话,端侧语音识别会把它变成电脑上正在输入的文字 —— 包括中文。',
      cta: '看按住说话 →',
      href: '/remotecrab/features/voice/',
    },
    cta: {
      title: '让所有人都听清你',
      body: '下载 Mac 版,跟着引导装一次驱动,之后在任何会议软件里都能直接选到。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  'screen-mirror': {
    slug: 'screen-mirror',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '屏幕镜像与操控',
      title: '把电脑上的窗口搬到手机上,直接用手指操作',
      subtitle:
        '不是投屏看 —— 是真的能操作。点一下就是点击,拖一下就是拖动,双指就是滚动,捏合就是缩放。',
      bullets: [
        '默认跟随电脑上当前的前台 App',
        '点按、拖拽、滚轮、捏合、双击全都支持',
        '修饰键能加在任何一次操作上',
      ],
    },
    problem: {
      title: '「投屏」通常只能看,不能碰',
      body:
        '大多数投屏工具是把画面镜像过去,你在手机上怎么划都没用,还得跑过去碰电脑。而你真正想要的是:手上这台屏幕,就是一个能操作的副屏。',
    },
    how: {
      title: '打开就能用',
      description: '默认行为是「自动跟随」—— 电脑上切到哪个 App,手机就跟着显示哪个。',
      steps: [
        { title: '点开镜像', body: 'iPhone 顶部工具栏里点一下镜像图标,画面就出来了。' },
        { title: '随便操作', body: '点一下是点击,长按是右键,双击是选中,单指拖是拖动,双指拖是滚动。' },
        { title: '需要时切窗口', body: '点窗口按钮可以钉住某一个窗口,或者切换到整个桌面。' },
      ],
    },
    details: {
      title: '手势对照表',
      description: '这些都在手机上的镜像界面里完成,和触控板的手感一致。',
      items: [
        { title: '单指点按 = 单击', body: '落在窗口里的哪个位置,就在那个位置点击 —— 不是相对移动。' },
        { title: '长按 / 双指点按 = 右键', body: '和真触控板一样,弹右键菜单。' },
        { title: '单指拖 = 拖动', body: '拖窗口、拖文件、拖选文字,都可以。' },
        { title: '双指拖 = 滚动', body: '自动判断是滚动还是移动画面,不会互相打架。' },
        { title: '捏合 = 局部缩放', body: '可以放大某个区域看细节,双击可以放大或还原。' },
        { title: '修饰键 = 任何操作加键', body: '按住 ⌘ / ⌥ / ⌃ / ⇧,接下来的点击、拖拽都会带上它。' },
      ],
    },
    tips: {
      title: '什么时候最好用',
      description: '镜像和扩展屏的区别,就在于「你要不要在它上面动手」。',
      items: [
        '**站在远处演示**:投到手上,不用来回走回电脑。',
        '**手机架着,人在走动**:看着手机上显示的画面,顺手点一下。',
        '**临时救火**:电脑被人占着,先用手机把那边的事情处理掉。',
        '**当第二块屏 + 第二套输入**:扩展屏是「多一块屏」,镜像是「这块屏也能操作」。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '电脑需要授予「屏幕录制」权限(用于捕捉窗口画面)',
      ],
      note: '隐私上你可以随时关掉:不让它跟随,或者直接停用屏幕录制权限,画面就消失了。',
    },
    next: {
      title: '同样的画面,做成真正的第二块屏',
      body: '如果你不想操作,只想「多一块一直显示着的东西」,扩展屏更合适 —— 它会作为一个真实的显示器出现在系统里。',
      cta: '看扩展屏 →',
      href: '/remotecrab/features/extended-display/',
    },
    cta: {
      title: '把电脑装进口袋',
      body: '下载 Mac 版,把当前窗口搬到手上,试试直接在上面拖一下。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  trackpad: {
    slug: 'trackpad',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '触控板',
      title: '一块真正好用的无线触控板',
      subtitle:
        '不是把手指当成鼠标。更接近真触控板的行为:相对移动、加速曲线、拖拽离合、三指手势、修饰键,以及会跟着你手指回弹的预览点。',
      bullets: [
        '拖拽、滚动、右键、缩放、旋转全都有',
        '长按拖拽和「离合」,让大范围选字不再受屏幕大小限制',
        '手势和修饰键都自带触觉反馈',
      ],
    },
    problem: {
      title: '手机触控板最大的问题是「会飘」',
      body:
        '很多无线触控板直接把手指位移换算成鼠标位移,手指一离开屏幕,电脑上的光标就停在了一个很奇怪的位置,想接着操作必须重新找。而你真正想要的其实很简单:手指按住的位置,电脑上的光标就在哪。',
    },
    how: {
      title: '切到触控板就行',
      description: '连上之后顶部工具栏点一下触控板图标,手机立刻变成一块触控板。',
      steps: [
        { title: '连上设备', body: '两台设备在同一个 WiFi 下自动配对。' },
        { title: '打开触控板', body: '在 iPhone 上点一下触控板按钮。' },
        { title: '像真的触控板一样用', body: '移动、拖拽、滚动、右键、三指手势,都在下面的修饰键栏里有对应。' },
      ],
    },
    details: {
      title: '它做的几件细事',
      description: '这些是「能用」和「好用」的分界线。',
      items: [
        { title: '相对移动,不是绝对定位', body: '光标不会因为手指位置而突然跳走,移动是有加速度的。' },
        { title: '快速滑动会加速', body: '慢拖是精准的,快甩才会走很远 —— 和真触控板同一套曲线。' },
        { title: '拖拽离合', body: '拖到一半想抬手重新按?按住不放,0.8 秒内单指落回屏幕,拖拽会继续 —— 不需要重新开始。' },
        { title: '长按拖拽', body: '长按 0.45 秒就进入拖拽模式,不用非得双击。' },
        { title: '两指滚动 / 右键', body: '两指上下是滚动,两指点按是右键。' },
        { title: '三指与四指手势', body: '三指上下切换全屏应用,四指切换桌面 —— 和系统默认一致。' },
        { title: '修饰键会锁定', body: '⌘⌥⌃⇧ 都能单独锁住,拖一大段文字时不用一直用另一只手按着。' },
      ],
    },
    tips: {
      title: '让它更好用的三个小动作',
      description: '',
      items: [
        '**用长按拖拽**:别去找双击的时间差,直接长按更稳。',
        '**滑动中轻点一下**:会立刻停住,不会误触发一次点击。',
        '**锁住 ⌘ 再拖**:一次性选中一大段,或者 ⇧ 加点击扩展选区。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '电脑需要授予「辅助功能」权限(用于发送鼠标和键盘事件)',
      ],
      note: '所有权限都能在系统设置里随时撤销,撤销之后触控板会立刻停止发送事件。',
    },
    next: {
      title: '要打很多字?',
      body: '同样的手势,换成键盘模式就是一块完整的输入设备 —— 中文输入法和听写都能用。',
      cta: '看键盘 →',
      href: '/remotecrab/features/keyboard/',
    },
    cta: {
      title: '试试离合拖拽',
      body: '下载 Mac 版,把手机变成触控板,先试着选一段长文字。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  keyboard: {
    slug: 'keyboard',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '键盘',
      title: '把手机变成一块完整键盘',
      subtitle:
        '系统输入法直接调用,中文拼音、繁体、emoji、候选词全都有;文字落在电脑的光标处,⌘C / ⌘V / ⌘Z 行为完全一致。',
      bullets: [
        '系统级输入法,不是自己画的键盘',
        '中文、听写、emoji 都能用',
        '还有一排常用快捷键和一块迷你触控板',
      ],
    },
    problem: {
      title: '「能不能中文输入」是及格线',
      body:
        '很多远程键盘方案只能打英文 —— 字母能出来,想输中文就没辙了。真正好用的远程输入,应该就是系统那个输入法,你能打什么,在电脑上就能打什么。',
    },
    how: {
      title: '点一下就调起系统键盘',
      description: '切到键盘模式,点输入框,系统键盘自己会出来。',
      steps: [
        { title: '打开键盘模式', body: '在 iPhone 上点底部的键盘按钮。' },
        { title: '点一下输入框', body: '系统输入法自动弹出,和平时用 iPhone 一模一样。' },
        { title: '直接打', body: '文字会实时出现在电脑上光标所在的位置。' },
      ],
    },
    details: {
      title: '不只是打字',
      description: '常用操作也做进了界面里,不用记快捷键。',
      items: [
        { title: '系统输入法', body: '拼音、候选词、繁体、emoji、符号,以及系统听写 —— 都是原生能力。' },
        { title: '快捷键栏', body: '⌘C / ⌘V / ⌘Z / ⌘⇥ 这些高频的,一排按钮直接点。' },
        { title: '修饰键', body: '⌘ ⌥ ⌃ ⇧ 可以锁住,打字时按住它们,文字会带上修饰键送过去。' },
        { title: '迷你触控板', body: '键盘界面里就有一块,移动光标不用来回切界面。' },
        { title: '改写选中的文字', body: '选中一段之后可以让它全大写、去多余空格、变成列表。' },
        { title: '不会输错位置', body: '输入是按顺序补齐的,不会出现「删掉前面的字」这种诡异行为。' },
      ],
    },
    tips: {
      title: '几个真正常用的组合',
      description: '把几个功能叠起来用,效率提升最明显。',
      items: [
        '**⌘⇥**:在电脑的应用之间切换,手机在左手边就能完成。',
        '**⌘⌥I**:快速退格删除,比一个个按退格快。',
        '**按住说话 + 键盘**:大段中文直接说,说完再补几个字。',
        '**选中改写**:复制一段话到 iPhone 上,一键转成大写或列表,再贴回电脑。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '电脑需要授予「辅助功能」权限(用于发送按键事件)',
      ],
      note: '语音识别在手机本地完成,音频不会上传到任何服务器。',
    },
    next: {
      title: '不想打,直接说',
      body: '按住一个按钮说话,端侧识别会把它变成文字 —— 长句、停顿、中英混说都可以。',
      cta: '看按住说话 →',
      href: '/remotecrab/features/voice/',
    },
    cta: {
      title: '试着用它打一段中文',
      body: '下载 Mac 版,连上手机,点一下输入框试试。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  voice: {
    slug: 'voice',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '按住说话',
      title: '按住一个按钮,说话就变成了文字',
      subtitle:
        '端侧语音识别,中英文都可以。说完松开,文字已经出现在电脑上了 —— 长句、中间停顿、说完再补一句,都不会乱。',
      bullets: [
        '识别在手机本地完成,音频不上传',
        '中间停顿不会断,不会把上一句吃掉',
        '长段落也不会丢字或重复',
      ],
    },
    problem: {
      title: '语音输入最烦的是「说完就没了」',
      body:
        '很多语音输入工具,你说到一半停下来想一下,它就把刚说的全丢了;或者你补充一句,它把前面的重打一遍。用两次就不想用了。',
    },
    how: {
      title: '按住,说,松开',
      description: '和手机自带的语音输入一样的用法,只是输出到电脑上。',
      steps: [
        { title: '按住 PTT', body: '底部那个宽按钮,按住不放。' },
        { title: '正常说', body: '可以停顿、可以说长句、可以说完再补一句。' },
        { title: '松开', body: '松开按钮,最终文本会被送到电脑的光标处。' },
      ],
    },
    details: {
      title: '为什么它比想象中好用',
      description: '底下是几个专门处理过的细节。',
      items: [
        { title: '停顿不会断', body: '说一半停下来想,它会先把这句定下来,后面接着说就行 —— 不会重说一遍。' },
        { title: '长句不丢字', body: '说到几十秒会自动分段落续上,不会漏字也不会重复。' },
        { title: '纯端侧识别', body: '音频不出手机,没有「上传中」那一秒延迟。' },
        { title: '优先用新引擎', body: '如果系统上装了对应的语音模型,它会自动用上更新的那个,更准也更稳。' },
        { title: '说完才写进去', body: '还没松开之前不会往电脑里灌字,所以说错了可以先停。' },
        { title: '说话时让出其他功能', body: '按住说话的时候,视频和镜像会暂时让路,保证识别不被抢占。' },
      ],
    },
    tips: {
      title: '用得更顺的几个点',
      description: '识别效果一半靠模型,一半靠你怎么用。',
      items: [
        '**按段落说**:想清楚一段再按下一段,比一口气说三分钟准得多。',
        '**中英混说没问题**:它能听出哪段该用英文。',
        '**说完补一句**:可以按住接着说,不会覆盖前面的。',
        '**当草稿用**:先说出来整理思路,再去电脑里改 —— 比空想快。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '首次使用需要授予「语音识别」权限',
      ],
      note: '如果系统里已经装好了对应的语音模型,会自动使用更新的识别引擎;没有的话会用标准引擎,不会去下载任何东西。',
    },
    next: {
      title: '说完之后呢?',
      body: '可以让电脑执行一些事 —— 调音量、调亮度、锁屏、启动某个 App,都在情景模式里。',
      cta: '看情景模式 →',
      href: '/remotecrab/features/automation/',
    },
    cta: {
      title: '按住说一句话试试',
      body: '下载 Mac 版,连上手机,按住底部的按钮说一句话。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  'app-switcher': {
    slug: 'app-switcher',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '应用切换器',
      title: '电脑上开着什么,手机上一点就到',
      subtitle:
        '电脑正在运行的 App 会实时出现在手机的切换器里,带图标和窗口数。点一下就切过去,还能看桌面、启动新应用。',
      bullets: [
        '电脑上的 App 列表实时同步',
        '点一下切换,点 X 退出',
        '还能直接启动电脑上装好的应用',
      ],
    },
    problem: {
      title: '「切到那个窗口」听起来简单',
      body:
        '当你人在远处、电脑在另一个房间的时候就不简单了。你要么走过去,要么用键盘快捷键一个一个试 —— 而你其实只是想看一眼那个 App。',
    },
    how: {
      title: '顶部工具栏一点',
      description: '列表是实时的,电脑上新开的 App 也会自动出现。',
      steps: [
        { title: '打开切换器', body: '顶部工具栏里的应用切换器图标。' },
        { title: '看到电脑上正在跑什么', body: '每个 App 有真实图标和窗口数量,当前在用的会高亮。' },
        { title: '点一下就过去', body: '或者点「桌面」把所有窗口收起来。' },
      ],
    },
    details: {
      title: '它能做的不只是切换',
      description: '',
      items: [
        { title: '真实应用图标', body: '图标是从电脑那边取的,不是通用占位图,认得出来。' },
        { title: '窗口数量', body: '一眼看出哪个 App 开了一堆窗口,哪个只有最小化的一个。' },
        { title: '点一下切前台', body: '等同于把那个 App 激活到最前面。' },
        { title: '关掉某个 App', body: '不想看它了,直接从这里退出。' },
        { title: '显示桌面', body: '一键把所有窗口收起来,干净的一屏。' },
        { title: '启动新应用', body: '从电脑里已安装的应用列表里直接启动,不用找图标。' },
      ],
    },
    tips: {
      title: '组合起来用',
      description: '这些单看平平,叠起来才是效率。',
      items: [
        '**站在投影旁边**演示:点一下就切,不用走回电脑。',
        '**会议中分享屏幕**时:临时切到某个 App 展示一下,再切回来。',
        '**当遥控器**:音量、亮度、媒体键也在同一排里。',
        '**离开电脑时**:一次性把该关的 App 都关掉。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
      ],
      note: '只会列出普通应用,不会包含系统组件;最小化或在其他桌面的 App 也会出现。',
    },
    next: {
      title: '把手上这台屏变成第二块',
      body: '切换器解决「够到哪个 App」;扩展屏解决「同时看到两个窗口」。',
      cta: '看扩展屏 →',
      href: '/remotecrab/features/extended-display/',
    },
    cta: {
      title: '把它当电脑遥控器',
      body: '下载 Mac 版,连上手机,试试从手机上切 App。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  transfer: {
    slug: 'transfer',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '传文件与剪贴板',
      title: '照片、文件和剪贴板,直接送到电脑',
      subtitle:
        '像 AirDrop 一样把照片和文件发到电脑上,自动存好并在访达里高亮显示;剪贴板也能两个方向互发。',
      bullets: [
        '照片和文件直发,自动存进下载文件夹',
        '支持一次选多个文件',
        '剪贴板双向同步,复制这边,粘贴那边',
      ],
    },
    problem: {
      title: '手机和电脑之间传东西,永远是最烦的一步',
      body:
        '微信、邮件、网盘、AirDrop —— 每个都有自己的道理。想把刚拍的照片发到电脑上,得先选中、压缩、上传、下载、再拖到文件夹里。剪贴板更荒唐:手机上复制的东西,电脑上要用得手动再输一遍。',
    },
    how: {
      title: '发文件',
      description: '和 AirDrop 一样,选中就发。',
      steps: [
        { title: '点发送按钮', body: '顶部工具栏里选照片或文件,可以多选。' },
        { title: '在电脑上等一下', body: '文件直接落到下载文件夹,访达会自动打开并高亮显示它。' },
        { title: '完成', body: '多个文件会依次发送,不会互相搞乱。' },
      ],
    },
    details: {
      title: '一些细节',
      description: '',
      items: [
        { title: '自动定位文件', body: '存到下载文件夹下的 RemoteCrab 子目录,不会散落一地。' },
        { title: '发完自动在访达里看到', body: '多发几个也只会打开一次,不会连续弹一堆窗口。' },
        { title: '支持多选', body: '一次选十张照片,按顺序依次传完。' },
        { title: '最近截图一键发', body: '刚截的图可以直接从分享面板发过来,不用先存到相册。' },
        { title: '剪贴板双向', body: '手机复制,电脑上直接粘贴;反过来也一样。' },
        { title: '文本改写', body: '选中的文字可以让它全大写、去空格、变成列表,再贴回去。' },
      ],
    },
    tips: {
      title: '几个省事的用法',
      description: '',
      items: [
        '**截图即发**:手机刚截的图,一步送到电脑。',
        '**电脑上写一半**:手机上复制一段,电脑上直接粘贴。',
        '**批量导入照片**:一次选几十张,传到电脑整理。',
        '**把手机上的网址发到电脑**:不用再手打一遍。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '从相册选取时需要「照片」权限',
      ],
      note: '文件是在两台设备之间直传的,不上传到任何服务器。',
    },
    next: {
      title: '除了文件,还能直接说话',
      body: '按住说话能把语音变成文字,输入长段落比打字快得多。',
      cta: '看按住说话 →',
      href: '/remotecrab/features/voice/',
    },
    cta: {
      title: '试试从手机发一张照片',
      body: '下载 Mac 版,连上手机,发一张照片到电脑试试。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },

  automation: {
    slug: 'automation',
    nav: { back: '← 所有功能' },
    hero: {
      eyebrow: '情景模式',
      title: '遥控器知道你正在用什么',
      subtitle:
        '电脑上的 App 一换,手机上的按键就跟着换一整套。做演示时是翻页和提词器,写代码时是终端和编辑器,会议时是麦克风和麦克风静音。',
      bullets: [
        '17 套按键方案,按当前 App 自动切换',
        '音量、亮度、媒体键、锁屏都能一键搞定',
        '还能直接启动电脑上的应用',
      ],
    },
    problem: {
      title: '一个遥控器,怎么按都对不上',
      body:
        '「下一页」在 Keynote 里是翻页,在 PDF 里是翻页,在浏览器里是滚屏;「隐藏」在终端里是清屏,在浏览器里是切窗口。做一个遥控器不难,难的是它知道你现在在什么软件里。',
    },
    how: {
      title: '它自己会切换',
      description: '不需要你手动选,电脑上的前台 App 变了,手机上的按键就变了。',
      steps: [
        { title: '点情景模式按钮', body: '手机左侧那个小按钮,打开当前 App 对应的方案。' },
        { title: '看看这一屏有什么', body: '常用操作会成对排列,比如音量左边小右边大。' },
        { title: '想换场景就切 App', body: '在电脑上换一个 App,手机上的方案自动跟着换。' },
      ],
    },
    details: {
      title: '包含哪些',
      description: '十七套方案覆盖了日常会用到的绝大多数场景。',
      items: [
        { title: '演示类', body: '演示文稿和幻灯片:翻页、提词器、激光笔、切换到演讲者视图。' },
        { title: '开发与终端', body: '终端、编辑器和 AI 工具:常用命令、新建标签、切换面板。' },
        { title: '会议与通话', body: '麦克风静音、挂断、切换摄像头、举手。' },
        { title: '播放器', body: '播放、暂停、快进、上一曲,以及音量。' },
        { title: '文档与写作', body: '查找替换、撤销、切换格式、保存。' },
        { title: '邮件与消息', body: '发送、新建、标记已读。' },
        { title: '系统控制', body: '音量增减、静音、屏幕亮度、锁屏、显示桌面。' },
        { title: '兜底的一套', body: '任何不在列表里的 App,都会落到一套通用的按键上。' },
      ],
    },
    tips: {
      title: '最有用的其实是系统那排',
      description: '很多人其实是冲着这几个来的。',
      items: [
        '**静音**:会议里最常按的一个,单独放在下面随时能点。',
        '**锁屏**:手机锁屏,电脑也一起锁,当你离开的时候。',
        '**显示桌面**:一键收起所有窗口,和系统快捷键一样。',
        '**亮度**:投影的时候把屏幕调暗,尤其是讲别人的屏幕的时候。',
        '**亮度 + 音量通常排成一对**:左右方向一致,不容易按错。',
      ],
    },
    requires: {
      title: '需要什么',
      items: [
        'macOS 26 或更高,Apple 芯片(M 系列)',
        'iOS / iPadOS 26 或更高',
        '两台设备在同一个 WiFi 下',
        '电脑需要授予「辅助功能」权限',
      ],
      note: '系统按键(音量、亮度、锁屏)通过系统定义的事件发出,不读取也不修改系统设置。',
    },
    next: {
      title: '从最基础的那块开始',
      body: '不管用不用得上情景模式,先看看最核心的那块:你的手机是怎么变成触控板的。',
      cta: '看触控板 →',
      href: '/remotecrab/features/trackpad/',
    },
    cta: {
      title: '把手机当成遥控器',
      body: '下载 Mac 版,连上手机,打开情景模式看看。',
      download: '下载 Mac 版',
      ios: 'App Store 下载 iPhone 版',
    },
  },
}

const en: Record<FeatureSlug, FeaturePageContent> = {
  notifications: {
    slug: 'notifications',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Notification relay',
      title: "Your computer's notifications, on your iPhone",
      subtitle:
        'Stop watching the screen. Banners arrive on your iPhone like local notifications — tap one and your computer jumps back to the app and window that sent it.',
      bullets: [
        'Banners relayed to the iPhone in real time',
        'Tap one to switch your computer to that app — and that window',
        'Privacy-sensitive apps are excluded by default; the list is yours to edit',
      ],
    },
    problem: {
      title: '“What just popped up on my computer?”',
      body:
        'You are waiting on a long task, a build, a reply — so you cannot leave the desk. Walk away and you miss it; come back and you dig through windows. Your phone has a notification centre. Why can’t your computer’s notifications reach it?',
    },
    how: {
      title: 'Flip one switch',
      description: 'Turn on “Forward notifications to iPhone” in the computer app’s preferences and it is fully automatic.',
      steps: [
        { title: 'Turn it on', body: 'Computer app → Preferences → Notifications → “Forward notifications to iPhone”.' },
        { title: 'Work as usual', body: 'Banners that appear on the computer also appear on the iPhone and land in the in-app inbox.' },
        { title: 'Tap to go back', body: 'Tap the notification and the computer switches to that app — and un-minimises and raises the window it was showing.' },
      ],
    },
    details: {
      title: 'How it works',
      description: 'Built on the system notification banners: live, and out of your way.',
      items: [
        { title: 'Relayed live', body: 'A banner that appears on the computer shows up on the phone at the same moment — not polled, not batched.' },
        { title: 'It lands on the window, not just the app', body: 'Tapping activates the sending app and brings the window it was showing to the front. If you already quit that app, nothing happens — no surprise launches.' },
        { title: 'Private apps are excluded by default', body: 'Messages, Mail, WeChat, 1Password and similar are not forwarded unless you add them. Edit the list in Preferences.' },
        { title: 'Banners only', body: 'Notifications suppressed by Do Not Disturb / Focus are not captured — the relay matches what you actually saw.' },
        { title: 'Nothing leaves your network', body: 'Notification text travels only over your own WiFi; there is no server in the path.' },
        { title: 'An inbox in the app', body: 'Missed one? Every relayed notification is in the app’s list, and tapping a row does the same jump.' },
      ],
    },
    tips: {
      title: 'When it shines',
      description: 'Especially “I am waiting on a background task”.',
      items: [
        '**Waiting on an agent or a build**: the finished-task banner reaches your phone; one tap puts you back in that window for the next instruction.',
        '**Away from the desk**: meetings, kitchen, sofa — nothing important slips by.',
        '**Less walking**: your phone is already in your hand.',
        '**Fewer interruptions**: notifications collect on the phone while the computer screen stays clean.',
      ],
    },
    requires: {
      title: 'What it needs',
      items: [
        'macOS 26 or later on Apple silicon',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi',
        'Accessibility permission on the computer (it reads the banners)',
      ],
      note: 'Notification text travels only between your own devices — never through a server. Turn the switch off and it stops.',
    },
    next: {
      title: 'Notifications follow you — and you can drive the computer too',
      body: 'The relay means you never have to walk back just to see a result; the app switcher brings that app to the front from your phone.',
      cta: 'See the app switcher →',
      href: '/remotecrab/features/app-switcher/',
    },
    cta: {
      title: 'Let notifications find you',
      body: 'Download the computer app, turn on forwarding, and leave the phone on the desk.',
      download: 'Download for Mac',
      ios: 'Get RemoteCrab on the App Store',
    },
  },

  'extended-display': {
    slug: 'extended-display',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Second display',
      title: 'Turn your iPhone into a second screen',
      subtitle:
        'A real virtual display appears on your computer. Drag a window onto it, then drive that window straight from the iPhone in your hand — reading in bed, keeping messages in view, or as a presenter note screen.',
      bullets: [
        'Stop spending a few hundred dollars on a second monitor',
        'It shows up in Displays settings exactly like a real one',
        'Show a single app window, or the whole desktop',
      ],
    },
    problem: {
      title: 'A second monitor is the most expensive accessory a laptop can have',
      body:
        'A 27-inch display costs a few hundred dollars, eats half the desk, only ever sits at one angle, and adds a cable to manage. Meanwhile the iPhone in the drawer — dust, charging every morning — has a screen, a touchscreen and a battery that are all still perfectly good.',
    },
    how: {
      title: 'A second screen in three steps',
      description: 'From nothing to a window on your phone usually takes under a minute.',
      steps: [
        { title: 'Connect your device', body: 'With both devices on the same WiFi, RemoteCrab pairs and connects automatically.' },
        { title: 'Turn on Extended Display', body: 'Tap the display icon in the toolbar on your iPhone. A new display appears on the computer immediately.' },
        { title: 'Drag a window across', body: 'Select the new display in Displays settings, drag a window onto it, and the phone becomes that screen.' },
      ],
    },
    details: {
      title: 'More than "one more screen"',
      description: 'The real value is that you can drive that window with your fingers and a trackpad, like a genuine display.',
      items: [
        { title: 'Follows the frontmost app', body: 'Switch apps on the computer and the phone follows automatically — no picking a window by hand.' },
        { title: 'Pin a single window', body: 'If you only care about Slack or one terminal, pin it and it stays put.' },
        { title: 'Jump to the whole desktop', body: 'Done with a given app? Show the entire desktop, exactly like Show Desktop.' },
        { title: 'Zoom, fit, magnify', body: 'Pinch to magnify a region, double-tap to zoom or reset, and toggle fill versus fit.' },
        { title: 'Modifiers anywhere', body: 'Hold ⌘⌥⌃⇧ and every tap, drag and scroll below carries them — like a real trackpad.' },
        { title: 'Immersive in landscape', body: 'Turn the phone sideways and the chrome gets out of the way, leaving the whole screen to the stream.' },
      ],
    },
    tips: {
      title: 'Uses people do not expect',
      description: 'These are the ones that end up in the daily routine.',
      items: [
        '**Reading long articles in bed** — laptop on the nightstand, document on the phone, hands never leaving the screen.',
        '**Watching messages without breaking flow** — park Slack on the second screen, glance, move on.',
        '**Presenter notes** — put your notes on the phone during a talk so only you can see them.',
        '**A second reference panel** — code on one screen, logs and docs on the other.',
        '**Travel light** — a 6.1-inch second screen beats carrying a monitor.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'An iPhone or iPad — the larger iPad screen makes a better second display',
        'Both devices on the same WiFi network',
      ],
      note: 'The virtual display is only created while you are using it and released when you close it, so it never sits around consuming resources.',
    },
    next: {
      title: 'Bring a whole window into your pocket',
      body: 'Extended Display gives you another screen. Screen mirror goes further: the phone shows any app window on the computer, and you can tap, drag, scroll and pinch on it directly.',
      cta: 'See screen mirror →',
      href: '/remotecrab/features/screen-mirror/',
    },
    cta: {
      title: 'Skip that second monitor',
      body: 'Download the desktop app, install it on your iPhone, and the two connect in seconds.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  camera: {
    slug: 'camera',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Virtual camera',
      title: 'Your iPhone shows up in the camera list',
      subtitle:
        'In Zoom, Teams, FaceTime and OBS, "RemoteCrab Camera" behaves like any other camera — 4K (3840×2160) at 30fps, hardware encoded, and almost no CPU cost.',
      bullets: [
        'Picked up by every app, no per-app setup',
        '4K 30fps, encoded in hardware with H.264',
        'Put the phone wherever the shot should be',
      ],
    },
    problem: {
      title: 'Laptop cameras belong to the previous decade',
      body:
        'Most laptop cameras are 720p, turn to mush in low light, and in a meeting room they frame the back of your head. Want a different angle? Then you are plugging in a cable. The camera on the phone in your pocket is usually a generation better — it just is not on the list, because the system has never heard of it.',
    },
    how: {
      title: 'Connected in two minutes',
      description: 'Install once, then pick it in every app from then on.',
      steps: [
        { title: 'Install and connect', body: 'Once your iPhone and computer are connected, turn on the virtual camera from the guided setup.' },
        { title: 'Approve the extension', body: 'The first time you will be asked to confirm installing the camera extension — one time only.' },
        { title: 'Pick it in any app', body: 'Open the camera menu in Zoom, Teams or FaceTime and choose "RemoteCrab Camera".' },
      ],
    },
    details: {
      title: 'What is actually happening',
      description: 'This is not a screenshot in a disguise — the phone camera is genuinely attached to the system camera interface.',
      items: [
        { title: 'A real system camera', body: 'Registered through the macOS camera extension mechanism, so the system, App Store apps and third-party tools all recognise it.' },
        { title: 'Hardware encoded', body: 'The iPhone compresses to H.264 in hardware before sending, so the computer barely does any work.' },
        { title: 'Front or back, instantly', body: 'Flip the camera on the phone and the app on the computer follows right away.' },
        { title: 'Works as a live input', body: 'Add it to OBS as a video capture device and you have a genuine second camera angle.' },
        { title: 'Low latency', body: 'Direct LAN transport plus hardware encode and decode keeps it in the low hundreds of milliseconds — fine for meetings.' },
        { title: 'Audio only, if you prefer', body: 'Turn the picture off and keep just the microphone.' },
      ],
    },
    tips: {
      title: 'Beyond the meeting',
      description: 'It does not have to be about calls.',
      items: [
        '**A real second angle** — laptop camera for the wide shot, phone on a stand for the close-up.',
        '**Temporary surveillance** — stand the phone by the door and watch the room from the computer.',
        '**Whiteboards and documents** — phone flat on the desk, far steadier than a laptop camera.',
        '**Recording a class** — phone in the corner of the desk, watch it back on the computer.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'A one-time confirmation to install the camera extension',
      ],
      note: 'macOS shows the standard camera-in-use indicator whenever the lens is live. The camera stops automatically when the phone locks or the app is backgrounded.',
    },
    next: {
      title: 'Now for the audio side',
      body: 'The same idea applies to microphones: your iPhone becomes a system-wide input device that any meeting or recording app can select.',
      cta: 'See the virtual microphone →',
      href: '/remotecrab/features/microphone/',
    },
    cta: {
      title: 'Plug your phone into your meeting apps',
      body: 'Download the desktop app, approve once, and it will be waiting in the camera list.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  microphone: {
    slug: 'microphone',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Virtual microphone',
      title: 'Your iPhone becomes a system microphone',
      subtitle:
        'Install a signed, Apple-notarised driver and the iPhone appears under System Settings › Sound › Input — working in Zoom, Teams, FaceTime and every recording app.',
      bullets: [
        'A real driver-level device, not a shim inside one app',
        'Signed and notarised by Apple, and it does not touch system files',
        'Selectable in any recording or meeting app',
      ],
    },
    problem: {
      title: 'Talking across the room means nobody can hear you',
      body:
        'A laptop microphone array points at the screen, so the moment you lean back you are talking away from it. In a meeting room it is worse: the laptop sits in the middle of the table and everyone shares a microphone several metres away. So everyone puts on headphones, or nobody hears a thing.',
    },
    how: {
      title: 'Install a driver, then pick it',
      description: 'Everything happens in the app, and only the driver step asks for a password.',
      steps: [
        { title: 'Open Virtual Microphone', body: 'Tap it on the iPhone and the computer will offer to walk you through installing it.' },
        { title: 'Confirm the install', body: 'It asks for your administrator password once. The driver is signed and notarised, and you can disable it in System Settings at any time.' },
        { title: 'Select it in your app', body: 'Open the audio settings of any meeting or recording app and "RemoteCrab Microphone" is in the input list.' },
      ],
    },
    details: {
      title: 'Why this one needs a driver',
      description: 'Cameras can ride on the system extension mechanism. Microphones cannot — which is why there is a real driver here.',
      items: [
        { title: 'Code signed and notarised', body: 'The driver is signed and notarised, so the system does not block it with an "cannot verify developer" error.' },
        { title: 'No system files modified', body: 'It is a standalone audio plug-in package installed in the standard plug-in directory. Uninstalling means deleting it.' },
        { title: 'Revoke whenever you like', body: 'Changed your mind? Remove the package, restart the audio service, and the computer is back to how it was.' },
        { title: 'Standard sample rate', body: '48 kHz, so every meeting and recording app takes it without conversion.' },
        { title: 'Place it away from the computer', body: 'Stand the phone at the other end of the table facing you. Far better than talking at a screen.' },
        { title: 'Keeps working in the background', body: 'Audio keeps flowing when the phone is locked or backgrounded — you never have to watch it.' },
      ],
    },
    tips: {
      title: 'Placement matters more than the device',
      description: 'Where you put the phone changes the result more than which phone it is.',
      items: [
        '**Middle of the table** — everyone talks to the phone instead of a distant laptop mic, and it is dramatically clearer.',
        '**Lay it flat near a wall** — a little reflected room sound beats a dry mic right against your mouth.',
        '**Narrating a whiteboard** — talk and write without adjusting the computer at all.',
        '**Recording a class or podcast** — slightly above and back from the source reduces plosives.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'One administrator password to install the driver',
      ],
      note: 'The audio service restarts once after the first install; after that every app remembers the input device.',
    },
    next: {
      title: 'Do not type — just say it',
      body: 'Hold the button on your phone and on-device speech recognition turns it into text at the computer cursor, Chinese included.',
      cta: 'See hold to talk →',
      href: '/remotecrab/features/voice/',
    },
    cta: {
      title: 'Make sure everyone can hear you',
      body: 'Download the desktop app, install the driver once, and it will be selectable in every meeting app.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  'screen-mirror': {
    slug: 'screen-mirror',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Screen mirror and control',
      title: 'Put a window on your phone — and actually use it',
      subtitle:
        'Not a viewer. Tap it and it clicks, drag it and it drags, two fingers scroll, pinch to zoom. It behaves like the trackpad you already know.',
      bullets: [
        'Follows the frontmost app on the computer by default',
        'Tap, drag, scroll, pinch and multi-click all work',
        'Modifiers apply to any of those operations',
      ],
    },
    problem: {
      title: 'Most mirroring is look-only',
      body:
        'Typical screen sharing mirrors the picture, and swiping on the phone does nothing — you still have to walk over and touch the computer. What you actually want is different: the screen in your hand should be a screen you can operate.',
    },
    how: {
      title: 'Open it and go',
      description: 'The default is auto-follow: whatever app is frontmost on the computer shows up on the phone.',
      steps: [
        { title: 'Open the mirror', body: 'Tap the mirror icon in the toolbar on your iPhone. The picture appears.' },
        { title: 'Just operate it', body: 'Tap to click, long-press or two-finger tap for right-click, double-tap to select, one finger to drag, two fingers to scroll.' },
        { title: 'Switch target when needed', body: 'The window button lets you pin a specific window, or switch to the whole desktop.' },
      ],
    },
    details: {
      title: 'Gesture reference',
      description: 'All of it happens on the mirrored image, and it matches trackpad feel.',
      items: [
        { title: 'Single tap = click', body: 'It clicks where you land — absolute, not relative.' },
        { title: 'Long press or two-finger tap = right-click', body: 'The context menu appears, exactly as on a trackpad.' },
        { title: 'One-finger drag = drag', body: 'Move windows, drag files, select text.' },
        { title: 'Two-finger drag = scroll', body: 'It works out whether you meant to scroll or to pan the view, and does not fight itself.' },
        { title: 'Pinch = magnify a region', body: 'Zoom into detail, double-tap to zoom or reset.' },
        { title: 'Modifiers = any operation plus keys', body: 'Hold ⌘ / ⌥ / ⌃ / ⇧ and the next tap or drag carries them.' },
      ],
    },
    tips: {
      title: 'When it is the right tool',
      description: 'The difference between mirror and extended display is whether you intend to touch it.',
      items: [
        '**Presenting from across the room** — cast to your hand instead of walking back to the computer.',
        '**Standing, phone on a stand** — watch the mirrored view and reach over to tap it.',
        '**Emergency remote work** — the computer is taken; handle something over there from the phone first.',
        '**Second screen plus second input** — extended display is "one more screen"; the mirror is "a screen I can also use".',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'Screen Recording permission on the computer, used to capture the window',
      ],
      note: 'The privacy story is simple: stop following, or revoke Screen Recording, and the picture is gone.',
    },
    next: {
      title: 'The same view, as a genuine second screen',
      body: 'If you do not need to interact and just want something that is always there, extended display is the better tool — it registers as a real display in the system.',
      cta: 'See extended display →',
      href: '/remotecrab/features/extended-display/',
    },
    cta: {
      title: 'Put the computer in your pocket',
      body: 'Download the desktop app, pull a window onto your phone, and try dragging something on it.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  trackpad: {
    slug: 'trackpad',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Trackpad',
      title: 'A wireless trackpad that actually feels right',
      subtitle:
        'Not a finger pretending to be a mouse. It behaves like a real trackpad: relative movement, an acceleration curve, a drag clutch, multi-finger gestures, modifiers, and an on-screen dot that springs back to centre when you lift off.',
      bullets: [
        'Drag, scroll, right-click, pinch, rotate — all of it',
        'Long-press drag and a clutch, so big selections are not capped by screen size',
        'Gestures and modifiers both come with haptics',
      ],
    },
    problem: {
      title: 'The reason phone trackpads drift',
      body:
        'A lot of wireless trackpads map finger displacement straight to mouse movement, so the moment you lift your finger the cursor is stranded somewhere odd and you have to find it again. What you actually want is simpler: wherever you press, the cursor should be there.',
    },
    how: {
      title: 'Switch to trackpad and go',
      description: 'Once connected, tap the trackpad icon in the toolbar.',
      steps: [
        { title: 'Connect', body: 'Both devices on the same WiFi, paired automatically.' },
        { title: 'Open the trackpad', body: 'Tap the trackpad button on the iPhone.' },
        { title: 'Use it like a real trackpad', body: 'Move, drag, scroll, right-click and multi-finger gestures are all in the modifier bar below.' },
      ],
    },
    details: {
      title: 'The small things that make it good',
      description: 'These are the line between works and works well.',
      items: [
        { title: 'Relative, not absolute', body: 'The cursor never jumps because of where your finger happens to be — it moves, with acceleration.' },
        { title: 'Fast flicks accelerate', body: 'Slow drags stay precise; quick swipes travel far. The same curve a real trackpad uses.' },
        { title: 'Drag clutch', body: 'Need to reposition mid-drag? Keep the button held and put one finger back down within 0.8 seconds and the drag continues — no restart.' },
        { title: 'Long-press to drag', body: 'Hold for 0.45 seconds to start dragging, rather than hunting for a double-tap.' },
        { title: 'Two-finger scroll and right-click', body: 'Two fingers up and down scrolls; a two-finger tap opens the context menu.' },
        { title: 'Three- and four-finger gestures', body: 'Three fingers switch apps, four switch Spaces — matching the system defaults.' },
        { title: 'Lockable modifiers', body: '⌘⌥⌃⇧ can each be latched, so selecting a long passage does not need a second hand.' },
      ],
    },
    tips: {
      title: 'Three habits that make it better',
      description: '',
      items: [
        '**Use long-press to drag** — forget the double-tap timing, it is far more reliable.',
        '**Tap once mid-swipe** — it brakes immediately instead of registering as a click.',
        '**Latch ⌘ then drag** — selects a large block in one go, or ⇧-click to extend a selection.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'Accessibility permission on the computer, used to send pointer and key events',
      ],
      note: 'Every permission can be revoked in System Settings, and the trackpad stops sending events immediately when you do.',
    },
    next: {
      title: 'Need to type a lot?',
      body: 'The same gestures in keyboard mode make a full input device — system IME and dictation included.',
      cta: 'See keyboard →',
      href: '/remotecrab/features/keyboard/',
    },
    cta: {
      title: 'Try the drag clutch',
      body: 'Download the desktop app, turn the phone into a trackpad, and try selecting a long passage of text.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  keyboard: {
    slug: 'keyboard',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Keyboard',
      title: 'Turn your phone into a full keyboard',
      subtitle:
        'It calls the system input method directly, so pinyin, traditional Chinese, emoji and dictation all work. Text lands at the computer cursor, and ⌘C / ⌘V / ⌘Z behave exactly as they should.',
      bullets: [
        'A system input method, not a keyboard drawn by an app',
        'Chinese, dictation and emoji all work',
        'A row of common shortcuts and a mini trackpad built in',
      ],
    },
    problem: {
      title: 'Being able to type Chinese is the baseline',
      body:
        'A lot of remote keyboard solutions only manage English — letters come out, and then you cannot type anything else. A remote input that is genuinely useful should just be the system keyboard: whatever you can type on the phone, you can type on the computer.',
    },
    how: {
      title: 'One tap brings up the system keyboard',
      description: 'Switch to keyboard mode and tap the field — the system keyboard appears by itself.',
      steps: [
        { title: 'Open keyboard mode', body: 'Tap the keyboard button at the bottom of the iPhone.' },
        { title: 'Tap the input field', body: 'The system input method appears automatically, exactly as it does on the phone.' },
        { title: 'Just type', body: 'Text appears live at the cursor position on the computer.' },
      ],
    },
    details: {
      title: 'It is more than typing',
      description: 'The common operations are built into the interface so you do not have to remember shortcuts.',
      items: [
        { title: 'The system input method', body: 'Pinyin, candidate words, traditional Chinese, emoji, symbols and system dictation — all native.' },
        { title: 'Shortcut bar', body: '⌘C, ⌘V, ⌘Z, ⌘⇥ and friends, one tap away.' },
        { title: 'Modifiers', body: '⌘ ⌥ ⌃ ⇧ can be latched, and typed text then carries those modifiers to the computer.' },
        { title: 'Mini trackpad', body: 'There is one in the keyboard view, so you can move the cursor without switching surfaces.' },
        { title: 'Rewrite a selection', body: 'Select text and turn it all caps, strip the extra spaces, or make it a list.' },
        { title: 'No stray corrections', body: 'Input is reconciled at the tail, so you never get the unnerving effect of text you already typed being deleted.' },
      ],
    },
    tips: {
      title: 'Combinations worth learning',
      description: 'Stacking these is where the speed-up really is.',
      items: [
        '**⌘⇥** — switch apps on the computer without going near it.',
        '**⌘⌥I** — quick forward delete, much faster than repeated backspace.',
        '**Hold to talk plus keyboard** — dictate a long Chinese paragraph, then type the few missing words.',
        '**Select and rewrite** — pull a paragraph onto the phone, uppercase it or turn it into a list, then paste it back.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'Accessibility permission on the computer, used to send key events',
      ],
      note: 'Speech recognition runs on the phone. Audio is never uploaded anywhere.',
    },
    next: {
      title: 'Do not type it, say it',
      body: 'Hold the button and on-device recognition turns it into text — long sentences, pauses and mixed Chinese and English all fine.',
      cta: 'See hold to talk →',
      href: '/remotecrab/features/voice/',
    },
    cta: {
      title: 'Try typing some Chinese',
      body: 'Download the desktop app, connect the phone, and tap into a field.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  voice: {
    slug: 'voice',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Hold to talk',
      title: 'Hold one button and your speech becomes text',
      subtitle:
        'On-device recognition, Chinese and English. Release the button and the text is already on the computer — long sentences, pauses in the middle, and going back to add something all work.',
      bullets: [
        'Recognition happens on the phone; audio is never uploaded',
        'A pause mid-sentence does not drop what you said',
        'Long passages neither lose nor duplicate words',
      ],
    },
    problem: {
      title: 'The worst part of dictation is losing the take',
      body:
        'Many dictation tools throw away what you just said the moment you pause to think, or re-type everything when you add a sentence. You try it twice and stop using it.',
    },
    how: {
      title: 'Hold, speak, release',
      description: 'The same gesture as the built-in dictation button, except the output goes to your computer.',
      steps: [
        { title: 'Hold the button', body: 'The wide capsule at the bottom — just hold it.' },
        { title: 'Talk normally', body: 'Pause, run long, and add another thought afterwards if you like.' },
        { title: 'Release', body: 'The finalised text is sent to the cursor on the computer.' },
      ],
    },
    details: {
      title: 'Why it feels better than expected',
      description: 'A few details that were specifically engineered.',
      items: [
        { title: 'Pauses do not disconnect', body: 'Stop mid-thought and it commits that segment first, so you can carry on without repeating anything.' },
        { title: 'Long takes keep every word', body: 'Past a few dozen seconds it rolls the recogniser over at a natural boundary, with no dropped or duplicated words.' },
        { title: 'Fully on-device', body: 'Audio never leaves the phone, and there is no "uploading" second.' },
        { title: 'Uses the newer engine when present', body: 'If the matching on-device model is already installed, it uses the more accurate recogniser automatically.' },
        { title: 'Nothing is typed until you let go', body: 'Text is not pushed to the computer while you are still holding, so you can stop and rethink mid-sentence.' },
        { title: 'Other features yield while you talk', body: 'Video and the screen mirror step aside during dictation so the recogniser is not competing for hardware.' },
      ],
    },
    tips: {
      title: 'Getting better results',
      description: 'Half of it is the model, half is how you use it.',
      items: [
        '**Speak in paragraphs** — think through one piece, then start the next. Far more accurate than three unbroken minutes.',
        '**Mixing Chinese and English is fine** — it works out which language applies where.',
        '**Add a sentence afterwards** — keep holding and keep talking; it will not overwrite what came before.',
        '**Use it as a drafting tool** — say the messy first draft, then go edit it on the computer.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'Speech Recognition permission on first use',
      ],
      note: 'If the matching on-device speech model is already installed, the newer recognition engine is used automatically. Nothing is ever downloaded.',
    },
    next: {
      title: 'And after you have said it?',
      body: 'The computer can act on it — volume, brightness, lock the screen, launch an app — all from the context modes.',
      cta: 'See context modes →',
      href: '/remotecrab/features/automation/',
    },
    cta: {
      title: 'Hold the button and say something',
      body: 'Download the desktop app, connect the phone, hold the button at the bottom and say a sentence.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  'app-switcher': {
    slug: 'app-switcher',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'App switcher',
      title: 'Whatever is open on the computer, one tap away',
      subtitle:
        'Your running apps show up on the phone in real time, with their real icons and window counts. Tap to switch, swipe away to quit — and you can launch something new too.',
      bullets: [
        'The list stays in sync with the computer in real time',
        'Tap to switch, tap the close control to quit',
        'Launch apps that are already installed on the computer',
      ],
    },
    problem: {
      title: '"Switch to that window" is only easy when you are at the desk',
      body:
        'When you are across the room, it is not. You either walk over, or you cycle through keyboard shortcuts hoping to land on the right one — when all you wanted was to take a quick look at that app.',
    },
    how: {
      title: 'One tap in the toolbar',
      description: 'The list is live, so apps you just opened show up on their own.',
      steps: [
        { title: 'Open the switcher', body: 'The app switcher icon in the toolbar at the top.' },
        { title: 'See what is running', body: 'Every app has its real icon and window count, with the active one highlighted.' },
        { title: 'Tap to go there', body: 'Or tap Desktop to put every window away.' },
      ],
    },
    details: {
      title: 'It does more than switch',
      description: '',
      items: [
        { title: 'Real app icons', body: 'Icons come from the computer, so you recognise them instead of squinting at a generic placeholder.' },
        { title: 'Window counts', body: 'See at a glance which app has a dozen windows open and which one is just minimised.' },
        { title: 'Bring to the front', body: 'Tapping activates that app, same as clicking its dock icon.' },
        { title: 'Quit an app', body: 'Decided you are done with it? Close it from here.' },
        { title: 'Show the desktop', body: 'Put all the windows away in one tap, leaving a clean screen.' },
        { title: 'Launch a new app', body: 'Pick from the apps installed on the computer instead of hunting for the icon.' },
      ],
    },
    tips: {
      title: 'Using it in combination',
      description: 'Individually these are ordinary. Stacked, they add up.',
      items: [
        '**Presenting from beside the projector** — tap to switch instead of walking back to the computer.',
        '**Screen sharing in a meeting** — jump to an app to demonstrate, then jump back.',
        '**As a remote control** — volume, brightness and media keys sit in the same row.',
        '**Wrapping up** — quit everything you opened before you leave the desk.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
      ],
      note: 'Only regular applications are listed. Minimised apps and apps on other Spaces do appear.',
    },
    next: {
      title: 'Make the screen in your hand a second screen',
      body: 'The switcher answers "how do I reach that app". Extended display answers "how do I see two windows at once".',
      cta: 'See extended display →',
      href: '/remotecrab/features/extended-display/',
    },
    cta: {
      title: 'Use it as a remote control',
      body: 'Download the desktop app, connect the phone, and try switching apps from it.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  transfer: {
    slug: 'transfer',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Files and clipboard',
      title: 'Send photos, files and clipboard straight to the computer',
      subtitle:
        'AirDrop-style transfer straight into Downloads, with Finder highlighting it for you — and the clipboard syncs in both directions.',
      bullets: [
        'Photos and files land in a Downloads folder automatically',
        'Select and send several at once',
        'Clipboard syncs both ways — copy here, paste there',
      ],
    },
    problem: {
      title: 'Getting things between phone and computer is always the worst part',
      body:
        'Messaging apps, email, cloud drives, AirDrop — each with its own logic. To get a photo you just took onto the computer you select it, compress it, upload it, download it, and then drag it somewhere sensible. The clipboard is worse: anything you copied on the phone has to be retyped by hand on the computer.',
    },
    how: {
      title: 'Sending files',
      description: 'Like AirDrop: select, send, done.',
      steps: [
        { title: 'Tap send', body: 'Pick photos or files in the toolbar — multiple selections are fine.' },
        { title: 'Wait a moment on the computer', body: 'Files land in a RemoteCrab folder under Downloads, and Finder opens with them selected.' },
        { title: 'Done', body: 'Multiple files are sent in order and never interleave.' },
      ],
    },
    details: {
      title: 'The details',
      description: '',
      items: [
        { title: 'Filed automatically', body: 'They go into a RemoteCrab subfolder under Downloads, not scattered across the disk.' },
        { title: 'Revealed in Finder', body: 'Send a batch and Finder opens once, not a dozen times.' },
        { title: 'Multi-select', body: 'Pick thirty photos and they transfer one after another.' },
        { title: 'Send your latest screenshot', body: 'Straight from the share sheet, without saving to Photos first.' },
        { title: 'Clipboard both ways', body: 'Copy on the phone and paste on the computer; and the other direction works too.' },
        { title: 'Rewrite the text', body: 'Take a selection and make it all caps, trim it, or turn it into a list before pasting it back.' },
      ],
    },
    tips: {
      title: 'Ways it saves time',
      description: '',
      items: [
        '**Screenshot, straight over** — no detour through the photo library.',
        '**Writing on one device, typing on the other** — copy on the phone, paste on the computer.',
        '**Bulk importing photos** — select dozens and let them land in one go.',
        '**Moving a URL** — send the link from the phone instead of typing it out.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'Photos permission when picking from the library',
      ],
      note: 'Files travel directly between the two devices. Nothing is uploaded to a server.',
    },
    next: {
      title: 'Beyond files, you can just talk',
      body: 'Hold to talk turns speech into text, which beats typing for anything long.',
      cta: 'See hold to talk →',
      href: '/remotecrab/features/voice/',
    },
    cta: {
      title: 'Try sending a photo',
      body: 'Download the desktop app, connect the phone and send a photo across.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },

  automation: {
    slug: 'automation',
    nav: { back: '← All features' },
    hero: {
      eyebrow: 'Context modes',
      title: 'A remote that knows what you are using',
      subtitle:
        'When the frontmost app on the computer changes, the buttons on your phone change with it. Presentation controls while presenting, terminal shortcuts while in the editor, mic and mute during a call.',
      bullets: [
        'Seventeen button sets, switched automatically by frontmost app',
        'Volume, brightness, media keys and lock screen in one tap',
        'Can also launch apps on the computer',
      ],
    },
    problem: {
      title: 'No single remote has the right button',
      body:
        '"Next" advances a slide in Keynote, advances a page in a PDF and scrolls in a browser. "Hide" clears the terminal on one screen and switches windows in another. Building a remote is the easy part — knowing which software you are in is the hard part.',
    },
    how: {
      title: 'It switches by itself',
      description: 'You never pick a set manually; the buttons follow whatever you are using on the computer.',
      steps: [
        { title: 'Tap the modes button', body: 'The small button on the left of the phone opens the set for the current app.' },
        { title: 'See what is on offer', body: 'Related controls are paired — volume down sits next to volume up, for instance.' },
        { title: 'Change app, change set', body: 'Switch apps on the computer and the phone follows automatically.' },
      ],
    },
    details: {
      title: 'What is included',
      description: 'Seventeen sets covering the software you actually use.',
      items: [
        { title: 'Presentations', body: 'Keynote and PowerPoint: advance slides, presenter view, laser pointer, and talking points.' },
        { title: 'Developer and terminal', body: 'Terminals, editors and AI coding tools: common commands, new tabs, toggle panels.' },
        { title: 'Meetings and calls', body: 'Mute the mic, hang up, flip the camera, raise a hand.' },
        { title: 'Media', body: 'Play, pause, skip, and the volume controls alongside.' },
        { title: 'Documents and writing', body: 'Find and replace, undo, change formatting, save.' },
        { title: 'Mail and messages', body: 'Send, compose, mark as read.' },
        { title: 'System control', body: 'Volume up and down, mute, screen brightness, lock screen, show desktop.' },
        { title: 'A sensible fallback', body: 'Anything not in the list falls back to a general-purpose button set.' },
      ],
    },
    tips: {
      title: 'Honestly, the system row is the useful part',
      description: 'That is what most people come for.',
      items: [
        '**Mute** — the single most-pressed button in any meeting, given its own spot.',
        '**Lock the screen** — lock the phone and the computer together when you walk away.',
        '**Show desktop** — put every window away in one tap, same as the system shortcut.',
        '**Brightness** — dim the screen when projecting, especially when showing someone else their screen.',
        '**Brightness and volume are paired** — same left-right direction, so you stop pressing the wrong one.',
      ],
    },
    requires: {
      title: 'What you need',
      items: [
        'macOS 26 or later on Apple silicon (M-series)',
        'iOS / iPadOS 26 or later',
        'Both devices on the same WiFi network',
        'Accessibility permission on the computer',
      ],
      note: 'System controls (volume, brightness, lock) are sent as system-defined events, which read and change no system settings.',
    },
    next: {
      title: 'Start with the most fundamental one',
      body: 'However much you use the modes, start with the core: how the phone becomes a trackpad.',
      cta: 'See trackpad →',
      href: '/remotecrab/features/trackpad/',
    },
    cta: {
      title: 'Use the phone as a remote',
      body: 'Download the desktop app, connect the phone, and open the context modes.',
      download: 'Download for Mac',
      ios: 'Get the iPhone app',
    },
  },
}

export const remoteCrabFeatures: Record<Language, Record<FeatureSlug, FeaturePageContent>> = {
  zh,
  en,
}
