# 🤖 Hao Chatbot

一個可嵌入任何網頁的 AI 聊天機器人組件，基於 Vue 3 + TypeScript 構建。

## ✨ 特性

- 🎨 **美觀的 UI 設計** - 現代化的聊天界面
- 📱 **響應式佈局** - 完美支持桌面和移動設備
- 🔧 **高度可定制** - 支持自定義位置、大小、樣式
- 📦 **多種引入方式** - 支持 NPM、CDN 引入
- ⚡️ **輕量快速** - 基於 Vite 打包，體積小巧
- 🚀 **TypeScript 支持** - 完整的類型定義
- **無依賴版本** - 提供獨立版本，無需額外引入 Vue.js

## 📦 安裝

### 方式一：CDN 引入（獨立版本，推薦）⭐

**最簡單！只需要一個 script 標籤，無需引入 Vue.js！**

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 引入樣式 -->
  <link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
</head>
<body>
  <!-- 你的網頁內容 -->
  <h1>歡迎來到我的網站</h1>
  
  <!-- Chatbot 容器 -->
  <div id="chatbot"></div>

  <!-- 引入獨立版本（包含 Vue，無需額外引入） -->
  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
  
  <!-- 初始化 -->
  <script>
    HaoChatbot.mount('#chatbot', {
      title: '智能客服',
      placeholder: '請問有什麼可以幫助您？'
    })
  </script>
</body>
</html>
```

**文件大小：**
- `hao-chatbot.standalone.umd.js`: 110KB (gzip: 42KB)
- `style.css`: 4.5KB (gzip: 1.3KB)

### 方式二：CDN 引入（需要 Vue）

如果你的網站已經使用了 Vue 3，可以使用這個更小的版本：

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
</head>
<body>
  <div id="app">
    <hao-chatbot title="客服助手"></hao-chatbot>
  </div>

  <!-- 先引入 Vue 3 -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  
  <!-- 再引入 Chatbot -->
  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.umd.js"></script>
  
  <script>
    const { createApp } = Vue
    createApp({})
      .use(HaoChatbot)
      .mount('#app')
  </script>
</body>
</html>
```

**文件大小：**
- `vue.global.js`: ~130KB (來自 Vue.js 官方)
- `hao-chatbot.umd.js`: 5.5KB (gzip: 2.4KB)
- `style.css`: 4.5KB (gzip: 1.3KB)

### 方式三：NPM 安裝

```bash
npm install hao-chatbot
# 或
pnpm install hao-chatbot
# 或
yarn add hao-chatbot
```

## 🚀 使用方法

### 在 Vue 3 項目中使用

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import HaoChatbot from 'hao-chatbot'
import 'hao-chatbot/dist/style.css'

const app = createApp(App)
app.use(HaoChatbot)
app.mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <div>
    <h1>我的應用</h1>
    
    <HaoChatbot 
      title="AI 助手"
      placeholder="輸入訊息..."
      :position="{ bottom: '20px', right: '20px' }"
      width="400px"
      height="600px"
      @message-sent="handleMessageSent"
      @message-received="handleMessageReceived"
    />
  </div>
</template>

<script setup lang="ts">
const handleMessageSent = (message: string) => {
  console.log('用戶發送:', message)
}

const handleMessageReceived = (message: string) => {
  console.log('AI 回覆:', message)
}
</script>
```

### 在純 HTML/JavaScript 中使用（獨立版本）

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>我的網站</title>
  <link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
</head>
<body>
  <h1>歡迎！</h1>
  
  <div id="chatbot"></div>

  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
  <script>
    // 超級簡單的 API
    HaoChatbot.mount('#chatbot', {
      title: '🤖 智能助手',
      placeholder: '有什麼可以幫助您？',
      position: {
        bottom: '20px',
        right: '20px'
      },
      width: '400px',
      height: '600px'
    })
  </script>
</body>
</html>
```

## 🔧 Props 配置

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `title` | `string` | `'AI 助手'` | 聊天窗口標題 |
| `placeholder` | `string` | `'輸入訊息...'` | 輸入框佔位符 |
| `position` | `object` | `{ bottom: '20px', right: '20px' }` | 組件位置 |
| `width` | `string` | `'400px'` | 聊天窗口寬度 |
| `height` | `string` | `'600px'` | 聊天窗口高度 |
| `apiEndpoint` | `string` | `undefined` | API 端點地址 |
| `apiKey` | `string` | `undefined` | API 密鑰 |

## 📡 Events 事件

| 事件名 | 參數 | 說明 |
|--------|------|------|
| `message-sent` | `(message: string)` | 用戶發送消息時觸發 |
| `message-received` | `(message: string)` | 收到 AI 回覆時觸發 |

## 🎨 自定義樣式

你可以通過 CSS 變量來自定義樣式：

```css
:root {
  --chatbot-primary-color: #667eea;
  --chatbot-secondary-color: #764ba2;
}
```

或直接覆蓋樣式：

```css
/* 自定義按鈕顏色 */
.hao-chatbot-button {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
}

/* 自定義用戶消息氣泡 */
.user-message .message-bubble {
  background: #007aff !important;
}
```

## 🔌 整合 AI API

目前組件使用模擬回覆，你可以通過修改源代碼來整合真實的 AI API：

```typescript
// 在 Chatbot.vue 中
const mockApiCall = async (message: string): Promise<string> => {
  // 調用你的 AI API
  const response = await fetch(props.apiEndpoint || 'YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.apiKey}`
    },
    body: JSON.stringify({ message })
  })
  
  const data = await response.json()
  return data.reply
}
```

## 📊 版本比較

| 特性 | 常規版本 | 獨立版本 ⭐ |
|------|---------|-----------|
| 需要 Vue.js | ✅ 是 | ❌ 否 |
| 文件大小 | 5.5KB | 110KB (gzip: 42KB) |
| 引入複雜度 | 需要 2 個 script | 只需 1 個 script |
| 適用場景 | 已使用 Vue 的項目 | 任何網站 |
| CDN URL | `/hao-chatbot.umd.js` | `/hao-chatbot.standalone.umd.js` |

**推薦使用獨立版本**，除非你的項目已經在使用 Vue 3。

## 🎯 使用場景

- 🛒 **電商網站** - 添加智能客服，解答用戶問題
- 🏢 **企業官網** - 提供 7x24 小時智能諮詢服務
- 📚 **教育平台** - 為學生提供學習輔導
- 💼 **SaaS 產品** - 集成產品內用戶支持
- 📰 **內容網站** - 幫助訪客快速找到信息

## 📝 開發

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 構建所有版本（常規 + 獨立）
pnpm build

# 只構建常規版本
pnpm build:lib

# 只構建獨立版本
pnpm build:standalone

# 預覽構建結果
pnpm preview
```

## 🌐 CDN 選項

### unpkg（推薦）
```html
<!-- 獨立版本 -->
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>

<!-- 常規版本 -->
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.umd.js"></script>
```

### jsDelivr
```html
<!-- 獨立版本 -->
<script src="https://cdn.jsdelivr.net/npm/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>

<!-- 常規版本 -->
<script src="https://cdn.jsdelivr.net/npm/hao-chatbot/dist/hao-chatbot.umd.js"></script>
```

### 指定版本
```html
<script src="https://unpkg.com/hao-chatbot@1.0.0/dist/hao-chatbot.standalone.umd.js"></script>
```

## 📚 示例

查看 `examples/` 目錄中的完整示例：

- **vue-example.html** - Vue 3 使用示例
- **vanilla-js-example.html** - 純 JavaScript 示例
- **demo.html** - 功能演示頁面
- **demo-standalone.html** - 獨立版本演示

## 📄 License

MIT License © 2024 Hao Dai

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📮 聯繫

如有問題或建議，請通過 GitHub Issues 聯繫我們。

---

**⭐ 如果這個項目對你有幫助，請給個 Star！**
