// 每日 11:00 JST 自动更新 — 由定时任务覆盖
// 包含:东京 10 天天气预报 + 最新新闻 + 智能行程推荐
window.GUIDE_DAILY = {
  updatedAt: "2026-05-08 11:00 JST",
  weather: [
    { date: "5月8日",  icon: "🌤️", weather: "晴间多云", temp_max: 26, temp_min: 19, precipitation: 0, precip_prob: 20 },
    { date: "5月9日",  icon: "🌤️", weather: "晴间多云", temp_max: 23, temp_min: 18, precipitation: 0, precip_prob: 20 },
    { date: "5月10日", icon: "☀️", weather: "晴",       temp_max: 23, temp_min: 17, precipitation: 0, precip_prob: 5  },
    { date: "5月11日", icon: "☀️", weather: "晴",       temp_max: 22, temp_min: 17, precipitation: 0, precip_prob: 5  },
    { date: "5月12日", icon: "☁️", weather: "阴",       temp_max: 23, temp_min: 17, precipitation: 0, precip_prob: 30 },
    { date: "5月13日", icon: "☀️", weather: "晴",       temp_max: 25, temp_min: 17, precipitation: 0, precip_prob: 5  },
    { date: "5月14日", icon: "☀️", weather: "晴",       temp_max: 25, temp_min: 18, precipitation: 0, precip_prob: 5  },
    { date: "5月15日", icon: "☀️", weather: "晴",       temp_max: 27, temp_min: 18, precipitation: 0, precip_prob: 5  },
    { date: "5月16日", icon: "☀️", weather: "晴",       temp_max: 25, temp_min: 18, precipitation: 0, precip_prob: 5  },
    { date: "5月17日", icon: "☀️", weather: "晴",       temp_max: 25, temp_min: 18, precipitation: 0, precip_prob: 5  }
  ],
  news: [
    {
      title: "迪士尼海洋25周年庆典",
      summary: "东京迪士尼海洋闪耀欢庆活动4月15日起至2027年3月31日，主题色欢庆蓝贯穿全场。",
      url: "https://www.tokyodisneyresort.jp/treasure/tds25th/en/",
      source: "Tokyo Disney Resort Official"
    },
    {
      title: "Fantasy Springs取消虚拟排队",
      summary: "Fantasy Springs各景点自2025年4月起全面改为普通排队，无需抢虚拟队列名额。",
      url: "https://tdrexplorer.com/tokyo-disneysea-expansion-fantasy-springs/",
      source: "TDR Explorer"
    },
    {
      title: "阿伦黛尔皇家宴会新菜单",
      summary: "冰雪奇缘主题餐厅4月4日起上线北欧风新菜，含烟熏鱼子酱开放式三明治。",
      url: "https://wdwnt.com/2026/03/frozen-royal-banquet-of-arendelle-in-fantasy-springs-at-tokyo-disneysea/",
      source: "WDW News Today"
    },
    {
      title: "25周年限定商品5月25日发售",
      summary: "The Jubilee Journey系列新品5月25日开售，含各主题港明信片、徽章及玩偶挂件。",
      url: "https://www.haveagood-holiday.com/en/articles/tokyo-disneysea-25th-sparkling-jubilee-special-goods-may-2026",
      source: "Have a Good Holiday"
    },
    {
      title: "5月工作日优惠票价持续",
      summary: "迪士尼度假区工作日优惠票价延续至6月30日（4月29日及5月4至6日除外）。",
      url: "https://www.tokyodisneyresort.jp/en/tds/event.html",
      source: "Tokyo Disney Resort Official"
    }
  ],
  recommend: "未来10天东京天气整体晴好，气温舒适22-27°，全程几乎无雨；建议将迪士尼海洋安排在5月8-9日（多云凉爽，适合长时间排队），5月12日偶有阴天可优先体验Fantasy Springs室内景点，其余晴天适合墨田水族馆、晴空塔等全天户外行程。"
};
