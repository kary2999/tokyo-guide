// 每日 11:00 JST 自动更新 — 由定时任务覆盖
// 包含:东京 10 天天气预报 + 最新新闻 + 智能行程推荐
// 数据来源: weather25.com (2026-08-07)
window.GUIDE_DAILY = {
  updatedAt: "2026-08-07 11:00 JST",
  weather: [
    { date: "8月7日",  icon: "☀️",  weather: "晴",     temp_max: 33, temp_min: 27, precipitation: 0,    precip_prob: 10 },
    { date: "8月8日",  icon: "☀️",  weather: "晴",     temp_max: 33, temp_min: 26, precipitation: 0,    precip_prob: 10 },
    { date: "8月9日",  icon: "🌤️", weather: "晴间多云", temp_max: 33, temp_min: 26, precipitation: 0,    precip_prob: 20 },
    { date: "8月10日", icon: "☁️",  weather: "阴",     temp_max: 32, temp_min: 25, precipitation: 0,    precip_prob: 30 },
    { date: "8月11日", icon: "🌤️", weather: "晴间多云", temp_max: 33, temp_min: 24, precipitation: 0,    precip_prob: 20 },
    { date: "8月12日", icon: "🌤️", weather: "晴间多云", temp_max: 32, temp_min: 25, precipitation: 0,    precip_prob: 25 },
    { date: "8月13日", icon: "🌧️", weather: "阵雨",    temp_max: 28, temp_min: 24, precipitation: 8.8,  precip_prob: 70 },
    { date: "8月14日", icon: "🌧️", weather: "阵雨",    temp_max: 30, temp_min: 23, precipitation: 15.3, precip_prob: 80 },
    { date: "8月15日", icon: "🌧️", weather: "阵雨",    temp_max: 31, temp_min: 25, precipitation: 11.5, precip_prob: 75 },
    { date: "8月16日", icon: "🌤️", weather: "晴间多云", temp_max: 32, temp_min: 25, precipitation: 5.5,  precip_prob: 40 }
  ],
  news: [
    {
      title: "迪士尼海洋25周年庆典",
      summary: "Sparkling Jubilee 25周年特别活动持续至2027年3月，含限定演出及周年商品。",
      url: "https://www.tokyodisneyresort.jp/en/tds/event.html",
      source: "Tokyo Disney Resort Official"
    },
    {
      title: "玩具总动员5暑期活动",
      summary: "Fun Time with Toy Story 5暑期特别活动，7月2日至9月14日限定，园区全面布置主题装饰。",
      url: "https://www.tokyodisneyresort.jp/en/tds/event.html",
      source: "Tokyo Disney Resort Official"
    },
    {
      title: "盂兰盆节高峰期预警",
      summary: "8月8-16日为盂兰盆节高峰，园区拥挤度达9-10级，Fantasy Springs等待时间极长。",
      url: "https://deeparrival.com/theme-parks/tokyo-disney-resort/tokyo-disneysea/crowd-calendar/",
      source: "Deep Arrival"
    },
    {
      title: "入园口改建施工通知",
      summary: "东京迪士尼海洋入园口正进行改建工程，部分区域实施通行管制，入园请留出额外时间。",
      url: "https://www.tokyodisneyresort.jp/sc/tds/daily/calendar.html",
      source: "Tokyo Disney Resort Official"
    }
  ],
  recommend: "今明两天晴空33°C，是游迪士尼海洋的黄金窗口，但正值盂兰盆节高峰，建议开园前30分钟到场并优先冲Fantasy Springs；8月13日起连三天阵雨、气温降至28-30°C，可改排墨田水族馆、晴空塔或台场室内购物，雨停后8/16再补迪士尼体验更佳。"
};
