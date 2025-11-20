<template>
  <div class="demo-container">
    <div class="demo-content">
      <h1>🤖 Hao Chatbot 開發預覽</h1>
      <p>這是一個可嵌入任何網頁的 AI 聊天機器人組件</p>

      <div class="features">
        <h2>✨ 特性</h2>
        <ul>
          <li>🎨 美觀的 UI 設計</li>
          <li>📱 響應式佈局，支持移動端</li>
          <li>🔧 可自定義位置、大小和樣式</li>
          <li>📦 可通過 npm 或 CDN 引入</li>
          <li>⚡️ 基於 Vue 3 + TypeScript</li>
          <li>🚀 使用 Vite 打包，體積小巧</li>
        </ul>
      </div>

      <div class="usage">
        <h2>📖 使用方法</h2>
        <pre><code>// NPM 安裝
npm install hao-chatbot

// Vue 項目中使用
import HaoChatbot from 'hao-chatbot'
import 'hao-chatbot/dist/style.css'

app.use(HaoChatbot)

// 在模板中使用
&lt;HaoChatbot 
  title="客服助手"
  :position="{ bottom: '20px', right: '20px' }"
/&gt;</code></pre>
      </div>

      <div class="cdn-usage">
        <h2>🌐 CDN 使用</h2>
        <pre><code>&lt;!-- 引入 Chatbot --&gt;
&lt;link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css"&gt;
&lt;script src="https://unpkg.com/hao-chatbot"&gt;&lt;/script&gt;

&lt;script&gt;
  const { createApp } = Vue
  const app = createApp({})
  app.use(HaoChatbot)
  app.mount('#app')
&lt;/script&gt;</code></pre>
      </div>

      <p class="tip">👉 點擊右下角的按鈕體驗聊天功能！</p>
    </div>

    <!-- Chatbot 組件 -->
    <Chatbot
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
import Chatbot from './components/Chatbot.vue'

const handleMessageSent = (message: string) => {
  console.log('用戶發送:', message)
}

const handleMessageReceived = (message: string) => {
  console.log('AI 回覆:', message)
}
</script>

<style scoped>
.demo-container {
  min-height: 100vh;
  padding: 40px 20px;
}

.demo-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

h1 {
  color: #333;
  margin-bottom: 16px;
  font-size: 32px;
}

h2 {
  color: #667eea;
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 24px;
}

p {
  color: #666;
  line-height: 1.6;
  font-size: 16px;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 8px 0;
  color: #555;
  font-size: 16px;
}

.usage pre,
.cdn-usage pre {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 16px;
}

.usage code,
.cdn-usage code {
  color: #333;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.tip {
  margin-top: 32px;
  padding: 16px;
  background: #f0f4ff;
  border-left: 4px solid #667eea;
  border-radius: 4px;
  color: #667eea;
  font-weight: 500;
}

@media (max-width: 768px) {
  .demo-content {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
}
</style>
