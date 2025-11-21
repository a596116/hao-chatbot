// import type { App, Plugin } from 'vue'
// import Chatbot from './components/Chatbot.vue'

// // 導出類型
// export * from './types/type'

// // 為組件添加 install 方法
// Chatbot.install = (app: App) => {
//   app.component('HaoChatbot', Chatbot)
// }

// // 默認導出組件（帶 install 方法）
// export default Chatbot as typeof Chatbot & Plugin

// // 支持 UMD 格式的全局註冊
// if (typeof window !== 'undefined' && (window as any).Vue) {
//   ;(window as any).HaoChatbot = Chatbot
// }

export * from './components'
export * from './types/type'
