export default {
  nav: {
    home: '首页',
    blog: '博客',
    latest: '最新文章',
    categories: '分类',
    tools: '工具',
    games: '游戏',
    chat: '聊天',
    lab: '实验室'
  },
  tools: {
    frontend: '前端框架',
    dev: '开发工具',
    css: '样式资源',
    animation: '动画引擎',
    visual: '可视化工具',
    design: '设计资源',
    ai: 'AI工具',
    api: '接口服务'
  },
  header: {
    search: 'AI 搜索...',
    lab_desc: '实验室功能',
    light_mode: '切换亮色模式',
    dark_mode: '切换暗色模式',
    lang_zh: '切换中文',
    lang_en: '切换英文',
    profile: '个人中心',
    settings: '设置',
    logout: '退出登录'
  },
  blog: {
    latest_desc: '发现最新的技术分享、教程与行业洞察。',
    categories_desc: '按技术栈分类检索，快速找到你感兴趣的内容。'
  },
  // --- 新增的主页翻译区块 ---
  home: {
    hero: {
      badge: 'v2.0 · 更新了一点',
      title_prefix: '一些尝试',
      title_highlight: 'Just Trying Things',
      description: '不定期折腾：有用的、没用的、有趣的都放这。',
      primary_btn: '进去逛逛',
      secondary_btn: '随便看看'
    },
    features: {
      lab: {
        title: 'AI 实验',
        desc: '随便试试一些 AI 想法，能不能用另说，有意思就行。'
      },
      blog: {
        title: '技术记录',
        desc: '写点开发相关的东西，踩坑、经验，还有一些碎碎念。'
      },
      tools: {
        title: '小工具',
        desc: '做了一些自己会用到的小工具，顺手也放出来。'
      },
      games: {
        title: '小游戏',
        desc: '偶尔写点能玩的东西，不一定复杂，但应该挺有趣。'
      },
      chat: {
        title: '聊天室',
        desc: '随便聊聊技术或者别的，有人就聊，没人就放着。',
        action: '进来聊聊'
      }
    }
  },
  // -------------------------
  content: {
    recent_posts: '近期文章',
    recent_desc: '发现最新的技术见解和故事',
    view_all: '查看全部',
    tech: '技术',
    time_ago: '{n} 分钟前'
  },
  error: {
    title: '哎呀！页面未找到',
    subtitle: '抱歉，我们找不到您要查找的页面。它可能已被移动或删除。',
    back_home: '回到首页'
  },
  games: {
    title: '小游戏',
    intro: '几个可玩的小游戏，2048、贪吃蛇、推箱子，随时来一把。',
    just_play: '随便玩玩',
    new_stuff: '最近更新',
    categories: '分类',
    all: '全部',
    random: '随机一个',
    search_placeholder: '搜索游戏...',
    play_now: '开始游戏',
    how_to_play: '怎么玩',
    not_found: '未找到游戏',
    return_games: '返回游戏列表',
    demo_msg: '这只是一个演示！在真实场景中，游戏现在会加载出来。',
    no_games: '未找到任何游戏',
    no_games_desc: '未能找到符合您当前筛选条件的游戏，请尝试其他分类或搜索词。',
    clear_filters: '清除所有筛选'
  },
  login: {
    welcome: '欢迎回来',
    subtitle: '使用 admin / 123456 测试登录聊天室。',
    username: '用户名',
    username_placeholder: '输入 admin',
    password: '密码',
    password_placeholder: '输入 123456',
    remember_me: '记住我',
    forgot_password: '忘记密码？',
    signing_in: '登录中...',
    sign_in: '登录',
    back_home: '返回首页',
    login_failed: '登录失败',
    no_account: '还没有账号？',
    sign_up: '立即注册'
  },
  chat: {
    ai_personas: 'AI 智能体',
    live_rooms: '真人聊天室',
    public_channels: '公开频道',
    new_room: '+ 新建',
    online: '在线',
    live: '直播',
    ai_bot: 'AI 助手',
    login_required: '您必须登录才能参与实时聊天室。',
    login_btn: '登录以开始聊天',
    type_message: '输入消息...',
    welcome: '欢迎来到 Nexus Chat',
    welcome_desc: '从侧边栏选择一个专属 AI 角色开始对话，每个 AI 都深耕特定领域。也可以进入真人聊天室与全球开发者实时交流。',
    enter_room_name: '请输入新聊天室名称：',
    must_login: '您必须登录才能创建聊天室。',
    created_room: '创建了聊天室。',
    login_req_toast: '需要登录',
    room_1: '全球大厅',
    room_2: 'Vue 3 开发者',
    room_3: 'Tailwind CSS 技巧',
    sys_welcome: '欢迎来到全球大厅。',
    sys_mock_user: '嘿，大家好，你们最近在用什么框架？',
    sys_mock_random: '哈哈，是的，我完全同意。',
    ai_settings: 'AI 设置',
    clear_chat: '清空对话',
    api_not_configured: '请先配置硅基流动 API Key',
    go_to_settings: '前往设置',
    thinking: '思考中',
    api_error: '请求失败：',
    api_error_default: '网络错误，请检查 API Key 和网络连接'
  },
  settings: {
    back_chat: '返回聊天',
    title: 'AI 设置',
    subtitle: '配置您的 SiliconFlow API Key 以启用 AI 聊天功能。',
    api_key_label: 'SiliconFlow API Key',
    api_key_placeholder: 'sk-...',
    api_key_hint: '从 siliconflow.cn 获取免费 API Key',
    model_label: '模型',
    model_placeholder: 'Qwen/Qwen2.5-7B-Instruct',
    model_hint: '例如 Qwen/Qwen2.5-7B-Instruct、Pro/zai-org/GLM-4.7',
    api_key_required: 'API Key 不能为空',
    model_empty_error: '模型返回为空，请检查 API Key 和模型名称是否正确。',
    connection_failed: '连接失败',
    saved: '设置保存成功！',
    save: '保存设置',
    saving: '保存中...',
    test_connection: '测试连接',
    testing: '测试中...',
    hint: '您的 API Key 仅存储在本地浏览器中，不会发送至任何服务器。'
  },
  footer: {
    copyright: '© 2026 Southern Wind · 记录一些尝试'
  }
}