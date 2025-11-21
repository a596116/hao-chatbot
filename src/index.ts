import { App, Plugin } from 'vue'
import Chatbot from './components/Chatbot.vue'

// 導出組件
export { Chatbot }
export * from './types/type'

// Vue 插件安裝函數
const install: Plugin = (app: App) => {
  app.component('HaoChatbot', Chatbot)
}

// 導出插件
export default {
  install,
}

// 支持 UMD 格式的全局註冊
if (typeof window !== 'undefined' && (window as any).Vue) {
  ;(window as any).HaoChatbot = {
    install,
  }
}

// 類型定義
export interface ChatbotProps {
  title?: string
  placeholder?: string
  position?: {
    bottom?: string
    right?: string
    left?: string
  }
  apiEndpoint?: string
  apiKey?: string
  token?: string
  tokenHeaderName?: string
  width?: string
  height?: string
  primaryColor?: string | { from: string; to: string }
}
