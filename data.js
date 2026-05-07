// 东京 9 天攻略数据 · v3
// 特性:
//   1. 日期永远从明天开始(动态计算)
//   2. 每家店都有 Google Maps 坐标 + 链接
//   3. Tips 支持 link + address
//   4. 迪士尼海洋穷游攻略 + 玲娜贝儿 + Fantasy Springs 新区
//   5. 智能节假日评估(根据当前出行日期判断是否拥挤)

// 工具函数 — 动态计算 9 天日期(明天开始)
window.GUIDE_HELPERS = {
  // 返回 9 天的 Date 对象数组,Day 1 = 明天
  tripDates() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return Array.from({length: 9}, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  },
  fmt(d) {
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${m}.${day}`;
  },
  fmtFull(d) {
    return `${d.getFullYear()}.${this.fmt(d)}`;
  },
  weekday(d) {
    return ['周日','周一','周二','周三','周四','周五','周六'][d.getDay()];
  },
  // Google Maps URL 生成器
  mapUrl(lat, lng, name) {
    if (name) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  },

  // 日本节假日日历(MM-DD 格式,跨年用 11-01 → 起始月份大于结束月份的方式表示)
  // level: 1 = 旺,2 = 高峰,3 = 极高峰
  holidayCalendar: [
    { start: "12-29", end: "01-03", level: 3, name: "正月", note: "全国放假,景点/餐厅关门多" },
    { start: "01-08", end: "01-15", level: 1, name: "成人之日三连休", note: "1月第二个周一前后" },
    { start: "02-11", end: "02-12", level: 1, name: "建国纪念日", note: "" },
    { start: "02-23", end: "02-24", level: 1, name: "天皇生日", note: "" },
    { start: "03-20", end: "04-08", level: 3, name: "樱花季", note: "价格涨 30%+,预订早" },
    { start: "04-29", end: "04-29", level: 1, name: "昭和之日", note: "" },
    { start: "04-30", end: "05-06", level: 3, name: "黄金周", note: "酒店价 ×2,人潮汹涌,极不建议" },
    { start: "07-15", end: "07-21", level: 2, name: "海之日三连休", note: "7月第三个周一" },
    { start: "07-22", end: "08-31", level: 2, name: "暑假 + 山之日", note: "亲子游高峰" },
    { start: "08-13", end: "08-16", level: 3, name: "盂兰盆 Obon", note: "全国大移动,新干线满员" },
    { start: "09-15", end: "09-23", level: 2, name: "敬老日 + 秋分连休", note: "" },
    { start: "10-08", end: "10-14", level: 1, name: "体育日三连休", note: "10月第二个周一" },
    { start: "11-03", end: "11-04", level: 1, name: "文化之日", note: "" },
    { start: "11-15", end: "12-05", level: 2, name: "红叶季", note: "京都/箱根高峰,东京较温和" },
    { start: "11-23", end: "11-24", level: 1, name: "勤劳感谢日", note: "" },
    { start: "12-23", end: "12-28", level: 2, name: "圣诞 + 跨年前", note: "市内景点价格上浮" }
  ],

  // 检查某天是否落在某个节假日范围内
  inHoliday(date, period) {
    const md = String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    if (period.start <= period.end) return md >= period.start && md <= period.end;
    return md >= period.start || md <= period.end;
  },

  // 综合评估 9 天行程
  assessTrip(tripDates) {
    const hits = [];
    let maxLevel = 0;
    tripDates.forEach((d, i) => {
      this.holidayCalendar.forEach(p => {
        if (this.inHoliday(d, p)) {
          hits.push({ dayIdx: i + 1, date: this.fmt(d), period: p });
          if (p.level > maxLevel) maxLevel = p.level;
        }
      });
    });
    let verdict;
    if (maxLevel === 0) {
      verdict = { score: 'green', emoji: '🟢', label: '平峰期 · 适合出行', detail: '未撞日本节假日,机票酒店价格友好,景点人少。强烈推荐。' };
    } else if (maxLevel === 1) {
      verdict = { score: 'green', emoji: '🟢', label: '准平峰 · 仍适合', detail: '只撞到小型公休日,影响有限。提前订住宿即可。' };
    } else if (maxLevel === 2) {
      verdict = { score: 'orange', emoji: '🟠', label: '高峰期 · 谨慎', detail: '撞日本节假日/旺季,酒店价上浮 30–50%,景点人较多。需提前 1 个月预订。' };
    } else {
      verdict = { score: 'red', emoji: '🔴', label: '极高峰 · 不建议', detail: '撞日本国民大假(黄金周/正月/盂兰盆),酒店价翻倍、新干线满员、景点人挤人。除非已订好,建议错峰。' };
    }
    return { verdict, hits, maxLevel };
  }
};

window.GUIDE_DATA = {
  meta: {
    title: "东京 9 日攻略",
    subtitle: "Tokyo Travel Guide",
    travelers: "2 人 / 9 天 8 晚"
    // dateRange 由 helpers.tripDates() 动态生成
  },

  // 9 天行程 — date 字段移除,日期由 idx + helpers 动态计算
  days: [
    {
      idx: 1, lunar: "Day 1", title: "大阪 USJ 暖场", emoji: "🎢",
      city: "大阪",
      blocks: [
        { time: "08:00", tag: "开园", text: "8:00–8:15 开园,9 点前直奔玛丽奥园区。Single Rider 单人通道排队不需坐一起。" },
        { time: "09:00", tag: "必玩", text: "哈利波特园区(鹰马飞行 / 禁忌之旅),排队约 45 分钟。" },
        { time: "Tip", tag: "省钱", text: "USJ 对第一批入园允许无快速券、无整理券直接进入。" }
      ]
    },
    {
      idx: 2, lunar: "Day 2", title: "京都 / 大阪缓冲", emoji: "⛩️",
      city: "京都",
      blocks: [
        { time: "全天", tag: "随逛", text: "八坂神社、通天阁、和歌山,看体力随机选择。酒店需要抽玛丽奥联动主题房。" },
        { time: "夜宵", tag: "美食", text: "心斋桥章鱼烧、新世界元祖炸串(串かつだるま 新世界总本店)。" }
      ]
    },
    {
      idx: 3, lunar: "Day 3", title: "大阪 → 收行李日", emoji: "🧳",
      city: "大阪",
      blocks: [
        { time: "—", tag: "缓冲", text: "整理行李,留出余量。下午到附近商场补购。" },
        { time: "晚餐", tag: "美食", text: "天满 鳴門鯛燒本舖 / 西洋茶館 布丁 ¥950。" }
      ]
    },
    {
      idx: 4, lunar: "Day 4", title: "新干线初到东京", emoji: "🚄",
      city: "大阪 → 东京",
      blocks: [
        { time: "07:00", tag: "出发", text: "最晚 7:00 出门,长居坐车 1 小时到新大阪。¥340" },
        { time: "08:54", tag: "新干线", text: "新大阪 8:54 → 东京 12:48,3h56min。¥32,000(约 ¥1,600/人民币)" },
        { time: "14:00", tag: "Check In", text: "日比谷线 → 八丁堀,15:00 入住八丁堀酒店。" },
        { time: "15:00", tag: "夜景", text: "八丁堀 → 神谷町(20 min),步行 600 米到东京铁塔。" },
        { time: "Tip", tag: "省钱", text: "非日本节假日入住更便宜,2 晚约 ¥1,000/人民币 起。" }
      ]
    },
    {
      idx: 5, lunar: "Day 5 ⭐", title: "迪士尼海洋(全天)", emoji: "🐚",
      city: "舞滨",
      blocks: [
        { time: "05:51", tag: "交通", text: "京叶线 → 东京站 5:51。¥230" },
        { time: "06:25", tag: "到门口", text: "舞滨站 6:07 步行 15 分钟 → 6:25 到正门。" },
        { time: "08:20", tag: "入园", text: "8:20–8:30 开园,迪士尼度假村酒店住客可比正常早 15 分钟。入园后立刻抢入场卡。" },
        { time: "09:00", tag: "首抢", text: "刚开门人最多,直奔人气项目入口。" },
        { time: "11:30", tag: "演出", text: "水上花车 11:30 / 14:05 / 16:05。" },
        { time: "12:00", tag: "DPA", text: "橘色用入场卡、红色 DPA 处理下午约。" },
        { time: "14:00", tag: "演出", text: "贡多拉 5 点、大都会 6 点。找个湖边等晚上的星光秀。" },
        { time: "18:35", tag: "演出", text: "动感大乐团。" },
        { time: "19:20", tag: "演出", text: "梦之海。" },
        { time: "20:30", tag: "压轴", text: "烟花秀。" },
        { time: "票价", tag: "¥", text: "门票 ¥8,400 / DPA 单项另购。详细攻略见下方专题。" }
      ]
    },
    {
      idx: 6, lunar: "Day 6", title: "富士山一日", emoji: "🗻",
      city: "富士急 / 河口湖",
      blocks: [
        { time: "06:00", tag: "出发", text: "八丁堀 → 东京站(京叶线) → 富士急乐园(JR 巴士关东)。¥2,210" },
        { time: "上午", tag: "玩", text: "富士急高原乐园,门票免费、项目单点付费。" },
        { time: "下午", tag: "拍照", text: "富士急乐园 → 月江寺(富士急行线)→ 步行 600 米到日川时计店打卡。" },
        { time: "傍晚", tag: "湖景", text: "日川时计店 → 下吉田 → 河口湖,出站后租车。¥310" },
        { time: "19:45", tag: "返程", text: "御殿场奥莱 → 国府津(御殿场线)→ 大船(东海道本线)→ 镰仓(横须贺线)。¥1,340" }
      ]
    },
    {
      idx: 7, lunar: "Day 7", title: "镰仓 + 江之电", emoji: "🚃",
      city: "镰仓",
      blocks: [
        { time: "上午", tag: "海岸", text: "镰仓高校前站(灌篮高手取景平交道)。" },
        { time: "中午", tag: "公交", text: "公交去浅间神社 ⛩️ ,不骑行也能到。" },
        { time: "下午", tag: "返程", text: "镰仓 → 东京车站(横须贺线)。¥950" },
        { time: "傍晚", tag: "晚餐", text: "新宿 AFURI 辛红 / 上野 沼津港海将 放题(¥1,700)。" }
      ]
    },
    {
      idx: 8, lunar: "Day 8", title: "城里 City Walk", emoji: "🏙️",
      city: "东京",
      blocks: [
        { time: "上午", tag: "购物", text: "涉谷 SKY / PARCO 极味や 汉堡牛排。" },
        { time: "下午", tag: "塔景", text: "晴空塔 / 浅草寺。Top Deck ¥2,800。" },
        { time: "晚餐", tag: "美食", text: "上野 一頭牛烧肉 房家 6 丁目店,五种肉 + 两饮 ¥5,110。" }
      ]
    },
    {
      idx: 9, lunar: "Day 9", title: "回程", emoji: "✈️",
      city: "东京",
      blocks: [
        { time: "上午", tag: "退房", text: "酒店退房,机场快线/京成 Skyliner 出发。" },
        { time: "—", tag: "Tip", text: "预留 3 小时到机场,免税柜台需排队。" }
      ]
    }
  ],

  // 美食 — 每家店都有明确的 Google Maps 链接 + 坐标 + 地址
  food: {
    "东京 · 银座 / 京桥": [
      { name: "銀座楸 ひさぎ", area: "銀座", address: "東京都中央區銀座 6-12-16", price: "¥1,100 商业午餐", note: "tabelog 3.76,牡蛎牛排黑咖喱套餐", url: "https://tenjo.tw/ginza-hisagi/", lat: 35.6709, lng: 139.7661, mapUrl: "https://www.google.com/maps/search/?api=1&query=銀座楸+ひさぎ+東京" },
      { name: "京橋松輪", area: "京橋", address: "東京都中央區京橋 3-6-1", price: "限定 70 份", note: "tabelog 3.61,午餐限定竹筴鱼定食", url: "https://tenjo.tw/tokyo-food/", lat: 35.6771, lng: 139.7705, mapUrl: "https://www.google.com/maps/search/?api=1&query=京橋松輪+京ばし松輪" }
    ],
    "东京 · 上野 / 阿美横町": [
      { name: "一頭牛 燒肉房家 上野六丁目店", area: "上野", address: "東京都台東区上野 6-6-6", price: "¥980 起 / 套餐 ¥5,110", note: "国产和牛烧肉,一人也能吃", url: "https://maps.app.goo.gl/a34DXyXZrrrgt", lat: 35.7081, lng: 139.7758, mapUrl: "https://www.google.com/maps/search/?api=1&query=燒肉房家+上野六丁目店" },
      { name: "牛かつあおな", area: "上野", address: "東京都台東区上野 6-5-7", price: "¥1,300 套餐", note: "国产黑毛和牛炸牛排,十谷米 + 沙拉", lat: 35.7080, lng: 139.7758, mapUrl: "https://www.google.com/maps/search/?api=1&query=牛かつあおな+上野" },
      { name: "Domremy Outlet 上野不忍店", area: "上野", address: "東京都台東区上野 2-12-14", price: "¥便宜", note: "外表 NG 甜点 outlet,11:00–21:00", lat: 35.7099, lng: 139.7716, mapUrl: "https://www.google.com/maps/search/?api=1&query=Domremy+Outlet+上野不忍店" },
      { name: "沼津港 海將 上野一号店", area: "阿美横町", address: "東京都台東区上野 4-9-13", price: "¥1,700 放题", note: "海鲜放题,阿美横町步行 2 分钟", url: "https://maps.app.goo.gl/Gg6viyTfvj8aQc1k8", lat: 35.7080, lng: 139.7758, mapUrl: "https://www.google.com/maps/search/?api=1&query=沼津港+海將+上野" }
    ],
    "东京 · 新宿": [
      { name: "泰然 TAIZEN", area: "新宿", address: "東京都新宿区新宿 1-23-11", price: "¥1,000 限量", note: "tabelog 3.69,极品比内地鸡亲子丼", lat: 35.6906, lng: 139.7065, mapUrl: "https://www.google.com/maps/search/?api=1&query=泰然+TAIZEN+新宿" },
      { name: "FISH (フィッシュ)", area: "西新宿", address: "東京都新宿区西新宿 7-5-6", price: "¥1,200", note: "tabelog 3.58,印度咖喱三拼", lat: 35.6936, lng: 139.6918, mapUrl: "https://www.google.com/maps/search/?api=1&query=FISH+フィッシュ+西新宿" },
      { name: "AFURI 辛红 新宿 SUBNADE", area: "新宿", address: "新宿区歌舞伎町 1-2-2 SUBNADE B1", price: "¥1,200", note: "爆辣拉面", url: "https://maps.app.goo.gl/cty18uxnJ2QM2ybn7", lat: 35.6914, lng: 139.7044, mapUrl: "https://www.google.com/maps/search/?api=1&query=AFURI+辛紅+新宿+SUBNADE" }
    ],
    "东京 · 浅草 / 涉谷": [
      { name: "Pelican Cafe", area: "浅草", address: "東京都台東区寿 3-9-11 1F", price: "¥600–1,200", note: "77 年老店传奇吐司,9:00 开门已排队", lat: 35.7141, lng: 139.7894, mapUrl: "https://www.google.com/maps/search/?api=1&query=Pelican+Cafe+浅草" },
      { name: "壽々喜園 × ななや 浅草本店", area: "浅草", address: "東京都台東区浅草 3-4-3", price: "¥560 起", note: "世界最浓抹茶冰淇淋,7 种浓度可选", lat: 35.7150, lng: 139.7934, mapUrl: "https://www.google.com/maps/search/?api=1&query=壽々喜園+ななや+浅草本店" },
      { name: "極味や 渋谷 PARCO 店", area: "涉谷", address: "東京都渋谷区宇田川町 15-1 渋谷PARCO B1", price: "¥1,500–2,500", note: "汉堡牛排招牌,自烤铁板", url: "https://maps.app.goo.gl/bcXhx828J3VQn", lat: 35.6608, lng: 139.6989, mapUrl: "https://www.google.com/maps/search/?api=1&query=極味や+渋谷PARCO" },
      { name: "Red Rock 原宿店", area: "原宿", address: "東京都渋谷区神宮前 3-25-12 フジビル B1F", price: "¥1,200–1,500", note: "tabelog 3.51,神户牛排丼", lat: 35.6701, lng: 139.7077, mapUrl: "https://www.google.com/maps/search/?api=1&query=Red+Rock+原宿店" }
    ],
    "东京 · 人形町 / 麻布": [
      { name: "柳屋鯛魚燒", area: "人形町", address: "東京都中央区日本橋人形町 2-11-3", price: "¥200 / 个", note: "东京三大鯛魚燒之一,12:30–18:00 周日休", lat: 35.6857, lng: 139.7818, mapUrl: "https://www.google.com/maps/search/?api=1&query=柳屋+人形町" },
      { name: "麻布十番 浪花家總本店", area: "麻布十番", address: "東京都港区麻布十番 1-8-14", price: "¥200 / 个", note: "东京三大鯛魚燒之一,作者私心最推", lat: 35.6555, lng: 139.7359, mapUrl: "https://www.google.com/maps/search/?api=1&query=浪花家総本店+麻布十番" },
      { name: "若葉鯛魚燒", area: "新宿", address: "東京都新宿区若葉 1-10", price: "¥200 / 个", note: "东京三大鯛魚燒,有内用座位", lat: 35.6849, lng: 139.7232, mapUrl: "https://www.google.com/maps/search/?api=1&query=たいやき+わかば+四ツ谷" }
    ],
    "大阪 · 心斋桥 / 美国村": [
      { name: "わなか 道頓堀店", area: "道顿堀", address: "大阪府大阪市中央区難波 1-7-9", price: "¥600 / 8 个", note: "章鱼烧名店", url: "https://maps.app.goo.gl/E8NtDNyfLCNoF", lat: 34.6688, lng: 135.5026, mapUrl: "https://www.google.com/maps/search/?api=1&query=わなか+道頓堀店" },
      { name: "元祖アイスドッグ", area: "美国村", address: "大阪府大阪市中央区西心斎橋 1-7-11", price: "¥520", note: "冰狗 ICE DOG", url: "https://maps.app.goo.gl/Xon9EZNVme3Rx", lat: 34.6739, lng: 135.4970, mapUrl: "https://www.google.com/maps/search/?api=1&query=元祖アイスドッグ+美国村" },
      { name: "牛たん炭火焼 吉次 鰻谷店", area: "心斋桥", address: "大阪府大阪市中央区東心斎橋 1-15-19", price: "¥3,000+", note: "深夜烧牛舌,16:00–02:00", url: "https://maps.app.goo.gl/vLsZFsSfAGS7N", lat: 34.6770, lng: 135.5008, mapUrl: "https://www.google.com/maps/search/?api=1&query=牛たん炭火焼+吉次+鰻谷店" },
      { name: "一斗 東心斎橋店本館", area: "心斋桥", address: "大阪府大阪市中央区東心斎橋 1-17-21", price: "2 人 ¥10,000+", note: "需提前预约", url: "https://maps.app.goo.gl/aWkwUimnjF7qU", lat: 34.6750, lng: 135.4998, mapUrl: "https://www.google.com/maps/search/?api=1&query=一斗+東心斎橋店本館" }
    ],
    "大阪 · 新世界 / 天满": [
      { name: "串かつだるま 新世界総本店", area: "新世界", address: "大阪府大阪市浪速区恵美須東 2-3-9", price: "¥1,800 / 11 串", note: "元祖炸串、鸡软骨、年糕", url: "https://maps.app.goo.gl/A6XS5jRcYhn3K", lat: 34.6526, lng: 135.5063, mapUrl: "https://www.google.com/maps/search/?api=1&query=串かつだるま+新世界総本店" },
      { name: "和牛タン次郎 大阪天満店", area: "天满", address: "大阪府大阪市北区天神橋 3-1-23", price: "¥2,500+", note: "牛舌专门", url: "https://maps.app.goo.gl/Sdk1xYRX5LTQS", lat: 34.7028, lng: 135.5152, mapUrl: "https://www.google.com/maps/search/?api=1&query=和牛タン次郎+大阪天満店" },
      { name: "西洋茶館", area: "天满", address: "大阪府大阪市北区天神橋 4-6-14", price: "布丁 ¥950", note: "复古洋风茶屋", url: "https://maps.app.goo.gl/QLnYCC9ygndX8", lat: 34.7017, lng: 135.5114, mapUrl: "https://www.google.com/maps/search/?api=1&query=西洋茶館+天満" },
      { name: "千鳥屋宗家 天滿店", area: "天满", address: "大阪府大阪市北区天神橋 3-2-8", price: "¥200 起", note: "甜酱油团子、千鸟馒头", url: "https://maps.app.goo.gl/sco9Hw4QH9hhM", lat: 34.7039, lng: 135.5135, mapUrl: "https://www.google.com/maps/search/?api=1&query=千鳥屋宗家+天滿店" }
    ]
  },

  // 景点
  attractions: [
    {
      name: "东京迪士尼海洋",
      tag: "必玩",
      hours: "9:00–21:00",
      price: "¥8,400 – 9,400",
      desc: "8:30 甚至 8:20 就开门;度假村酒店住客可早入园 15 分钟。入园即抢入场卡,APP 提前下载。重点项目:翱翔梦幻奇航、地心探险、印第安纳琼斯、愤怒双神(过山车)、辛巴达传奇之旅、神灯剧场。",
      tips: [
        "🎀 玲娜贝儿(LinaBell)全球只在上海迪士尼 + 东京迪士尼海洋有售,其他迪士尼乐园都买不到 — 必收!",
        "橘色项目用入场卡、红色项目用 DPA",
        "下午前往美国海滨仅浏览,不交通",
        "9 点前直奔人气区,刚入园人最多",
        "水上花车 11:30 / 14:05 / 16:05"
      ],
      url: "https://www.tokyodisneyresort.jp/tc/tdr/calendar.html",
      image: "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=800&q=80&auto=format&fit=crop",
      lat: 35.6267, lng: 139.8851,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=東京ディズニーシー",
      gradient: "linear-gradient(135deg,#5e9dd6,#a8d4e9)"
    },
    {
      name: "涩谷 SHIBUYA SKY",
      tag: "夜景",
      hours: "10:00–22:30",
      price: "¥2,500",
      desc: "Scramble Square 顶楼 360 度露天观景台。晚上的票需提前抢,飞猪偶有放票但日落前价格翻倍。",
      tips: ["官网售完柜台也无","可关注其他用户取消的余票"],
      url: "https://www.shibuya-scramble-square.com/sky/ticket/",
      image: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&q=80&auto=format&fit=crop",
      lat: 35.6585, lng: 139.7016,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya+Sky",
      gradient: "linear-gradient(135deg,#1f2c4a,#4a6da7)"
    },
    {
      name: "Small Worlds 迷你博物馆",
      tag: "亲子",
      hours: "09:00–19:30",
      price: "成人 ¥2,700",
      desc: "台场,世界最大室内迷你世界 7,000㎡。包含太空中心、世界小镇、美少女战士、关西机场、EVA 第3新东京市等 6 区。",
      tips: ["建议预留 2–3 小时","摄影出片率高"],
      url: "https://smallworlds.jp/en/",
      image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=800&q=80&auto=format&fit=crop",
      lat: 35.6303, lng: 139.7867,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Small+Worlds+TOKYO",
      gradient: "linear-gradient(135deg,#7e57c2,#b39ddb)"
    },
    {
      name: "御殿场奥特莱斯",
      tag: "购物",
      hours: "10:00–19:00",
      price: "—",
      desc: "新宿站巴士 4 层出发,秋叶原、横滨也可到达。回程可衔接镰仓或东京。",
      tips: ["御殿场地铁站距离奥莱 2.8 公里","返程 19:45 末班需注意"],
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80&auto=format&fit=crop",
      lat: 35.3115, lng: 138.9176,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=御殿場プレミアム・アウトレット",
      gradient: "linear-gradient(135deg,#d4a574,#f4e4c1)"
    },
    {
      name: "富士急高原乐园",
      tag: "刺激",
      hours: "9:00–17:00",
      price: "门票免费 / 单项付费",
      desc: "云霄飞车圣地。新宿站巴士直达。可衔接月江寺日川时计店打卡富士山街景。",
      tips: ["项目单独购票","河口湖出站可租车"],
      url: "https://www.fujiq.jp/en/ticket/attraction.html",
      image: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=800&q=80&auto=format&fit=crop",
      lat: 35.4877, lng: 138.7821,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=富士急ハイランド",
      gradient: "linear-gradient(135deg,#82b1ff,#f8bbd0)"
    },
    {
      name: "东京铁塔",
      tag: "经典",
      hours: "9:00–22:30",
      price: "Top Deck ¥2,800",
      desc: "Main Deck 直达楼梯周末 9:00–16:00 开放。从八丁堀经日比谷线到神谷町步行 600 米可达。",
      tips: ["和晴空塔二选一","周末步道开放更有趣"],
      url: "https://www.tokyotower.co.jp/cn/price/",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80&auto=format&fit=crop",
      lat: 35.6586, lng: 139.7454,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=東京タワー",
      gradient: "linear-gradient(135deg,#ff6f61,#ffb199)"
    },
    {
      name: "晴空塔 SKYTREE",
      tag: "夜景",
      hours: "08:00–22:00",
      price: "¥3,100",
      desc: "445–450 楼天望回廊为最高 451.2m。340–350 楼天望甲板可在手扶梯间自由移动,345 楼有空中餐厅与玻璃地板。",
      tips: ["距离浅草步行 20 分钟","Sky Restaurant 需正装"],
      url: "https://www.tokyo-skytree.jp/cn_t/",
      image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80&auto=format&fit=crop",
      lat: 35.7100, lng: 139.8107,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=東京スカイツリー",
      gradient: "linear-gradient(135deg,#42a5f5,#90caf9)"
    },
    {
      name: "浅草寺",
      tag: "经典",
      hours: "06:00–17:00",
      price: "免费",
      desc: "雷门、仲见世通、浅草寺一条龙。周边四条线路:东京メトロ银座线、都营浅草线、东武铁道、つくばエクスプレス。",
      tips: ["可衔接晴空塔 / 隅田川","逛吃推荐花月堂菠萝包"],
      url: "https://www.senso-ji.jp/",
      image: "https://images.unsplash.com/photo-1583400845999-ec56cc9c98ae?w=800&q=80&auto=format&fit=crop",
      lat: 35.7148, lng: 139.7967,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=浅草寺",
      gradient: "linear-gradient(135deg,#c62828,#ffab91)"
    },
    {
      name: "镰仓高校前",
      tag: "拍照",
      hours: "全天",
      price: "免费",
      desc: "1903 年设站,东侧平交道为《灌篮高手》OP 取景地。江之电限定饭团车站,可串和歌山一日游。",
      tips: ["拍照高峰人多,礼让本地居民","江之电限定饭团车站"],
      image: "https://images.unsplash.com/photo-1601736015921-eaf1b46a7eea?w=800&q=80&auto=format&fit=crop",
      lat: 35.3072, lng: 139.5022,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=鎌倉高校前駅",
      gradient: "linear-gradient(135deg,#26a69a,#80cbc4)"
    },
    {
      name: "横滨高达工厂",
      tag: "热血",
      hours: "11:00–20:00",
      price: "¥1,650",
      desc: "实物大可动高达 GUNDAM。2020.12 – 2024.03 营业,每周二休。19:00 最晚入场。",
      tips: ["最后开放阶段,先到先抢"],
      image: "https://images.unsplash.com/photo-1635436891088-1a0f1f5b6dfd?w=800&q=80&auto=format&fit=crop",
      lat: 35.4422, lng: 139.6512,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=GUNDAM+FACTORY+YOKOHAMA",
      gradient: "linear-gradient(135deg,#37474f,#78909c)"
    },
    {
      name: "墨田水族馆",
      tag: "亲子",
      hours: "9:00–21:00",
      price: "¥2,500",
      desc: "晴空塔同栋,适合下雨天/带娃避暑。",
      tips: ["建议和晴空塔合并安排"],
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80&auto=format&fit=crop",
      lat: 35.7100, lng: 139.8107,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=すみだ水族館",
      gradient: "linear-gradient(135deg,#0277bd,#4fc3f7)"
    },
    {
      name: "三鹰之森吉卜力美术馆",
      tag: "动漫",
      hours: "10:00–17:00",
      price: "¥3,773",
      desc: "宫崎骏亲自设计,需提前一个月抢票,每月 10 号放下个月票,可上网找代抢(需日本 IP)。",
      tips: ["三鹰站南口步行 15 分钟","或南口 9 号巴士站搭巴士 ¥210"],
      url: "https://www.ghibli-museum.jp/",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop",
      lat: 35.6962, lng: 139.5703,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=三鷹の森ジブリ美術館",
      gradient: "linear-gradient(135deg,#558b2f,#aed581)"
    },
    {
      name: "横滨中华街 + 元町",
      tag: "城游",
      hours: "全天",
      price: "免费",
      desc: "中华风 vs 西洋风,日本人最爱约会景点之一。日本最大妈祖庙、中餐厅一应俱全。",
      tips: ["和镰仓一日游可串"],
      image: "https://images.unsplash.com/photo-1540126034813-121bf29033d2?w=800&q=80&auto=format&fit=crop",
      lat: 35.4427, lng: 139.6463,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=横浜中華街",
      gradient: "linear-gradient(135deg,#d32f2f,#ffcdd2)"
    }
  ],

  // 个人相册
  myPhotos: [
    { src: "img/my-01.png", caption: "本人现场记录" },
    { src: "img/my-02.png", caption: "本人现场记录" },
    { src: "img/my-03.png", caption: "本人现场记录" },
    { src: "img/my-04.png", caption: "本人现场记录" },
    { src: "img/my-05.png", caption: "本人现场记录" },
    { src: "img/my-06.png", caption: "本人现场记录" }
  ],

  // 攻略 Tips — 支持 link + address
  tips: [
    {
      icon: "🎫", title: "迪士尼海洋 8 字心法",
      text: "8:20 入场 → 8:30 抢卡 → 9:00 首发热门 → 11:30 花车 → 12:00 红绿 DPA → 18:35 大乐团 → 19:20 梦之海 → 20:30 烟花。",
      link: "https://www.tokyodisneyresort.jp/tc/tds/",
      linkText: "Disney 官方"
    },
    {
      icon: "🎀", title: "玲娜贝儿(LinaBell)限定",
      text: "全球迪士尼乐园中,只有上海迪士尼 + 东京迪士尼海洋出售玲娜贝儿周边,其他乐园(东京迪士尼乐园、香港、巴黎、奥兰多、加州)都买不到。东京 DisneySea 入园直奔美人鱼礁湖城/失落河三角洲附近的玩具店。"
    },
    {
      icon: "🚄", title: "新干线提前买",
      text: "新大阪 → 东京 ¥32,000 / 4 小时,飞猪/官网 14 天前票稳。Suica 余额提前充足。",
      link: "https://smart-ex.jp/en/",
      linkText: "Smart EX 官网"
    },
    {
      icon: "📱", title: "迪士尼 APP",
      text: "提前下载 Tokyo Disney APP,定位、抢卡、DPA、菜单、表演时刻全在里面。日区 Apple ID 不可少。",
      link: "https://www.tokyodisneyresort.jp/en/app/",
      linkText: "下载 APP"
    },
    {
      icon: "🌧️", title: "海洋装备",
      text: "椅子 / 防潮垫 / 伞 / 水杯 / 帽子 / 雨衣 / 暖宝宝。冬季海风大,加一件防风外套。"
    },
    {
      icon: "🍣", title: "Tabelog 选店",
      text: "tabelog ≥ 3.5 已是良好,3.6+ 名店,3.7+ 稳预约。营业时间 LO 表示最后点单。",
      link: "https://tabelog.com/",
      linkText: "Tabelog 官网"
    },
    {
      icon: "🎟️", title: "晴空 vs 铁塔",
      text: "网友更推东京铁塔(夜景广)。Sky Restaurant 345F 需正装(商务装才让进)。"
    },
    {
      icon: "🚌", title: "御殿场奥莱",
      text: "新宿站巴士 4 层直达,秋叶原 / 横滨也有班次。返程接镰仓走横须贺线最顺。",
      address: "新宿站新南口巴士总站 4 楼"
    },
    {
      icon: "🗻", title: "富士急 + 河口湖",
      text: "富士急乐园门票免费、项目单点付费。月江寺/日川时计店是富士山经典街拍机位。",
      link: "https://www.fujiq.jp/en/",
      linkText: "富士急官网"
    },
    {
      icon: "🎨", title: "吉卜力抢票",
      text: "每月 10 号 10:00 放下个月票,L-Tike 系统,需日本 IP。三鹰站南口 9 号巴士 ¥210。",
      link: "https://l-tike.com/ghibli/",
      linkText: "L-Tike 抢票"
    },
    {
      icon: "💴", title: "现金 vs 刷卡",
      text: "迪士尼、便利店、JR 自动售票普及刷卡;鯛魚燒老店、神社御守等多收现金。建议留 ¥10,000 现金/人。"
    }
  ],

  // ⭐ 迪士尼海洋穷游攻略 · 详细图块
  disneySeaGuide: {
    title: "迪士尼海洋穷游攻略",
    subtitle: "8:20 入场到 21:00 烟花的全天路线",
    intro: "9 天行程里最贵也最值的一天。门票 ¥8,400 起、DPA 单项 ¥1,500–2,500、餐饮 ¥3,000+,但用对方法可以从'人均 ¥1,800/小时'变成'¥800/小时'。下面是经过实战验证的 5 个模块。",

    // 官方地图(用户上传的繁中版 PDF 转 JPG)
    officialMap: {
      thumb: "img/tds-map-thumb.jpg",
      full: "img/tds-map.jpg",
      caption: "Tokyo DisneySea 官方繁中地图 · 含 8 大主题区与编号项目",
      usage: [
        { icon: "🔢", title: "项目编号", text: "图中各项目都有编号,与图例栏一一对应,用 APP 抢卡时看编号最快。" },
        { icon: "🎢", title: "游乐设施", text: "圆圈+车厢图标 = 游乐设施;绿底蓝字 = 适合所有年龄;红底白字 = 身高/年龄限制(图例右上有标注)。" },
        { icon: "🍽️", title: "餐饮 / 商店", text: "刀叉图标 = 正餐;杯子图标 = 小食;购物袋 = 商店。每区都有标志性餐厅,选熟悉的标志快走。" },
        { icon: "🚻", title: "服务设施", text: "右下角图例区有:厕所、AED、婴儿中心、储物柜、ATM、APP 客服中心。地图边缘标着各区出口位置。" },
        { icon: "📱", title: "搭配 APP 用", text: "扫地图左上角的 QR 码下载官方 App;App 里能看实时排队时间、抢 DPA、点外卖到园内取餐位置。" },
        { icon: "🆕", title: "右上'梦幻泉乡'", text: "2024.06 新开的 Fantasy Springs 主题区,需 Premier Access 或 Standby Pass 才能入区。" }
      ]
    },

    // 园区分区 — 用 SVG 渲染,坐标对应一张概念图(0-100% 网格)
    // 2024 年 Fantasy Springs 开园后共 8 大主题区
    parkZones: [
      { id: "med",   name: "地中海港湾",       en: "Mediterranean Harbor", x: 50, y: 78, color: "#d8a86a", emoji: "🏰", note: "入口区 + 烟花/夜场最佳观赏点" },
      { id: "amer",  name: "美国海滨",         en: "American Waterfront",  x: 22, y: 62, color: "#c87575", emoji: "🚢", note: "翱翔梦幻奇航 Soaring 在这里" },
      { id: "port",  name: "发现港",           en: "Port Discovery",       x: 28, y: 38, color: "#5e9dd6", emoji: "⚓", note: "尼莫与他的好朋友" },
      { id: "lost",  name: "失落河三角洲",     en: "Lost River Delta",     x: 50, y: 30, color: "#7a8c5a", emoji: "🐍", note: "印第安纳琼斯·愤怒双神" },
      { id: "arab",  name: "阿拉伯海岸",       en: "Arabian Coast",        x: 70, y: 38, color: "#c8923a", emoji: "🕌", note: "辛巴达 / 神灯剧场" },
      { id: "merm",  name: "美人鱼礁湖",       en: "Mermaid Lagoon",       x: 76, y: 60, color: "#d486b0", emoji: "🧜", note: "海底两万里 + 室内场馆,雨天首选" },
      { id: "myst",  name: "神秘岛",           en: "Mysterious Island",    x: 50, y: 56, color: "#6a6a7a", emoji: "🌋", note: "地心探险 + 火山(烟花参照点)" },
      { id: "fant",  name: "范达海",           en: "Fantasy Springs",      x: 84, y: 22, color: "#7e57c2", emoji: "❄️", note: "2024.06.06 新开!冰雪/彼得潘/长发公主三主题" }
    ],

    // 项目最新动态 / 新闻
    news: [
      {
        date: "2024.06.06",
        tag: "🆕 重大更新",
        title: "Fantasy Springs 范达海主题区开园",
        text: "DisneySea 第 8 个主题区,投资 3,200 亿日元,含三大主题:Anna and Elsa's Frozen Journey(冰雪奇缘)、Peter Pan's Never Land Adventure(彼得潘)、Rapunzel's Lantern Festival(长发公主)。**整区入园需要 Premier Access(¥2,000 起)或 Standby Pass**,不能裸入。",
        url: "https://www.tokyodisneyresort.jp/treasure/fantasysprings/",
        urgent: true
      },
      {
        date: "2024 起",
        tag: "🎫 票务变化",
        title: "DPA 完全取代 FastPass",
        text: "迪士尼海洋已废除免费 FastPass,所有快速通道改为 Disney Premier Access(DPA),单项 ¥1,500–¥2,500 不等,一天可买多项。APP 内购买,APP 内显示时段。冷门项目仍可用免费的 Standby Pass(入场卡)。"
      },
      {
        date: "持续中",
        tag: "🎀 玲娜贝儿",
        title: "LinaBell 周边持续更新",
        text: "玲娜贝儿(LinaBell)2021 年于上海首发,东京迪士尼海洋为东半球第二个、也是全球除上海外唯一在售的乐园。每季度有新主题款,毛绒玩偶常断货,周末易售罄。开门后建议先抢热门项目卡再去美人鱼礁湖商店购买。"
      },
      {
        date: "2024 起",
        tag: "📱 APP 必装",
        title: "Tokyo Disney Resort APP 全功能化",
        text: "园区地图、抢卡、DPA 购买、餐厅预约、表演时刻、停车位查询,全部集成到一个 APP。**需日区 Apple ID** 才能下载;Android 直接 Google Play 即可。"
      },
      {
        date: "2025 起",
        tag: "🚇 交通",
        title: "迪士尼度假区单轨电车更新",
        text: "Disney Resort Line(迪士尼度假区线)单程 ¥260,1 日券 ¥660。从舞滨站出来即可换乘;新款列车导入。对于跨园区(乐园 ↔ 海洋)非常方便。"
      },
      {
        date: "高峰季",
        tag: "💴 票价浮动",
        title: "门票动态定价",
        text: "2024 年起官方采用动态定价:¥8,400(平日)/ ¥8,900(周末)/ ¥9,400(高峰)。圣诞、樱花季、暑假门票最贵。提前在飞猪/官网购买锁价。"
      }
    ],

    sections: [
      {
        icon: "⏰", title: "黄金时刻表 · 时间就是钱",
        items: [
          { time: "05:51", what: "京叶线坐到东京站", note: "第一班车,¥230", zone: "出发", img: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=400&q=70&auto=format&fit=crop" },
          { time: "06:07", what: "东京站 → 舞滨站", note: "京叶线 11 分钟", zone: "出发", img: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=400&q=70&auto=format&fit=crop" },
          { time: "06:25", what: "步行 15 分钟到正门", note: "出站后跟人流即可", zone: "正门", img: "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=400&q=70&auto=format&fit=crop" },
          { time: "08:20", what: "实际开门(官方 8:30)", note: "度假村酒店住客再早 15 min", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1604973103069-fbf9bd2f3aa1?w=400&q=70&auto=format&fit=crop" },
          { time: "08:30", what: "立刻抢入场卡 + APP DPA", note: "翱翔梦幻奇航、美人鱼、印第安纳琼斯优先", zone: "全园", img: "https://images.unsplash.com/photo-1556139943-4bdca53adf1e?w=400&q=70&auto=format&fit=crop" },
          { time: "09:00", what: "翱翔梦幻奇航 Soaring", note: "首选,5D 飞行模拟,刚入园人最多", zone: "美国海滨", img: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?w=400&q=70&auto=format&fit=crop" },
          { time: "10:00", what: "海底两万里", note: "美人鱼礁湖经典", zone: "美人鱼礁湖", img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&q=70&auto=format&fit=crop" },
          { time: "11:30", what: "水上花车第 1 场", note: "找好位子提前 30 min", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1503001683924-2f5dee99af6a?w=400&q=70&auto=format&fit=crop" },
          { time: "12:00", what: "红色项目 DPA、橘色入场卡", note: "开抢下午的约", zone: "全园", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=70&auto=format&fit=crop" },
          { time: "13:00", what: "印第安纳琼斯过山车", note: "1 分半,愤怒双神,刺激", zone: "失落河三角洲", img: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&q=70&auto=format&fit=crop" },
          { time: "14:05", what: "水上花车第 2 场", note: "也可改逛美国海滨", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1604971808832-e6a92d9c4c54?w=400&q=70&auto=format&fit=crop" },
          { time: "15:00", what: "辛巴达 / 神灯剧场", note: "排队短的备选", zone: "阿拉伯海岸", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=70&auto=format&fit=crop" },
          { time: "16:05", what: "水上花车第 3 场", note: "下午最后一场", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1490127252417-7c393f993ee4?w=400&q=70&auto=format&fit=crop" },
          { time: "17:00", what: "Fantasy Springs 范达海(预约)", note: "新区!冰雪 / 彼得潘 / 长发公主主题", zone: "Fantasy Springs", img: "https://images.unsplash.com/photo-1601314002592-b8734bca6604?w=400&q=70&auto=format&fit=crop" },
          { time: "18:35", what: "动感大乐团", note: "码头湖畔的 LIVE", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=400&q=70&auto=format&fit=crop" },
          { time: "19:20", what: "梦之海 Believe", note: "夜间水上灯光秀", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1601736015921-eaf1b46a7eea?w=400&q=70&auto=format&fit=crop" },
          { time: "20:30", what: "压轴烟花秀", note: "最佳位置:火山附近 / 中央湖畔", zone: "地中海港湾", img: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?w=400&q=70&auto=format&fit=crop" }
        ]
      },
      {
        icon: "🎢", title: "项目优先级 · 排队经济学",
        items: [
          { time: "S 级", what: "翱翔梦幻奇航(Soaring)", note: "5D 飞行模拟,排队 90+ 分钟,DPA 必买" },
          { time: "S 级", what: "海底两万里", note: "美人鱼礁湖,排队 60+ 分钟" },
          { time: "A 级", what: "印第安纳琼斯·愤怒双神", note: "过山车,1 分半,排队 45 min" },
          { time: "A 级", what: "地心探险之旅", note: "矿车型轨道,刺激" },
          { time: "B 级", what: "辛巴达传奇之旅", note: "黑暗中的小船,排队短" },
          { time: "B 级", what: "神灯剧场", note: "阿拉伯风,室内剧场" },
          { time: "C 级", what: "尼莫与他的好朋友海底寻", note: "亲子向" },
          { time: "C 级", what: "美人鱼礁湖室内场馆", note: "下雨天首选" }
        ]
      },
      {
        icon: "🎀", title: "玲娜贝儿(LinaBell)限定 · 必收清单",
        items: [
          { time: "全球只在 2 处有售", what: "上海迪士尼 + 东京迪士尼海洋", note: "其他迪士尼(东京乐园 / 香港 / 巴黎 / 加州 / 奥兰多)都买不到" },
          { time: "DisneySea 主店", what: "美人鱼礁湖城 Mermaid Treasures", note: "周边、毛绒、文具大集合" },
          { time: "失落河三角洲", what: "Lost River Outfitters", note: "限定服装 / 帽子 / 包" },
          { time: "进园后", what: "建议先去抢热门项目卡再买", note: "热门款下午容易售罄" },
          { time: "现金 + IC", what: "店内支持刷卡 + 现金", note: "Suica / 银联 / Visa 都行" },
          { time: "尺寸提示", what: "毛绒玩偶 ¥3,500–¥6,500", note: "S 号比上海版略小,价位略低" }
        ]
      },
      {
        icon: "💴", title: "省钱 & 装备清单",
        items: [
          { time: "门票", what: "¥8,400(平日)~ ¥9,400(高峰)", note: "官网/飞猪/Klook 提前买稳" },
          { time: "DPA", what: "重点项目单买,¥1,500–2,500", note: "翱翔梦幻奇航必买,其他看人流" },
          { time: "装备", what: "椅子 / 防潮垫 / 伞 / 雨衣 / 帽子", note: "晚场 4–5 小时占位用" },
          { time: "保暖", what: "防风外套 / 暖宝宝 / 围巾", note: "海风大,夜场 3 度起跳" },
          { time: "餐饮", what: "园内 ¥1,500–3,000 / 餐", note: "可带轻食 / 在外面吃完进园" },
          { time: "水", what: "水杯自带,园内饮水机免费", note: "每个洗手间附近都有" },
          { time: "充电宝", what: "10000 mAh 起", note: "APP 全天高耗电,不带回家空手" },
          { time: "Apple ID", what: "切日区下载 Tokyo Disney APP", note: "中国区 App Store 没有" }
        ]
      },
      {
        icon: "🍔", title: "DisneySea 餐饮指南",
        items: [
          { time: "Sailing Day Buffet", what: "美式自助餐 ¥3,800/人", note: "美国海滨,座位舒服" },
          { time: "Cape Cod Cook-Off", what: "Duffy 主题餐厅", note: "亲子向 + 玩偶演出" },
          { time: "Casbah Food Court", what: "阿拉伯咖喱 ¥1,200", note: "性价比最高" },
          { time: "Mermaid Lagoon", what: "海洋主题快餐 ¥1,000", note: "室内,不晒不冷" },
          { time: "Mamma Biscotti's Bakery", what: "披萨 / 三明治 ¥800", note: "排队短" },
          { time: "外带零食", what: "奶油爆米花桶 ¥2,400", note: "桶可重复装,省后续买零食钱" }
        ]
      }
    ]
  }
};
