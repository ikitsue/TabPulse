# 项目结构 - TabPulse

```
TabPulse/
├── manifest.json          # 扩展配置
├── background.js          # Service Worker（主要逻辑）
├── popup.html             # 弹出窗口界面
├── popup.js               # 弹出窗口逻辑
├── options.html           # 设置页面
├── options.js             # 设置逻辑
├── i18n.js                # 翻译系统
├── README.md              # 主要文档（多语言）
├── LICENSE                # MIT 许可证
├── .gitignore             # Git 忽略文件
├── docs/                  # 按语言的文档
│   ├── en/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   ├── fr/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   ├── ru/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   ├── es/
│   │   ├── README.md
│   │   └── STRUCTURE.md
│   └── zh/
│       ├── README.md
│       └── STRUCTURE.md
├── images/                # 图标文件夹（可选）
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── DOCUMENTATION_ALL.md   # 完整文档在一个文件中
```

## 组织说明

- **manifest.json** : 根据需要检查权限
- **background.js** : 业务逻辑（添加新功能的地方）
- **popup.html/js** : 用户界面（修改显示的地方）
- **options.html/js** : 设置页面（语言、未来首选项）
- **i18n.js** : 翻译系统（在此添加新语言）
- **docs/** : 按语言的文档（按语言代码组织）
- **images/** : 放置您的 PNG 图标（16x16、48x48、128x128）

结构简洁但可扩展以供未来开发。
