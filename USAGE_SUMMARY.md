# 🎯 使用總結

## 問題：為什麼一定要引入 Vue？

您問的非常好！原本的設計確實需要先引入 Vue.js，但這對於不使用 Vue 的網站來說很不方便。

## ✅ 解決方案

現在我們提供**兩個版本**，您可以根據需求選擇：

---

## 🌟 版本 1：獨立版本（推薦！）

### ✅ 優點
- **無需引入 Vue.js**
- **只需一個 script 標籤**
- **適用於任何網站**（HTML、WordPress、Shopify 等）

### 使用方法

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
</head>
<body>
  <!-- 你的網頁內容 -->
  <h1>歡迎！</h1>
  
  <div id="chatbot"></div>

  <!-- 獨立版本：包含 Vue，無需額外引入 -->
  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
  
  <script>
    HaoChatbot.mount('#chatbot', {
      title: '客服助手'
    })
  </script>
</body>
</html>
```

### 文件大小
- **110 KB** (gzip 壓縮後: **42 KB**)
- 包含 Vue 3 + Chatbot 組件

---

## 📦 版本 2：常規版本

### 適用場景
- 你的網站**已經**在使用 Vue 3
- 需要更小的文件大小

### 使用方法

```html
<!-- 方式 A：使用 Vue 插件 -->
<div id="app">
  <hao-chatbot title="客服"></hao-chatbot>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.umd.js"></script>

<script>
  const { createApp } = Vue
  createApp({}).use(HaoChatbot).mount('#app')
</script>
```

### 文件大小
- **5.6 KB** (不含 Vue)
- Vue 3: ~130 KB (如果你的網站已有，就不用重複載入)

---

## 🎯 我應該選哪個版本？

### 選擇獨立版本，如果：
- ✅ 你的網站**沒有**使用 Vue
- ✅ 你想要**最簡單**的集成方式
- ✅ 你不在乎多 40KB 的文件大小

### 選擇常規版本，如果：
- ✅ 你的網站**已經**在使用 Vue 3
- ✅ 你想要**最小**的文件大小
- ✅ 你可以接受引入兩個 script 標籤

---

## 📊 完整對比表

| 特性 | 獨立版本 ⭐ | 常規版本 |
|------|-----------|---------|
| **需要 Vue.js** | ❌ 否 | ✅ 是 |
| **script 標籤數量** | 1 個 | 2 個 |
| **文件大小** | 110 KB (gzip: 42KB) | 5.6 KB + Vue |
| **CDN 路徑** | `/hao-chatbot.standalone.umd.js` | `/hao-chatbot.umd.js` |
| **初始化方式** | `HaoChatbot.mount()` | `app.use(HaoChatbot)` |
| **適用場景** | 任何網站 | Vue 項目 |

---

## 🧪 本地測試

### 測試獨立版本
```bash
# 在瀏覽器中打開
open test-standalone.html
# 或
open demo-standalone.html
```

### 測試常規版本
```bash
open demo.html
```

---

## 📝 實際例子

### 例子 1：在 WordPress 中使用

```html
<!-- 在 footer.php 中添加 -->
<div id="chatbot"></div>
<link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  HaoChatbot.mount('#chatbot', {
    title: '線上客服',
    placeholder: '需要幫助嗎？'
  })
</script>
```

### 例子 2：在 Shopify 中使用

```html
<!-- 在 theme.liquid 的 </body> 之前添加 -->
<div id="chatbot"></div>
<link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  HaoChatbot.mount('#chatbot', {
    title: '購物助手'
  })
</script>
```

### 例子 3：在 HTML 網站中使用

```html
<!DOCTYPE html>
<html>
<head>
  <title>我的網站</title>
  <link rel="stylesheet" href="https://unpkg.com/hao-chatbot/dist/style.css">
</head>
<body>
  <h1>歡迎！</h1>
  
  <div id="chatbot"></div>
  <script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
  <script>
    HaoChatbot.mount('#chatbot', { title: '客服' })
  </script>
</body>
</html>
```

---

## ⚙️ 完整配置選項

```javascript
HaoChatbot.mount('#chatbot', {
  // 基本設置
  title: 'AI 助手',                    // 標題
  placeholder: '輸入訊息...',          // 輸入框提示
  
  // 位置（選擇 right 或 left）
  position: {
    bottom: '20px',
    right: '20px'                      // 或 left: '20px'
  },
  
  // 尺寸
  width: '400px',
  height: '600px',
  
  // API（可選）
  apiEndpoint: 'https://api.example.com/chat',
  apiKey: 'your-key',
})
```

---

## 🚀 發布到 npm

```bash
# 1. 登入 npm
npm login

# 2. 發布
npm publish
```

發布後，用戶可以通過以下方式使用：

```html
<!-- CDN -->
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>

<!-- npm -->
npm install hao-chatbot
```

---

## 📞 總結

**問題：** 為什麼一定要引入 Vue？

**答案：** 不用了！現在您可以使用**獨立版本**，只需一個 script 標籤，無需引入 Vue.js！

```html
<!-- 就這麼簡單！ -->
<script src="https://unpkg.com/hao-chatbot/dist/hao-chatbot.standalone.umd.js"></script>
<script>
  HaoChatbot.mount('#chatbot', { title: '客服' })
</script>
```

🎉 **完成！** 現在任何網站都可以輕鬆集成您的 chatbot！

