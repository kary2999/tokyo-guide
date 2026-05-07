// 春节东京 9 天攻略数据
// image: 网络图(Unsplash CDN, 加载失败回落到渐变)
// lat/lng: 用于 Leaflet 地图
window.GUIDE_DATA = {
  meta: {
    title: "春节东京 9 日攻略",
    subtitle: "Tokyo Spring Festival Travel Guide",
    dateRange: "2024.02.09 — 2024.02.17",
    travelers: "2 人 / 9 天 8 晚"
  },

  // 9 天行程
  days: [
    {
      idx: 1, date: "02.09", lunar: "除夕", title: "大阪 USJ 暖场", emoji: "🎢",
      city: "大阪",
      blocks: [
        { time: "08:00", tag: "开园", text: "8:00–8:15 开园,9 点前直奔玛丽奥园区。Single Rider 单人通道排队不需坐一起。" },
        { time: "09:00", tag: "必玩", text: "哈利波特园区(鹰马飞行 / 禁忌之旅),排队约 45 分钟。" },
        { time: "Tip", tag: "省钱", text: "USJ 对第一批入园允许无快速券、无整理券直接进入。" }
      ]
    },
    {
      idx: 2, date: "02.10", lunar: "初一", title: "京都 / 大阪缓冲", emoji: "⛩️",
      city: "京都",
      blocks: [
        { time: "全天", tag: "随逛", text: "八坂神社、通天阁、和歌山,看体力随机选择。酒店需要抽玛丽奥联动主题房。" },
        { time: "夜宵", tag: "美食", text: "心斋桥章鱼烧、新世界元祖炸串(串かつだるま 新世界总本店)。" }
      ]
    },
    {
      idx: 3, date: "02.11", lunar: "初二", title: "大阪 → 收行李日", emoji: "🧳",
      city: "大阪",
      blocks: [
        { time: "—", tag: "缓冲", text: "整理行李,留出余量。下午到附近商场补购。" },
        { time: "晚餐", tag: "美食", text: "天满 鳴門鯛燒本舖 / 西洋茶館 布丁 ¥950。" }
      ]
    },
    {
      idx: 4, date: "02.12", lunar: "初三", title: "新干线初到东京", emoji: "🚄",
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
      idx: 5, date: "02.13", lunar: "初四", title: "迪士尼海洋(全天)", emoji: "🐚",
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
        { time: "票价", tag: "¥", text: "门票 ¥8,400 / DPA 单项另购。" }
      ]
    },
    {
      idx: 6, date: "02.14", lunar: "初五", title: "富士山一日", emoji: "🗻",
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
      idx: 7, date: "02.15", lunar: "初六", title: "镰仓 + 江之电", emoji: "🚃",
      city: "镰仓",
      blocks: [
        { time: "上午", tag: "海岸", text: "镰仓高校前站(灌篮高手取景平交道)。" },
        { time: "中午", tag: "公交", text: "公交去浅间神社 ⛩️ ,不骑行也能到。" },
        { time: "下午", tag: "返程", text: "镰仓 → 东京车站(横须贺线)。¥950" },
        { time: "傍晚", tag: "晚餐", text: "新宿 AFURI 辛红 / 上野 沼津港海将 放题(¥1,700)。" }
      ]
    },
    {
      idx: 8, date: "02.16", lunar: "初七", title: "城里 City Walk", emoji: "🏙️",
      city: "东京",
      blocks: [
        { time: "上午", tag: "购物", text: "涉谷 SKY / PARCO 极味や 汉堡牛排。" },
        { time: "下午", tag: "塔景", text: "晴空塔 / 浅草寺。Top Deck ¥2,800。" },
        { time: "晚餐", tag: "美食", text: "上野 一頭牛烧肉 房家 6 丁目店,五种肉 + 两饮 ¥5,110。" }
      ]
    },
    {
      idx: 9, date: "02.17", lunar: "初八", title: "回程", emoji: "✈️",
      city: "东京",
      blocks: [
        { time: "上午", tag: "退房", text: "酒店退房,机场快线/京成 Skyliner 出发。" },
        { time: "—", tag: "Tip", text: "预留 3 小时到机场,免税柜台需排队。" }
      ]
    }
  ],

  // 美食
  food: {
    "东京 · 银座 / 京桥": [
      { name: "銀座楸 ひさぎ", area: "銀座 6-12-16", price: "¥1,100 商业午餐", note: "tabelog 3.76,牡蛎牛排黑咖喱套餐", url: "https://tenjo.tw/ginza-hisagi/", lat: 35.6709, lng: 139.7661 },
      { name: "京橋松輪", area: "京橋 3-6-1", price: "限定 70 份", note: "tabelog 3.61,午餐限定竹筴鱼定食", url: "https://tenjo.tw/tokyo-food/", lat: 35.6771, lng: 139.7705 }
    ],
    "东京 · 上野 / 阿美横町": [
      { name: "一頭牛 燒肉房家 上野六丁目店", area: "上野 6-6-6", price: "¥980 起 / 套餐 ¥5,110", note: "国产和牛烧肉,一人也能吃", url: "https://maps.app.goo.gl/a34DXyXZrrrgt", lat: 35.7081, lng: 139.7758 },
      { name: "牛かつあおな", area: "上野 6-5-7", price: "—", note: "国产黑毛和牛炸牛排,十谷米 + 沙拉", lat: 35.7080, lng: 139.7758 },
      { name: "Domremy Outlet 上野不忍店", area: "上野 2-12-14", price: "¥便宜", note: "外表 NG 甜点 outlet,11:00–21:00", lat: 35.7099, lng: 139.7716 },
      { name: "沼津港 海將 上野一号店", area: "上野", price: "¥1,700 放题", note: "海鲜放题,阿美横町步行 2 分钟", url: "https://maps.app.goo.gl/Gg6viyTfvj8aQc1k8", lat: 35.7080, lng: 139.7758 }
    ],
    "东京 · 新宿": [
      { name: "泰然 TAIZEN", area: "新宿 1-23-11", price: "¥1,000 限量", note: "tabelog 3.69,极品比内地鸡亲子丼", lat: 35.6906, lng: 139.7065 },
      { name: "FISH (フィッシュ)", area: "西新宿 7-5-6", price: "—", note: "tabelog 3.58,印度咖喱三拼", lat: 35.6936, lng: 139.6918 },
      { name: "AFURI 辛红 新宿 SUBNADE", area: "新宿", price: "—", note: "爆辣拉面", url: "https://maps.app.goo.gl/cty18uxnJ2QM2ybn7", lat: 35.6914, lng: 139.7044 }
    ],
    "东京 · 浅草 / 涉谷": [
      { name: "Pelican Cafe", area: "浅草 寿 3-9-11", price: "—", note: "77 年老店传奇吐司,9:00 开门已排队", lat: 35.7141, lng: 139.7894 },
      { name: "壽々喜園 × ななや 浅草本店", area: "浅草 3-4-3", price: "—", note: "世界最浓抹茶冰淇淋,7 种浓度可选", lat: 35.7150, lng: 139.7934 },
      { name: "極味や 渋谷 PARCO 店", area: "涉谷 PARCO B1", price: "—", note: "汉堡牛排招牌,自烤铁板", url: "https://maps.app.goo.gl/bcXhx828J3VQn", lat: 35.6608, lng: 139.6989 },
      { name: "Red Rock 原宿店", area: "神宫前 3-25-12 B1", price: "—", note: "tabelog 3.51,神户牛排丼", lat: 35.6701, lng: 139.7077 }
    ],
    "东京 · 人形町 / 麻布": [
      { name: "柳屋鯛魚燒", area: "人形町 2-11-3", price: "—", note: "东京三大鯛魚燒之一,12:30–18:00 周日休", lat: 35.6857, lng: 139.7818 },
      { name: "麻布十番 浪花家總本店", area: "麻布十番 1-8-14", price: "—", note: "东京三大鯛魚燒之一,作者私心最推", lat: 35.6555, lng: 139.7359 },
      { name: "若葉鯛魚燒", area: "新宿 若葉 1-10", price: "—", note: "东京三大鯛魚燒,有内用座位", lat: 35.6849, lng: 139.7232 }
    ],
    "大阪 · 心斋桥 / 美国村": [
      { name: "わなか 道頓堀店", area: "道顿堀", price: "—", note: "章鱼烧名店", url: "https://maps.app.goo.gl/E8NtDNyfLCNoF", lat: 34.6688, lng: 135.5026 },
      { name: "元祖アイスドッグ", area: "美国村", price: "—", note: "冰狗 ICE DOG", url: "https://maps.app.goo.gl/Xon9EZNVme3Rx", lat: 34.6739, lng: 135.4970 },
      { name: "牛たん炭火焼 吉次 鰻谷店", area: "心斋桥 16:00–02:00", price: "—", note: "深夜烧牛舌", url: "https://maps.app.goo.gl/vLsZFsSfAGS7N", lat: 34.6770, lng: 135.5008 },
      { name: "一斗 東心斎橋店本館", area: "心斋桥", price: "2 人 ¥10,000+", note: "需提前预约", url: "https://maps.app.goo.gl/aWkwUimnjF7qU", lat: 34.6750, lng: 135.4998 }
    ],
    "大阪 · 新世界 / 天满": [
      { name: "串かつだるま 新世界総本店", area: "新世界通天阁", price: "¥1,800 / 11 串", note: "元祖炸串、鸡软骨、年糕", url: "https://maps.app.goo.gl/A6XS5jRcYhn3K", lat: 34.6526, lng: 135.5063 },
      { name: "和牛タン次郎 大阪天満店", area: "天满", price: "—", note: "牛舌专门", url: "https://maps.app.goo.gl/Sdk1xYRX5LTQS", lat: 34.7028, lng: 135.5152 },
      { name: "西洋茶館", area: "天满", price: "布丁 ¥950", note: "复古洋风茶屋", url: "https://maps.app.goo.gl/QLnYCC9ygndX8", lat: 34.7017, lng: 135.5114 },
      { name: "千鳥屋宗家 天滿店", area: "天满", price: "—", note: "甜酱油团子、千鸟馒头", url: "https://maps.app.goo.gl/sco9Hw4QH9hhM", lat: 34.7039, lng: 135.5135 }
    ]
  },

  // 景点 - 加 image / lat / lng
  attractions: [
    {
      name: "东京迪士尼海洋",
      tag: "必玩",
      hours: "9:00–21:00",
      price: "¥8,400 – 9,400",
      desc: "8:30 甚至 8:20 就开门;度假村酒店住客可早入园 15 分钟。入园即抢入场卡,APP 提前下载。重点项目:翱翔梦幻奇航、地心探险、印第安纳琼斯、愤怒双神(过山车)、辛巴达传奇之旅、神灯剧场。",
      tips: ["橘色项目用入场卡、红色项目用 DPA","下午前往美国海滨仅浏览,不交通","9 点前直奔人气区,刚入园人最多","水上花车 11:30 / 14:05 / 16:05"],
      url: "https://www.tokyodisneyresort.jp/tc/tdr/calendar.html",
      image: "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=800&q=80&auto=format&fit=crop",
      lat: 35.6267, lng: 139.8851,
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
      gradient: "linear-gradient(135deg,#ff6f61,#ffb199)"
    },
    {
      name: "晴空塔 SKYTREE",
      tag: "夜景",
      hours: "08:00–22:00",
      price: "¥3,100",
      desc: "445–450 楼天望回廊为最高 451.2m。340–350 楼天望甲板可在手扶梯间自由移动,345 楼有空中餐厅与玻璃地板。",
      tips: ["距离浅草步行 20 分钟","Sky Restaurant 需正装"],
      url: "https://maps.app.goo.gl/6kw39d31uaNevPUD7",
      image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80&auto=format&fit=crop",
      lat: 35.7100, lng: 139.8107,
      gradient: "linear-gradient(135deg,#42a5f5,#90caf9)"
    },
    {
      name: "浅草寺",
      tag: "经典",
      hours: "06:00–17:00",
      price: "免费",
      desc: "雷门、仲见世通、浅草寺一条龙。周边四条线路:东京メトロ银座线、都营浅草线、东武铁道、つくばエクスプレス。",
      tips: ["可衔接晴空塔 / 隅田川","逛吃推荐花月堂菠萝包"],
      image: "https://images.unsplash.com/photo-1583400845999-ec56cc9c98ae?w=800&q=80&auto=format&fit=crop",
      lat: 35.7148, lng: 139.7967,
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
      gradient: "linear-gradient(135deg,#0277bd,#4fc3f7)"
    },
    {
      name: "三鹰之森吉卜力美术馆",
      tag: "动漫",
      hours: "10:00–17:00",
      price: "¥3,773",
      desc: "宫崎骏亲自设计,需提前一个月抢票,每月 10 号放下个月票,可上网找代抢(需日本 IP)。",
      tips: ["三鹰站南口步行 15 分钟","或南口 9 号巴士站搭巴士 ¥210"],
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop",
      lat: 35.6962, lng: 139.5703,
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
      gradient: "linear-gradient(135deg,#d32f2f,#ffcdd2)"
    }
  ],

  // 个人相册 (从 numbers 文件提取的截图样本)
  myPhotos: [
    { src: "img/my-01.png", caption: "本人现场记录" },
    { src: "img/my-02.png", caption: "本人现场记录" },
    { src: "img/my-03.png", caption: "本人现场记录" },
    { src: "img/my-04.png", caption: "本人现场记录" },
    { src: "img/my-05.png", caption: "本人现场记录" },
    { src: "img/my-06.png", caption: "本人现场记录" }
  ],

  // 攻略 Tips
  tips: [
    { icon: "🎫", title: "迪士尼海洋 8 字心法", text: "8:20 入场 → 8:30 抢卡 → 9:00 首发热门 → 11:30 花车 → 12:00 红绿 DPA → 18:35 大乐团 → 19:20 梦之海 → 20:30 烟花。" },
    { icon: "🚄", title: "新干线提前买", text: "新大阪 → 东京 ¥32,000 / 4 小时,飞猪/官网 14 天前票稳。Suica 余额提前充足。" },
    { icon: "📱", title: "迪士尼 APP", text: "提前下载 Tokyo Disney APP,定位、抢卡、DPA、菜单、表演时刻全在里面。日区 Apple ID 不可少。" },
    { icon: "🌧️", title: "海洋装备", text: "椅子 / 防潮垫 / 伞 / 水杯 / 帽子 / 雨衣 / 暖宝宝。冬季海风大,加一件防风外套。" },
    { icon: "🍣", title: "Tabelog 选店", text: "tabelog ≥ 3.5 已是良好,3.6+ 名店,3.7+ 稳预约。营业时间 LO 表示最后点单。" },
    { icon: "🎟️", title: "晴空 vs 铁塔", text: "网友更推东京铁塔(夜景广)。Sky Restaurant 345F 需正装(商务装才让进)。" },
    { icon: "🚌", title: "御殿场奥莱", text: "新宿站巴士 4 层直达,秋叶原 / 横滨也有班次。返程接镰仓走横须贺线最顺。" },
    { icon: "🗻", title: "富士急 + 河口湖", text: "富士急乐园门票免费、项目单点付费。月江寺/日川时计店是富士山经典街拍机位。" },
    { icon: "🎨", title: "吉卜力抢票", text: "每月 10 号 10:00 放下个月票,L-Tike 系统,需日本 IP。三鹰站南口 9 号巴士 ¥210。" },
    { icon: "💴", title: "现金 vs 刷卡", text: "迪士尼、便利店、JR 自动售票普及刷卡;鯛魚燒老店、神社御守等多收现金。建议留 ¥10,000 现金/人。" }
  ]
};
