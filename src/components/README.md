# 聊天機器人組件架構

## 組件結構

```
components/
├── Chatbot.vue         # 主容器組件
├── ChatHeader.vue      # 標題欄組件
├── ChatList.vue        # 聊天列表組件
└── ChatSender.vue      # 輸入框組件
```

## 組件說明

### 1. Chatbot.vue (主容器)

**職責**：
- 管理聊天視窗的開關狀態
- 控制浮動按鈕
- 協調子組件之間的通信
- 處理消息發送和接收邏輯
- 管理 API 調用

**Props**：
- `title`: 聊天視窗標題
- `placeholder`: 輸入框提示文字
- `position`: 聊天視窗位置 (bottom, right, left)
- `apiEndpoint`: API 端點 (可選)
- `apiKey`: API 金鑰 (可選)
- `width`: 視窗寬度
- `height`: 視窗高度

**Events**：
- `message-sent`: 用戶發送消息時觸發
- `message-received`: 接收到 AI 回應時觸發

---

### 2. ChatHeader.vue (標題欄)

**職責**：
- 顯示聊天機器人標題和圖標
- 提供關閉按鈕

**Props**：
- `title`: 標題文字 (預設: 'AI 助手')
- `icon`: 標題圖標 (預設: '🤖')

**Events**：
- `close`: 點擊關閉按鈕時觸發

**樣式**：
- 漸變色背景 (#667eea → #764ba2)
- 半透明懸停效果

---

### 3. ChatList.vue (聊天列表)

**職責**：
- 顯示聊天消息列表
- 使用 element-plus-x 的 BubbleList 組件
- 處理消息格式轉換
- 顯示載入狀態
- 提供滾動控制

**Props**：
- `messages`: 消息陣列
  ```typescript
  interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: number
  }
  ```
- `isLoading`: 是否顯示載入動畫 (預設: false)
- `maxHeight`: 列表最大高度 (預設: '400px')

**Methods (Exposed)**：
- `scrollToBottom()`: 滾動到列表底部

**特性**：
- 自動格式轉換為 BubbleList 格式
- 用戶消息顯示在右側 (漸變色背景)
- AI 消息顯示在左側 (白色背景)
- 顯示消息時間戳
- 返回底部按鈕 (滾動時自動顯示)

---

### 4. ChatSender.vue (輸入框)

**職責**：
- 處理用戶輸入
- 使用 element-plus-x 的 Sender 組件
- 實現語音識別功能
- 提供清除和提交功能

**Props**：
- `modelValue`: v-model 綁定值
- `placeholder`: 輸入提示 (預設: '輸入訊息... (Shift+Enter 換行)')
- `loading`: 載入狀態

**Events**：
- `update:modelValue`: 輸入內容變化
- `submit`: 提交消息
- `cancel`: 取消操作

**Methods (Exposed)**：
- `focus(position)`: 聚焦輸入框
  - `'start'`: 聚焦到開頭
  - `'end'`: 聚焦到結尾 (預設)
  - `'all'`: 選中全部文字

**語音識別功能**：
- 使用瀏覽器原生 Web Speech API
- 即時顯示識別結果
- 支持連續識別
- 自動追加到現有文字
- 錯誤處理和狀態提示

**語音識別流程**：
1. 點擊麥克風按鈕 → 保存基礎文本
2. 開始說話 → 即時顯示臨時識別結果
3. 語音確認 → 轉為最終文本
4. 繼續說話 → 繼續即時顯示新內容
5. 停止錄音 → 合併所有文本

---

## 數據流

```
用戶操作
    ↓
ChatSender (輸入/語音)
    ↓
    emit('submit')
    ↓
Chatbot (處理邏輯)
    ↓
    更新 messages
    ↓
ChatList (顯示消息)
```

## 樣式主題

- **主色調**：漸變紫色 (#667eea → #764ba2)
- **背景色**：白色 (#ffffff) / 淺灰 (#f5f7fa)
- **圓角**：12px - 16px
- **陰影**：多層次柔和陰影
- **動畫**：平滑過渡效果

## 使用範例

```vue
<template>
  <Chatbot
    title="我的 AI 助手"
    placeholder="輸入你的問題..."
    :position="{ bottom: '20px', right: '20px' }"
    width="400px"
    height="600px"
    @message-sent="handleMessageSent"
    @message-received="handleMessageReceived"
  />
</template>

<script setup>
import Chatbot from './components/Chatbot.vue'

const handleMessageSent = (message) => {
  console.log('用戶發送:', message)
}

const handleMessageReceived = (message) => {
  console.log('AI 回應:', message)
}
</script>
```

## 依賴

- **Vue 3.4+**
- **element-plus-x**: BubbleList 和 Sender 組件
- **Web Speech API**: 語音識別功能 (瀏覽器原生)

## 瀏覽器支援

- ✅ Chrome/Edge (推薦，語音識別效果最佳)
- ✅ Safari 14.1+
- ⚠️ Firefox (語音識別支援有限)

## 注意事項

1. 語音識別需要 HTTPS 或 localhost 環境
2. 首次使用需要授權麥克風權限
3. 建議在 Chrome 瀏覽器中使用以獲得最佳體驗

