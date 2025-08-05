# 优惠集市 - 优惠券聚合网站

一个简洁、移动端优先的优惠券聚合网站，集中展示各类生活服务的优惠券和推广活动。

## 功能特性

- 📱 移动端优先设计，完美适配手机屏幕
- 🎫 集中展示美团、饿了么、滴滴、高德等平台优惠券
- 📋 一键复制淘口令功能
- 🔗 直接跳转到活动页面
- 🎨 简洁美观的卡片式设计
- ⚡ 基于 Next.js 的快速加载体验

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **样式库**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **语言**: TypeScript

## 项目结构

```
coupon-app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # 主页面
│   │   ├── layout.tsx         # 布局组件
│   │   └── globals.css        # 全局样式
│   ├── components/
│   │   └── CouponCard.tsx     # 优惠券卡片组件
│   └── lib/
│       └── supabase.ts        # Supabase 配置
├── database/
│   └── schema.sql             # 数据库表结构
└── .env.local                 # 环境变量
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local` 文件并填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. 创建数据库表

在你的 Supabase 项目中执行 `database/schema.sql` 中的 SQL 语句来创建数据库表和插入示例数据。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 核心组件

### CouponCard 组件

优惠券卡片组件支持两种交互模式：

1. **复制口令模式** (`action_type: 'copy'`)
   - 点击按钮复制淘口令到剪贴板
   - 按钮文字临时变为"复制成功!"
   - 2秒后自动恢复原始文字

2. **跳转链接模式** (`action_type: 'link'`)
   - 点击按钮在新窗口打开活动页面
   - 支持各种外部链接跳转

### 数据库设计

`coupons` 表字段说明：

- `id`: 主键 (UUID)
- `brand_name`: 品牌名称
- `icon_url`: 品牌图标 URL
- `title`: 优惠券标题
- `description`: 优惠券描述
- `action_type`: 操作类型 ('copy' | 'link')
- `action_value`: 操作值（口令或链接）
- `button_text`: 按钮文字
- `is_active`: 是否激活
- `sort_order`: 排序权重

## Mock 数据

如果 Supabase 连接失败，网站会自动使用内置的 Mock 数据，确保开发和演示时的正常运行。

## 部署

项目可以部署到 Vercel、Netlify 等平台：

```bash
npm run build
npm start
```

## 许可证

MIT License
