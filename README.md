# 🏮 数字易经 - AI 深度解卦版 (Digital I Ching AI)

一款融合了传统周易占卜逻辑与现代大语言模型（LLM）的深度解卦工具。用户通过经典的“掷钱起卦”法获取卦象，并由 AI 扮演的国学大师进行个性化的解卦分析。

## ✨ 项目特点

- **3D 仿真起卦**：基于 CSS 3D 动画模拟真实的铜钱翻转过程。
- **AI 深度解卦**：接入大模型接口，结合用户所求之事与占得卦象，生成针对性的建议。
- **输入校验机制**：AI 自动识别无效提问（如乱码、挑衅等），维护占卜的仪式感。
- **全栈架构**：前端采用原生 JS + CSS，后端采用 Vercel Serverless Functions 确保 API Key 安全。
- **新中式设计**：极简主义风格，适配移动端。

## 🏗️ 目录结构

```text
digital-yijing/
├── api/
│   └── interpret.js    # 后端云函数：处理 AI 逻辑与输入校验
├── css/
│   └── style.css       # 样式文件：包含 3D 动画与 AI 加载动效
├── js/
│   └── script.js       # 前端逻辑：负责起卦流程与异步 API 调用
├── index.html          # 主页面结构
└── README.md           # 项目说明文档
## 部署方式

### 1. 静态托管（推荐）

纯前端项目，无需后端。可直接部署到：

- **GitHub Pages** — 推送到仓库，开启 Pages 即可
- **Vercel** — `vercel deploy`
- **Netlify** — 拖拽文件夹上传或连接 Git 仓库
- **Cloudflare Pages** — 连接 Git 仓库自动部署

### 2. Nginx 部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/digital-yijing;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 3. 本地预览

```bash
# 使用 Python
python3 -m http.server 8080

# 或使用 Node.js
npx serve .
```

然后访问 `http://localhost:8080`

## 外部依赖

- [Google Fonts](https://fonts.google.com/) — Noto Serif SC & ZCOOL XiaoWei 字体（通过 CDN 加载）

## 许可

MIT License
