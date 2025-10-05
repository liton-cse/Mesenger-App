import type { ChatAreaProps } from "../../types/chat/chat.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ArrowLeft, MoreHorizontal, Phone, Video } from "lucide-react";
import { cn } from "../../lib/utils";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../redux/app/store";
import { useEffect } from "react";
import { getConversationId } from "../../redux/feature/messenger/messageSlice";

export default function ChatArea({
  state,
  messagesEndRef,
  inputRef,
  isMobileView,
  showChat,
  onBackToContacts,
  onChatMenuToggle,
  onNewMessageChange,
  onStartRecording,
  onStopRecording,
  onToggleMobileOptions,
  onShowEmojiPicker,
  formatRecordingTime,
  formatTime,
}: ChatAreaProps) {
  const {
    selectedContact,
    newMessage,
    isTyping,
    isRecording,
    recordingType,
    recordingTime,
    showMobileOptions,
  } = state;

  if (isMobileView && !showChat) {
    return null;
  }
  const dispatch = useAppDispatch();

  const { conversationId } = useAppSelector(
    (state: RootState) => state.messages
  );
  const { user } = useAppSelector((state: RootState) => state.loginAuth);
  useEffect(() => {
    dispatch(getConversationId(selectedContact.id));
  }, [selectedContact.id]);

  return (
    <div className={cn("flex-1 flex flex-col transition-all duration-300")}>
      {/* Chat Header */}
      <div className="p-4 border-b border-border/30 backdrop-blur-sm bg-gradient-to-r from-card/70 via-primary/5 to-accent/10 dark:bg-[#0a0a0a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobileView && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToContacts}
                className="h-8 w-8 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-foreground dark:text-white" />
              </Button>
            )}
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage
                  src={`${import.meta.env.VITE_IMAGE_URL}/${
                    selectedContact.image
                  }`}
                  alt={selectedContact.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 dark:bg-[#1a1a1a] text-foreground dark:text-white font-semibold">
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {selectedContact.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online-indicator rounded-full border-2 border-card dark:border-[#0a0a0a] animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-foreground dark:text-white">
                {selectedContact.name}
              </h2>
              <p className="text-sm text-muted-foreground dark:text-gray-300 flex items-center gap-1">
                {selectedContact.isOnline && (
                  <span className="w-1.5 h-1.5 bg-online-indicator rounded-full animate-pulse inline-block" />
                )}
                {selectedContact.isOnline ? "Active now" : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
            >
              <Phone className="h-5 w-5 text-foreground dark:text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
            >
              <Video className="h-5 w-5 text-foreground dark:text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
              onClick={onChatMenuToggle}
            >
              <MoreHorizontal className="h-5 w-5 text-foreground dark:text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto messenger-scroll p-4 space-y-4 bg-gradient-to-b from-transparent via-background/20 to-transparent dark:bg-[#0a0a0a]">
        <MessageBubble
          conversationId={conversationId}
          currentUserId={user?.id!}
          formatTime={formatTime}
          formatRecordingTime={formatRecordingTime}
        />

        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-left-2 duration-300">
            <div className="bg-gradient-to-r from-message-received via-message-received to-message-received/90 text-message-received-foreground px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-current rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-current rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        sendContactId={selectedContact.id}
        newMessage={newMessage}
        isRecording={isRecording}
        recordingType={recordingType}
        recordingTime={recordingTime}
        showMobileOptions={showMobileOptions}
        isMobileView={isMobileView}
        inputRef={inputRef}
        onNewMessageChange={onNewMessageChange}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        onToggleMobileOptions={onToggleMobileOptions}
        onShowEmojiPicker={onShowEmojiPicker}
        formatRecordingTime={formatRecordingTime}
      />
    </div>
  );
}
