export default {
  nav: {
    home: 'Home',
    blog: 'Blog',
    latest: 'Latest Posts',
    categories: 'Categories',
    tools: 'Tools',
    games: 'Games',
    chat: 'Chat',
    lab: 'Bate'
  },
  tools: {
    frontend: 'Frontend Frameworks',
    dev: 'Developer Tools',
    css: 'CSS Resources',
    animation: 'Animation Engines',
    visual: 'Data Visualization',
    design: 'Design Resources',
    ai: 'AI Tools',
    api: 'API Services'
  },
  header: {
    search: 'AI Search...',
    lab_desc: 'Laboratory Features',
    light_mode: 'Light Mode',
    dark_mode: 'Dark Mode',
    lang_zh: 'Switch to Chinese',
    lang_en: 'Switch to English',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout'
  },
  blog: {
    latest_desc: 'Discover the latest technical insights and stories.',
    categories_desc: 'Browse by tech stack to find what you need.'
  },
  // --- 新增的主页翻译区块 ---
  home: {
    hero: {
      badge: 'v2.0 · Minor Updates',
      title_prefix: 'Just Trying',
      title_highlight: 'Things',
      description: 'A place for random builds — useful or not, serious or just for fun.',
      primary_btn: 'Explore',
      secondary_btn: 'Take a Look'
    },
    features: {
      lab: {
        title: 'AI Experiments',
        desc: 'Trying out random AI ideas — not always useful, but sometimes fun.'
      },
      blog: {
        title: 'Dev Notes',
        desc: 'Stuff about coding, bugs, and things I figured out along the way.'
      },
      tools: {
        title: 'Tools',
        desc: 'Small tools I built for myself, might be useful to you too.'
      },
      games: {
        title: 'Games',
        desc: 'A few simple games — nothing fancy, just for fun.'
      },
      chat: {
        title: 'Chat',
        desc: 'A place to talk about tech or anything else, if anyone’s around.',
        action: 'Join Chat'
      }
    }
  },
  // -------------------------
  content: {
    recent_posts: 'Recent Posts',
    recent_desc: 'Discover the latest technical insights and stories',
    view_all: 'View All',
    tech: 'Tech',
    time_ago: '{n} mins ago'
  },
  error: {
    title: 'Oops! Page Not Found',
    subtitle: "Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.",
    back_home: 'Back to Home'
  },
  games: {
    title: 'Games',
    intro: 'A few quick games to play — 2048, Snake, Sokoban. Pick one and go.',
    just_play: 'Just Play',
    new_stuff: 'New Stuff',
    categories: 'Categories',
    all: 'All',
    random: 'Random',
    search_placeholder: 'Search games...',
    play_now: 'Play Now',
    how_to_play: 'How to Play',
    intro: 'Introduction',
    not_found: 'Game not found',
    return_games: 'Return to Games',
    demo_msg: 'This is a demo! In a real scenario, this game would load now.',
    no_games: 'No games found',
    no_games_desc: 'We couldn\'t find any games matching your current filters. Try a different category or search term.',
    clear_filters: 'Clear All Filters'
  },
  login: {
    welcome: 'Welcome back',
    subtitle: 'Use admin / 123456 to access chat instances.',
    username: 'Username',
    username_placeholder: 'Enter admin',
    password: 'Password',
    password_placeholder: 'Enter 123456',
    remember_me: 'Remember me',
    forgot_password: 'Forgot your password?',
    signing_in: 'Signing in...',
    sign_in: 'Sign in',
    back_home: 'Back to Home',
    login_failed: 'Login failed',
    no_account: "Don't have an account?",
    sign_up: 'Sign up now'
  },
  chat: {
    ai_personas: 'AI Personas',
    live_rooms: 'Live Rooms',
    public_channels: 'Public Channels',
    new_room: '+ New',
    online: 'online',
    live: 'Live',
    ai_bot: 'AI Assistant',
    login_required: 'You must be logged in to participate in live rooms.',
    login_btn: 'Log in to Chat',
    type_message: 'Type a message...',
    welcome: 'Welcome to Nexus Chat',
    welcome_desc: 'Pick a specialized AI Persona from the sidebar — each is an expert in their own domain. Or join a Live Room to chat with real developers around the world.',
    enter_room_name: 'Enter new room name:',
    must_login: 'You must be logged in to create a room.',
    created_room: 'created the room.',
    login_req_toast: 'Login required',
    room_1: 'Global Lounge',
    room_2: 'Vue 3 Developers',
    room_3: 'Tailwind CSS Tips',
    sys_welcome: 'Welcome to the Global Lounge.',
    sys_mock_user: 'Hey everyone, what frameworks are you guys using lately?',
    sys_mock_random: 'Haha yeah I agree totally.',
    ai_settings: 'AI Settings',
    clear_chat: 'Clear Chat',
    api_not_configured: 'Please configure your SiliconFlow API Key first',
    go_to_settings: 'Go to Settings',
    thinking: 'Thinking',
    api_error: 'Request failed: ',
    api_error_default: 'Network error. Please check your API Key and connection.'
  },
  settings: {
    back_chat: 'Back to Chat',
    title: 'AI Settings',
    subtitle: 'Configure your SiliconFlow API to enable AI chat features.',
    api_key_label: 'SiliconFlow API Key',
    api_key_placeholder: 'sk-...',
    api_key_hint: 'Get your free API key from siliconflow.cn',
    model_label: 'Model',
    model_placeholder: 'Qwen/Qwen2.5-7B-Instruct',
    model_hint: 'E.g. Qwen/Qwen2.5-7B-Instruct, Pro/zai-org/GLM-4.7',
    api_key_required: 'API Key cannot be empty',
    model_empty_error: 'Model returned empty response. Please check your API Key and model name.',
    connection_failed: 'Connection failed',
    saved: 'Settings saved successfully!',
    save: 'Save Settings',
    saving: 'Saving...',
    test_connection: 'Test Connection',
    testing: 'Testing...',
    hint: 'Your API key is stored locally in your browser and never sent to our servers.'
  },
  footer: {
    copyright: '© 2026 Southern Wind · A Place for Small Experiments'
  }
}