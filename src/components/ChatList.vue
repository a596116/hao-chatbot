<template>
  <div class="chat-list">
    <BubbleList
      ref="bubbleListRef"
      :list="bubbleItems"
      :max-height="maxHeight"
      :show-back-button="true"
    >
      <template #footer="{ item }">
        <div class="message-time">
          {{ formatTime(item.timestamp) }}
        </div>
      </template>
    </BubbleList>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BubbleList } from 'vue-element-plus-x'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/BubbleList'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

type BubbleItem = BubbleListItemProps & {
  key: number
  role: 'user' | 'assistant'
  timestamp: number
}

interface ChatListProps {
  messages: Message[]
  isLoading?: boolean
  maxHeight?: string
}

const props = withDefaults(defineProps<ChatListProps>(), {
  isLoading: false,
  maxHeight: '400px',
})

const bubbleListRef = ref<any>()

// 將消息轉換為 BubbleList 所需的格式
const bubbleItems = computed<BubbleItem[]>(() => {
  const items: BubbleItem[] = props.messages.map((msg, index) => ({
    key: index,
    role: msg.role,
    placement: msg.role === 'user' ? 'end' : 'start',
    content: msg.content,
    loading: false,
    shape: 'corner',
    variant: msg.role === 'user' ? 'outlined' : 'filled',
    isMarkdown: false,
    typing: false,
    avatar: msg.role === 'user' ? '👤' : '🤖',
    avatarSize: '32px',
    avatarGap: '12px',
    timestamp: msg.timestamp,
  }))

  // 如果正在載入，添加一個載入中的消息
  if (props.isLoading) {
    items.push({
      key: props.messages.length,
      role: 'assistant',
      placement: 'start',
      content: '正在思考中...',
      loading: true,
      shape: 'corner',
      variant: 'filled',
      isMarkdown: false,
      typing: false,
      avatar: '🤖',
      avatarSize: '32px',
      avatarGap: '12px',
      timestamp: Date.now(),
    })
  }

  return items
})

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const scrollToBottom = () => {
  bubbleListRef.value?.scrollToBottom()
}

// 暴露方法給父組件
defineExpose({
  scrollToBottom,
})
</script>

<style scoped>
.chat-list {
  flex: 1;
  overflow: hidden;
  background: #f5f7fa;
}

/* 自定義 BubbleList 樣式 */
.chat-list :deep(.el-bubble-list) {
  padding: 20px;
}

/* 自定義用戶消息氣泡顏色 */
.chat-list :deep(.el-bubble--outlined) {
  background: var(--chatbot-primary-gradient, linear-gradient(135deg, #409EFF 0%, #337ecc 100%));
  color: white;
  border: none;
}

/* 消息時間樣式 */
.message-time {
  font-size: 12px;
  color: #999;
  padding: 4px 0 0 0;
  margin-left: 44px;
}
</style>

