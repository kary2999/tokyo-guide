// 每日 11:00 JST 自动更新 — 由定时任务覆盖
// 包含:东京 10 天天气预报 + 最新新闻 + 智能行程推荐
window.GUIDE_DAILY = window.GUIDE_DAILY || {
  updatedAt: null,
  weather: null,  // [{date, temp_min, temp_max, weather, precipitation, recommend}]
  news: [],       // [{title, summary, source, url}]
  recommend: ""   // 自然语言推荐
};
