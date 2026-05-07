# 春节东京攻略 · 网页版

一份完整的春节东京 9 日游攻略,提供三套 UI 风格供选择,所有内容共享同一份数据,改一处全站同步。

## 文件结构

```
tokyo-guide/
├── index.html      # 三模板预览首页(GitHub Pages 默认入口)
├── sakura.html     # 模板一:樱花粉彩 — 和风浪漫
├── vintage.html    # 模板二:复古印刷 — 报刊手册风
├── journal.html    # 模板三:手账风   — 方格本 + 胶带便签
├── data.js         # 攻略数据(行程 / 美食 / 景点 / Tips)
└── README.md
```

## 内容模块

四个核心板块,三套模板都覆盖:

1. **9 天行程时间轴** — 除夕到初八,每天分时间块(USJ / 京都 / 新干线 / 迪士尼海洋 / 富士急 / 镰仓 / 东京 City Walk)
2. **美食地图清单** — 东京(银座 / 上野 / 新宿 / 浅草 / 涉谷 / 人形町)+ 大阪(心斋桥 / 美国村 / 新世界 / 天满)
3. **景点详情卡片** — 迪士尼海洋、SHIBUYA SKY、Small Worlds、富士急、东京铁塔、晴空塔、浅草寺、镰仓高校前、横滨高达工厂、墨田水族馆、三鹰之森吉卜力、横滨中华街
4. **攻略 Tips & 票价** — 迪士尼 8 字心法、新干线、APP、Tabelog 选店、晴空 vs 铁塔、御殿场、富士急、吉卜力抢票、现金 vs 刷卡

## 修改攻略内容

只需编辑 `data.js`,三个模板会自动同步。结构示例:

```js
window.GUIDE_DATA = {
  meta: { title, dateRange, travelers },
  days: [ { idx, date, lunar, title, emoji, city, blocks: [...] } ],
  food: { "区域": [ { name, area, price, note, url } ] },
  attractions: [ { name, tag, hours, price, desc, tips, url } ],
  tips: [ { icon, title, text } ]
};
```

## 本地预览

任意一个静态文件服务器都行,例如:

```bash
cd tokyo-guide
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

或直接双击 `index.html`(注意部分浏览器对 file:// 加载 data.js 有限制,推荐用 http server)。

## 部署到 GitHub Pages

1. 把整个 `tokyo-guide/` 目录推送到 GitHub 仓库的 `main` 分支根目录
2. 仓库 Settings → Pages → Source 选 `Deploy from a branch`
3. Branch 选 `main` / `(root)`,保存
4. 等 1–2 分钟,访问 `https://<你的用户名>.github.io/<仓库名>/`

如果想直接把模板设为首页(跳过预览页),把对应的 html 复制为 `index.html` 即可。

## 字体说明

模板用了 Google Fonts(Noto Serif JP / DM Serif Display / Caveat / Patrick Hand 等),首次加载会从 fonts.googleapis.com 拉取。在国内访问偏慢的话,可以替换为本地字体或 CDN 镜像。

---

Made with care for a real Tokyo trip · 2024 春节
