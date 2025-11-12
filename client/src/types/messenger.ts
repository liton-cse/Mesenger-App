import type { UserData } from "./auth/auth.type";
export type MESSAGE_STATUS = "sent" | "delivered" | "read";
export type IMessageRequestStatus = "pending" | "approved" | "denied";
export type MessageFormat = "text" | "audio" | "video" | "image";
export interface Message {
  _id?: string;
  id: string;
  conversationId?: string;
  senderId: string;
  receiverId?: string;
  content?: string;
  type: MessageFormat;
  status: MESSAGE_STATUS;
  MessageRequestStatus?: IMessageRequestStatus;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  duration?: number;
  updatedAt?: Date;
  timestamp: Date;
}
export interface MessagePreview {
  id: string;
  senderId: string;
  content: string;
  status: MESSAGE_STATUS;
  timestamp: string; // formatted for display, e.g., '2m', '1h'
  unread: boolean;
}

export interface Contact {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount?: number;
}

export interface MessengerState {
  selectedContact?: UserData | null;
  messages: Message[];
  newMessage: string;
  isTyping: boolean;
  isMobileView: boolean;
  showChat: boolean;
  showSettings: boolean;
  showChatMenu: boolean;
  showConversationInfo: boolean;
  isDarkMode: boolean;
  isRecording: boolean;
  recordingType: "audio" | "video" | null;
  recordingTime: number;
  showEmojiPicker: boolean;
  showMobileOptions: boolean;
  showMobileMenu: boolean;
  hoveredContact: string | null;
}
export interface ContactsSidebarProps {
  contacts?: UserData[];
  selectedContact: UserData;
  isMobileView: boolean;
  showChat: boolean;
  hoveredContact: string | null;
  onContactSelect: (contact: UserData) => void;
  onHoverContact: (id: string | null) => void;
  onSettingsToggle: () => void;
  onMobileMenuToggle: () => void;
}
