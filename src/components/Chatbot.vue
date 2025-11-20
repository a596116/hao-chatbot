<template>
  <div class="hao-chatbot-wrapper" :style="themeStyle">
    <!-- 浮動按鈕 -->
    <transition name="fade">
      <div
        v-if="!isOpen"
        class="hao-chatbot-button"
        @click="toggleChat"
        :style="{ ...buttonStyle, ...themeStyle }"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path
            d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
          />
        </svg>
      </div>
    </transition>

    <!-- 聊天視窗 -->
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="hao-chatbot-container"
        :class="{ 'is-fullscreen': isFullscreen }"
        :style="{ ...containerStyle, ...themeStyle }"
      >
        <!-- 標題欄 -->
        <ChatHeader
          :title="title"
          @close="toggleChat"
          @toggle-fullscreen="toggleFullscreen"
        />

        <!-- 聊天內容區域 -->
        <ChatList
          ref="chatListRef"
          :messages="messages"
          :is-loading="isLoading"
          :max-height="'100%'"
        />

        <!-- 輸入區域 -->
        <ChatSender
          ref="chatSenderRef"
          v-model="inputMessage"
          :placeholder="placeholder"
          :loading="isLoading"
          @submit="handleSend"
          @cancel="handleCancel"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onUnmounted } from 'vue'
import ChatHeader from './ChatHeader.vue'
import ChatList from './ChatList.vue'
import ChatSender from './ChatSender.vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatbotProps {
  title?: string
  placeholder?: string
  position?: {
    bottom?: string
    right?: string
    left?: string
  }
  apiEndpoint?: string
  apiKey?: string
  width?: string
  height?: string
  primaryColor?: string | { from: string; to: string }
}

const props = withDefaults(defineProps<ChatbotProps>(), {
  title: 'AI 助手',
  placeholder: '輸入訊息... (Shift+Enter 換行)',
  position: () => ({ bottom: '20px', right: '20px' }),
  width: '400px',
  height: '600px',
  primaryColor: '#409EFF', // 默認藍色
})

const emit = defineEmits<{
  (e: 'message-sent', message: string): void
  (e: 'message-received', message: string): void
}>()

const isOpen = ref(false)
const isFullscreen = ref(false)
const inputMessage = ref('')
const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '您好！我是 AI 助手，有什麼可以幫助您的嗎？',
    timestamp: Date.now(),
  },
])
const isLoading = ref(false)
const chatListRef = ref<any>()
const chatSenderRef = ref<any>()

const buttonStyle = computed(() => ({
  bottom: props.position.bottom,
  right: props.position.right,
  left: props.position.left,
}))

const containerStyle = computed(() => {
  const baseStyle: any = {
    width: props.width,
    height: props.height,
  }

  if (props.position.right) {
    baseStyle.right = props.position.right
  }
  if (props.position.left) {
    baseStyle.left = props.position.left
  }
  if (props.position.bottom) {
    baseStyle.bottom = props.position.bottom
  }

  if (isFullscreen.value) {
    baseStyle.width = '100vw'
    baseStyle.height = '100vh'
    baseStyle.bottom = '0'
    baseStyle.right = '0'
    baseStyle.borderRadius = '0'
  }

  return baseStyle
})

// 主題顏色樣式
const themeStyle = computed(() => {
  const primary = props.primaryColor

  // 如果是字符串，使用單色（自動生成漸變）
  if (typeof primary === 'string') {
    // 將顏色轉換為漸變（稍微變暗作為結束色）
    const toColor = darkenColor(primary, 15)
    return {
      '--chatbot-primary': primary,
      '--chatbot-primary-from': primary,
      '--chatbot-primary-to': toColor,
      '--chatbot-primary-gradient': `linear-gradient(135deg, ${primary} 0%, ${toColor} 100%)`,
    }
  }

  // 如果是對象，使用自定義漸變
  return {
    '--chatbot-primary': primary.from,
    '--chatbot-primary-from': primary.from,
    '--chatbot-primary-to': primary.to,
    '--chatbot-primary-gradient': `linear-gradient(135deg, ${primary.from} 0%, ${primary.to} 100%)`,
  }
})

// 將顏色變暗的工具函數
const darkenColor = (color: string, percent: number): string => {
  // 如果是十六進制顏色
  if (color.startsWith('#')) {
    const num = parseInt(color.replace('#', ''), 16)
    const r = Math.max(0, ((num >> 16) & 0xff) - percent)
    const g = Math.max(0, ((num >> 8) & 0xff) - percent)
    const b = Math.max(0, (num & 0xff) - percent)
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }
  // 如果是其他格式，返回原色
  return color
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    isFullscreen.value = false
  }
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
      chatSenderRef.value?.focus('end')
    })
  }
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  // 等待過渡動畫完成後重新計算並滾動
  nextTick(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 500) // 配合 CSS 過渡時間
  })
}

const handleCancel = () => {
  isLoading.value = false
}

const handleSend = async () => {
  const message = inputMessage.value.trim()
  if (!message || isLoading.value) return

  // 添加用戶消息
  messages.value.push({
    role: 'user',
    content: message,
    timestamp: Date.now(),
  })

  inputMessage.value = ''
  emit('message-sent', message)

  nextTick(() => {
    scrollToBottom()
  })

  // 模擬 AI 回應
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await mockApiCall(message)

    messages.value.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
    })

    emit('message-received', response)

    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('發送消息失敗:', error)
    messages.value.push({
      role: 'assistant',
      content: '抱歉，發生了錯誤，請稍後再試。',
      timestamp: Date.now(),
    })
  } finally {
    isLoading.value = false
  }
}

// 模擬 API 調用
const mockApiCall = async (message: string): Promise<string> => {
  const responses = [
    '這是一個很好的問題！讓我想想...',
    '我理解您的意思了。',
    '根據您的描述，我建議...',
    '這個問題我可以幫助您！',
    '讓我為您解答這個問題。',
  ]
  return responses[Math.floor(Math.random() * responses.length)] + ' ' + message
}

const scrollToBottom = () => {
  nextTick(() => {
    chatListRef.value?.scrollToBottom()
  })
}

// 監聽全屏狀態，控制 body 滾動和重新計算高度
watch(isFullscreen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }

  // 等待過渡動畫完成後重新計算聊天列表高度
  nextTick(() => {
    setTimeout(() => {
      if (chatListRef.value) {
        chatListRef.value.scrollToBottom?.()
      }
    }, 500)
  })
})

// 組件卸載時恢復 body 滾動
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.hao-chatbot-wrapper {
  position: fixed;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
}

/* 浮動按鈕 */
.hao-chatbot-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(
    --chatbot-primary-gradient,
    linear-gradient(135deg, #409eff 0%, #337ecc 100%)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: fixed;
}

.hao-chatbot-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* 聊天容器 */
.hao-chatbot-container {
  position: fixed;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.hao-chatbot-container.is-fullscreen {
  border-radius: 0;
  box-shadow: none;
}

/* 動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hao-chatbot-container {
    width: calc(100vw - 32px) !important;
    height: calc(100vh - 100px) !important;
    left: 16px !important;
    right: 16px !important;
    bottom: 16px !important;
  }
}
</style>
