/**
 * 獨立版本入口文件
 * 提供簡化的 API，無需手動創建 Vue 應用
 */
import { createApp, h } from 'vue'
import Chatbot from './components/Chatbot.vue'

interface MountOptions {
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
  onMessageSent?: (message: string) => void
  onMessageReceived?: (message: string) => void
}

/**
 * 簡化的掛載函數
 * @param selector - CSS 選擇器或 DOM 元素
 * @param options - 配置選項
 */
function mount(selector: string | Element, options: MountOptions = {}) {
  const {
    onMessageSent,
    onMessageReceived,
    ...props
  } = options

  const app = createApp({
    render() {
      return h(Chatbot, {
        ...props,
        onMessageSent,
        onMessageReceived
      })
    }
  })

  const container = typeof selector === 'string' 
    ? document.querySelector(selector)
    : selector

  if (!container) {
    throw new Error(`Cannot find element: ${selector}`)
  }

  return app.mount(container)
}

// 導出為全局 API
export default {
  mount
}

// 掛載到 window（用於 CDN 引入）
if (typeof window !== 'undefined') {
  (window as any).HaoChatbot = { mount }
}

