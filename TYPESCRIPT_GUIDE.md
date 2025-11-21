# TypeScript 使用指南

## 組件類型說明

`HaoChatbot` 現在是一個完整的 Vue 組件類型，並且支持作為插件安裝。IDE 會正確顯示組件的所有 props、events 和方法。

## ✅ 使用方式

### 方式 1: 作為組件直接使用（推薦）

```vue
<template>
  <div>
    <HaoChatbot
      title="AI 助手"
      :api-endpoint="apiEndpoint"
      :token="authToken"
      @message-sent="handleMessageSent"
    />
  </div>
</template>

<script setup lang="ts">
import HaoChatbot from 'hao-chatbot'
import 'hao-chatbot/dist/style.css'

const apiEndpoint = 'https://your-api.com/chat'
const authToken = 'your-token'

const handleMessageSent = (message: string) => {
  console.log('User sent:', message)
}
</script>
```

### 方式 2: 作為插件全局註冊

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import HaoChatbot from 'hao-chatbot'
import 'hao-chatbot/dist/style.css'

const app = createApp(App)
app.use(HaoChatbot) // 全局註冊為 <HaoChatbot>
app.mount('#app')
```

然後在任何組件中直接使用，無需再次導入：

```vue
<template>
  <HaoChatbot title="AI 助手" />
</template>
```

## 🎯 Props 類型定義

所有 props 都有完整的類型支持：

```typescript
interface IChatbotProps {
  // 基本配置
  title?: string                 // 標題，默認: 'AI 助手'
  placeholder?: string           // 輸入框提示文字
  avatarUrl?: string            // 機器人頭像 URL
  
  // 位置和尺寸
  position?: {
    bottom?: string             // 距離底部距離，默認: '20px'
    right?: string              // 距離右側距離，默認: '20px'
    left?: string               // 距離左側距離（可選）
  }
  width?: string                 // 寬度，默認: '400px'
  height?: string                // 高度，默認: '600px'
  
  // API 配置
  apiEndpoint?: string           // API 端點 URL
  apiKey?: string                // API 密鑰（已棄用，使用 token）
  token?: string                 // 認證 token
  tokenHeaderName?: string       // Token header 名稱，默認: 'Authorization'
  
  // 主題配置
  primaryColor?: string | {      // 主題顏色
    from: string                 // 漸變起始色
    to: string                   // 漸變結束色
  }
}
```

## 📤 Events

```typescript
// message-sent: 用戶發送消息時觸發
@message-sent="(message: string) => void"

// message-received: 收到回覆時觸發
@message-received="(message: string) => void"
```

## 🔧 組件實例方法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import HaoChatbot from 'hao-chatbot'

const chatbotRef = ref<InstanceType<typeof HaoChatbot>>()

// 動態設置 token
const updateToken = () => {
  chatbotRef.value?.setToken('new-token')
}
</script>

<template>
  <HaoChatbot ref="chatbotRef" />
</template>
```

## ✅ 類型檢查和自動完成

你可以驗證類型是否正確：

```vue
<script setup lang="ts">
import HaoChatbot from 'hao-chatbot'

// ✅ 正確：TypeScript 會檢查 props 類型
const props = {
  title: 'AI 助手',
  width: '500px',
  apiEndpoint: 'https://api.example.com'
}

// ❌ 錯誤：TypeScript 會報錯
const invalidProps = {
  title: 123,  // 類型錯誤！應該是 string
  width: true  // 類型錯誤！應該是 string
}
</script>

<template>
  <!-- Vue 會進行完整的 props 類型檢查 -->
  <HaoChatbot v-bind="props" />
</template>
```

## 🎨 完整示例

```vue
<template>
  <div class="app">
    <h1>我的 AI 助手</h1>
    
    <HaoChatbot
      ref="chatbotRef"
      title="智能客服"
      placeholder="有什麼可以幫您？"
      :position="{ bottom: '20px', right: '20px' }"
      width="450px"
      height="650px"
      :primary-color="{ from: '#667eea', to: '#764ba2' }"
      :api-endpoint="apiEndpoint"
      :token="authToken"
      token-header-name="Authorization"
      avatar-url="/bot-avatar.png"
      @message-sent="handleMessageSent"
      @message-received="handleMessageReceived"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HaoChatbot from 'hao-chatbot'
import 'hao-chatbot/dist/style.css'

const chatbotRef = ref<InstanceType<typeof HaoChatbot>>()
const apiEndpoint = 'https://your-api.com/chat'
const authToken = ref('initial-token')

const handleMessageSent = (message: string) => {
  console.log('用戶發送:', message)
}

const handleMessageReceived = (message: string) => {
  console.log('收到回覆:', message)
}

// 動態更新 token
onMounted(() => {
  setTimeout(() => {
    authToken.value = 'new-token'
    chatbotRef.value?.setToken('new-token')
  }, 5000)
})
</script>
```

## 📚 總結

- ✅ **默認導出** `HaoChatbot` 是完整的 Vue 組件，具有正確的 TypeScript 類型
- ✅ **類型定義完整**，支持所有 props、events 和方法的類型檢查
- ✅ **IDE 自動完成**，在編寫模板時會自動提示所有可用的 props 和事件
- ✅ **同時支持插件模式**，可以使用 `app.use()` 全局註冊

**直接使用 `import HaoChatbot from 'hao-chatbot'` 即可享受完整的 TypeScript 支持！** 🎉

