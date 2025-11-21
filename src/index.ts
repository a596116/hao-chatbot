import { App } from 'vue'
import Chatbot from './components/Chatbot.vue'

// 導出組件
export { Chatbot }
export * from './types/type'

// 為組件添加 install 方法，讓它既可以作為插件使用，也可以直接作為組件使用
const HaoChatbot = Object.assign(Chatbot, {
  install: (app: App) => {
    app.component('HaoChatbot', Chatbot)
  },
})

// 導出插件和組件
export default HaoChatbot

// 支持 UMD 格式的全局註冊
if (typeof window !== 'undefined' && (window as any).Vue) {
  ;(window as any).HaoChatbot = HaoChatbot
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
