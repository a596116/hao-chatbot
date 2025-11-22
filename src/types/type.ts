export interface IMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface IChatbotProps {
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
  avatarUrl?: string
}

export type AttachmentType = 'media' | 'code-file' | 'code-folder'

export interface IAttachmentPayload {
  type: AttachmentType
  files: File[]
}
