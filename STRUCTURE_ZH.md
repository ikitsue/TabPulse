# 项目结构 - TabPilse

```
TabPilse/
├── manifest.json          # 扩展配置
├── background.js          # Service Worker（主要逻辑）
├── popup.html             # 弹出窗口界面
├── popup.js               # 弹出窗口逻辑
├── options.html           # 设置页面
├── options.js             # 设置逻辑
├── i18n.js                # 翻译系统
├── README.md              # 主要文档（多语言）
├── README_EN.md           # 英文文档
├── README_FR.md           # 法文文档
├── README_RU.md           # 俄文文档
├── README_ES.md           # 西班牙文文档
├── README_ZH.md           # 中文文档
├── STRUCTURE.md           # 项目结构（法文）
├── LICENSE                # MIT 许可证
├── .gitignore             # Git 忽略文件
├── images/                # 图标文件夹（可选）
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── README.md
└── [其他语言文件]
```

## 组织说明

- **manifest.json** : 根据需要检查权限
- **background.js** : 业务逻辑（添加新功能的地方）
- **popup.html/js** : 用户界面（修改显示的地方）
- **options.html/js** : 设置页面（语言、未来首选项）
- **i18n.js** : 翻译系统（在此添加新语言）
- **images/** : 放置您的 PNG 图标（16x16、48x48、128x128）

结构简洁但可扩展以供未来开发。
