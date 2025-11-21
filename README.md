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
  
  <!-- 初始化（會自動創建 DOM 元素） -->
  <script>
    HaoChatbot.mount({
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

  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
  <script>
    // 超級簡單的 API（會自動創建 DOM 元素）
    HaoChatbot.mount({
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
| `apiKey` | `string` | `undefined` | API 密鑰（向後兼容） |
| `token` | `string` | `undefined` | 認證 token（用於 API 請求） |
| `tokenHeaderName` | `string` | `'Authorization'` | Token 的 HTTP header 名稱 |

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

組件現在支持真實的 API 調用！只需設置 `apiEndpoint` 即可自動使用真實 API，否則會使用模擬回覆。

### 基本使用（帶 Token）

```vue
<template>
  <HaoChatbot
    api-endpoint="https://api.example.com/chat"
    :token="userToken"
    token-header-name="Authorization"
  />
</template>

<script setup>
import { ref } from 'vue'
import { HaoChatbot } from 'hao-chatbot'

const userToken = ref('your-token-here')
</script>
```

### 動態設置 Token（登入後）

如果 token 是在用戶登入後才獲得的，你可以通過組件實例動態設置：

```vue
<template>
  <HaoChatbot
    ref="chatbotRef"
    api-endpoint="https://api.example.com/chat"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { HaoChatbot } from 'hao-chatbot'

const chatbotRef = ref()

// 用戶登入後設置 token
onMounted(async () => {
  // 模擬登入流程
  const loginResponse = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username: 'user', password: 'pass' })
  })
  const { token } = await loginResponse.json()
  
  // 動態設置 token
  chatbotRef.value?.setToken(token)
})
</script>
```

### 使用獨立版本（CDN）

組件會自動創建 DOM 元素並添加到頁面，無需手動創建容器。

#### 方式 1：初始化時設置 token

```html
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  // 直接調用 mount，會自動創建並添加到頁面
  const chatbot = HaoChatbot.mount({
    apiEndpoint: 'https://api.example.com/chat',
    token: 'your-token-here'  // 如果初始化時就有 token
  })
</script>
```

#### 方式 2：初始化後動態設置 token（推薦）

如果你的 token 是在用戶登入後才獲得的，可以這樣使用：

```html
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  // 先初始化 chatbot（不傳入 token），會自動創建 DOM 元素
  const chatbot = HaoChatbot.mount({
    apiEndpoint: 'https://api.example.com/chat'
    // 注意：這裡不傳 token，因為登入後才會有
  })

  // 用戶登入後，動態設置 token
  async function handleLogin() {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'user',
          password: 'pass'
        })
      })
      
      const data = await response.json()
      
      // 登入成功後，設置 token
      if (data.token) {
        chatbot.setToken(data.token)
        console.log('Token 已設置，現在可以發送訊息了')
      }
    } catch (error) {
      console.error('登入失敗:', error)
    }
  }

  // 或者從 localStorage 讀取已保存的 token
  window.addEventListener('DOMContentLoaded', () => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      chatbot.setToken(savedToken)
    }
  })

  // 如果需要移除組件（例如登出時）
  function handleLogout() {
    chatbot.destroy()  // 會卸載組件並移除 DOM 元素
  }
</script>
```

**重要提示**：
- `setToken()` 方法會立即生效，後續發送的所有訊息都會帶上這個 token
- `destroy()` 方法可以卸載組件並移除 DOM 元素
- 組件會自動創建一個 `id="hao-chatbot-container"` 的 div 元素並添加到 `body`

### API 請求格式

組件會發送以下格式的請求：

```json
{
  "message": "用戶輸入的消息",
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

### API 響應格式

組件支持多種常見的響應格式：

- `{ "reply": "..." }`
- `{ "message": "..." }`
- `{ "content": "..." }`
- `{ "choices": [{ "message": { "content": "..." } }] }` (OpenAI 格式)
- 直接返回字符串

### 自定義 Token Header

如果你的 API 使用不同的 header 名稱：

```vue
<HaoChatbot
  api-endpoint="https://api.example.com/chat"
  token="your-token"
  token-header-name="X-Auth-Token"
/>
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

## 💡 TypeScript 支持

本組件提供完整的 TypeScript 類型定義，安裝後即可獲得類型提示。

### 使用類型

```typescript
import { Chatbot } from 'hao-chatbot'
import type { ChatbotProps, ChatbotInstance, Message } from 'hao-chatbot'

// 使用 Props 類型
const props: ChatbotProps = {
  title: 'AI 助手',
  apiEndpoint: 'https://api.example.com/chat',
  token: 'your-token',
}

// 使用實例類型（ref）
const chatbotRef = ref<ChatbotInstance>()

// 動態設置 token（有完整類型提示）
chatbotRef.value?.setToken('new-token')
```

### 全局組件類型

安裝插件後，在 Vue 模板中使用 `<HaoChatbot>` 時，會自動獲得 props 類型提示和自動完成。

```vue
<template>
  <!-- 自動提示所有可用的 props -->
  <HaoChatbot
    ref="chatbot"
    title="AI 助手"
    :token="token"
    @message-sent="handleMessageSent"
  />
</template>

<script setup lang="ts">
import type { ChatbotInstance } from 'hao-chatbot'

const chatbot = ref<ChatbotInstance>()
</script>
```

詳細的類型定義說明請參考 [TYPE_DEFINITIONS.md](./TYPE_DEFINITIONS.md)。

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
