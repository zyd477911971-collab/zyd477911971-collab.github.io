# One Wish Branch Pro

升级版静态网页，适合直接部署到 Cloudflare Pages / Vercel / Netlify。

## 这版新增内容

- 更强的暗黑氛围与分层动态背景
- 中央仪式场景：双手拉开柳枝，完成折断动画
- 可开关的环境音与折枝音效（Web Audio，无需外部音频文件）
- 更个性化的“预言结果”生成逻辑
- 一键导出结果图片 PNG
- 继续保留：中英文切换 / 自定义标题 / 单浏览器只能许一次愿

## 文件结构

```text
one-wish-branch-upgraded/
├── index.html
├── style.css
├── main.js
└── README.md
```

## 部署方法

### 方案 1：Cloudflare Pages
1. 新建 Pages 项目
2. 上传本目录全部文件
3. Build command 留空
4. Output directory 设为 `/`

### 方案 2：Vercel
1. 新建项目
2. 直接导入本文件夹
3. 这是纯静态页面，无需额外配置

## 测试说明

网页默认“一个浏览器只能许一次愿”。
如果你想反复测试，可以在网址后面加：

```text
?reset=1
```

例如：

```text
https://your-site.pages.dev/?reset=1
```

会清除本地记录与自定义内容。

## 可继续升级的方向

- 接入 AI API，让每个愿望生成真正独立的文案
- 增加登录与数据库，跨设备记录愿望
- 增加分享页 / 分享链接
- 增加真实 3D 场景（Three.js）
- 增加多结局主题包（柳枝 / 神谕石 / 蜡烛 / 镜子）
