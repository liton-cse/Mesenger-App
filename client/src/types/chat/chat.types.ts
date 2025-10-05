import type { MessengerState } from "../messenger";

export interface ChatAreaProps {
  state: MessengerState;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isMobileView: boolean;
  showChat: boolean;
  onBackToContacts: () => void;
  onChatMenuToggle: () => void;
  onSendMessage: () => void;
  onNewMessageChange: (message: string) => void;
  onStartRecording: (type: "audio" | "video") => void;
  onStopRecording: () => void;
  onToggleMobileOptions: () => void;
  onShowEmojiPicker: () => void;
  formatRecordingTime: (seconds: number) => string;
  formatTime: (date: Date) => string;
}
