import { Plugin, DefineComponent } from 'vue'

// Props 類型定義
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

// Message 類型定義
export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 組件實例方法類型
export interface ChatbotInstance {
  setToken: (token: string | undefined) => void
}

// Chatbot 組件類型
export declare const Chatbot: DefineComponent<
  ChatbotProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {
    'message-sent': (message: string) => void
    'message-received': (message: string) => void
  }
>

// Vue 插件
declare const HaoChatbotPlugin: Plugin

export default HaoChatbotPlugin
export { HaoChatbotPlugin }

// 全局組件類型聲明（用於模板中使用）
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HaoChatbot: typeof Chatbot
  }
}
