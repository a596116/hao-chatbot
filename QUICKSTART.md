# 🚀 快速開始指南

## 🎯 目標

**3 分鐘內**在你的網頁中添加一個智能聊天機器人！**無需安裝 Vue.js！**

## ⚡ 最簡單的方式（獨立版本）

### 只需 3 步！

#### 步驟 1: 複製以下代碼到你的 HTML

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>我的網站</title>
  
  <!-- 引入 Chatbot 樣式 -->
  <link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
</head>
<body>
  <!-- 你的網頁內容 -->
  <h1>歡迎來到我的網站</h1>
  
  <!-- Chatbot 容器 -->
  <div id="chatbot"></div>

  <!-- 引入獨立版本（無需 Vue.js！） -->
  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
  
  <!-- 初始化 -->
  <script>
    HaoChatbot.mount('#chatbot', {
      title: '客服助手',
      placeholder: '請問有什麼可以幫助您？'
    })
  </script>
</body>
</html>
```

#### 步驟 2: 在瀏覽器中打開

就這麼簡單！你的聊天機器人已經可以使用了 🎉

#### 步驟 3: （可選）自定義配置

```javascript
HaoChatbot.mount('#chatbot', {
  title: '🤖 AI 助手',
  placeholder: '輸入您的問題...',
  position: {
    bottom: '20px',
    right: '20px'
  },
  width: '400px',
  height: '600px'
})
```

## 🆚 兩種版本對比

### ⭐ 獨立版本（推薦！）

**優點：**
- ✅ 只需引入 1 個 script 標籤
- ✅ 無需安裝或引入 Vue.js
- ✅ 適用於任何網站（WordPress、Shopify、純 HTML 等）
- ✅ 開箱即用

**缺點：**
- 文件稍大：110KB (gzip: 42KB)

**使用方式：**
```html
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  HaoChatbot.mount('#chatbot', { title: '客服' })
</script>
```

---

### 常規版本（適合 Vue 項目）

**優點：**
- ✅ 文件更小：5.5KB (gzip: 2.4KB)
- ✅ 適合已使用 Vue 3 的項目

**缺點：**
- ❌ 需要先引入 Vue.js
- ❌ 需要 2 個 script 標籤

**使用方式：**
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.umd.js"></script>
<script>
  const { createApp } = Vue
  createApp({}).use(HaoChatbot).mount('#app')
</script>
```

## 📦 在不同平台中使用

### 在 WordPress 中使用

1. 進入 WordPress 後台
2. 外觀 → 主題編輯器 → `footer.php`
3. 在 `</body>` 之前添加：

```html
<div id="chatbot"></div>
<link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  HaoChatbot.mount('#chatbot', {
    title: '客服中心',
    placeholder: '需要幫助嗎？'
  })
</script>
```

### 在 Shopify 中使用

1. 進入 Shopify 後台
2. Online Store → Themes → Edit code
3. 打開 `theme.liquid`
4. 在 `</body>` 之前添加相同的代碼

### 在 React 項目中使用

```jsx
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // 動態加載 script
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js'
    script.onload = () => {
      window.HaoChatbot.mount('#chatbot', {
        title: 'AI 客服'
      })
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div>
      <h1>我的 React 應用</h1>
      <div id="chatbot"></div>
    </div>
  )
}
```

## 🎨 完整配置選項

```javascript
HaoChatbot.mount('#chatbot', {
  // 基本配置
  title: 'AI 助手',                    // 聊天窗口標題
  placeholder: '輸入訊息...',          // 輸入框提示文字
  
  // 位置配置
  position: {
    bottom: '20px',                   // 距離底部距離
    right: '20px',                    // 距離右側距離
    // left: '20px',                  // 或距離左側距離
  },
  
  // 尺寸配置
  width: '400px',                     // 聊天窗口寬度
  height: '600px',                    // 聊天窗口高度
  
  // API 配置（可選）
  apiEndpoint: 'https://api.example.com/chat',
  apiKey: 'your-api-key',
})
```

## 📱 響應式設計

Chatbot 會自動適配移動設備！

在手機上：
- 聊天窗口會佔滿屏幕（扣除邊距）
- 自動調整大小和位置
- 優化觸摸操作

## 🔧 高級用法

### 動態創建容器

```javascript
// 自動創建容器
const container = document.createElement('div')
container.id = 'my-chatbot'
document.body.appendChild(container)

// 掛載 chatbot
HaoChatbot.mount('#my-chatbot', {
  title: '智能助手'
})
```

### 在多個頁面使用

創建一個共用的 `chatbot-init.js`：

```javascript
// chatbot-init.js
(function() {
  // 等待 DOM 載入完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
  
  function init() {
    // 創建容器
    const container = document.createElement('div')
    container.id = 'chatbot'
    document.body.appendChild(container)
    
    // 載入樣式
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/hao-chatbot/dist/style.css'
    document.head.appendChild(link)
    
    // 載入並初始化 chatbot
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js'
    script.onload = function() {
      HaoChatbot.mount('#chatbot', {
        title: '客服助手',
        placeholder: '需要幫助嗎？'
      })
    }
    document.body.appendChild(script)
  }
})()
```

然後在每個頁面引入：
```html
<script src="/js/chatbot-init.js"></script>
```

## 💡 常見問題

### Q: 為什麼獨立版本文件比較大？

A: 因為獨立版本包含了完整的 Vue 3 框架（約 110KB）。但 gzip 壓縮後只有 42KB，而且無需額外引入 Vue.js，總體來說更方便。

### Q: 如何整合真實的 AI API？

A: 目前需要修改源代碼。我們正在開發可以通過配置直接整合 API 的功能。

### Q: 支持 IE 瀏覽器嗎？

A: 不支持。支持所有現代瀏覽器（Chrome、Firefox、Safari、Edge）。

### Q: 可以改變位置到左下角嗎？

A: 可以！使用 `position: { bottom: '20px', left: '20px' }`

### Q: 可以同時在一個頁面放多個 chatbot 嗎？

A: 可以，只需要使用不同的容器 ID：

```javascript
HaoChatbot.mount('#chatbot1', { title: '銷售顧問' })
HaoChatbot.mount('#chatbot2', { title: '技術支持' })
```

## 🎯 下一步

1. ✅ 在你的網站上安裝 chatbot
2. 🎨 自定義樣式和配置
3. 🔌 整合真實的 AI API
4. 📊 收集用戶反饋
5. 🚀 持續優化

## 📞 需要幫助？

- 📖 查看[完整文檔](README.md)
- 🐛 [報告問題](https://github.com/your-username/hao-chatbot/issues)
- 💬 查看[示例代碼](examples/)

**開始使用吧！只需 3 分鐘，你就能擁有一個智能聊天機器人！** 🚀
