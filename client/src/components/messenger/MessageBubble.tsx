import { Mic, VideoIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { useEffect } from "react";
import { fetchMessages } from "../../redux/feature/messenger/chatSlice";

interface MessageBubbleProps {
  conversationId?: string | null;
  currentUserId: string;
  formatTime: (date: Date) => string;
  formatRecordingTime: (seconds: number) => string;
}

export default function MessageBubble({
  conversationId,
  currentUserId,
  formatTime,
  formatRecordingTime,
}: MessageBubbleProps) {
  const dispatch = useAppDispatch();
  const { messages, loading } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (conversationId) {
      dispatch(fetchMessages(conversationId));
    }
  }, [conversationId, dispatch]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Blank space if no messages
  if (!messages || messages.length === 0) {
    return <div className="h-32" />;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isMe = currentUserId && currentUserId === message.senderId;

        return (
          <div
            key={message._id}
            className={cn(
              "flex animate-in slide-in-from-bottom-2 duration-300",
              isMe ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md",
                isMe
                  ? "bg-gradient-to-r from-message-sent via-message-sent to-message-sent/90 text-message-sent-foreground rounded-br-md"
                  : "bg-gradient-to-r from-message-received via-message-received to-message-received/90 text-message-received-foreground rounded-bl-md"
              )}
            >
              {/* Text message */}
              {message.type === "text" && (
                <p className="text-sm leading-relaxed">{message.content}</p>
              )}

              {/* Video message */}
              {message.type === "video" && (
                <div className="space-y-2">
                  <div className="relative bg-black/10 dark:bg-[#1a1a1a] rounded-lg p-4 flex items-center justify-center">
                    <VideoIcon className="h-8 w-8 opacity-60" />
                    <div className="absolute bottom-2 right-2 bg-black/50 dark:bg-[#0a0a0a] text-white text-xs px-2 py-1 rounded">
                      {formatRecordingTime(message.duration || 0)}
                    </div>
                  </div>
                  <p className="text-xs opacity-70">Video message</p>
                </div>
              )}

              {/* Audio message */}
              {message.type === "audio" && (
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="w-8 h-8 bg-primary/20 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center">
                    <Mic className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1 bg-primary/30 rounded-full">
                      <div className="h-1 bg-primary rounded-full w-1/3" />
                    </div>
                  </div>
                  <span className="text-xs opacity-70">
                    {formatRecordingTime(message.duration || 0)}
                  </span>
                </div>
              )}

              {/* Timestamp and status */}
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">
                  {formatTime(new Date(message.createdAt))}
                </span>
                {isMe && message.messageStatus && (
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-200",
                      message.messageStatus.toLowerCase() === "sent" &&
                        "bg-current opacity-50",
                      message.messageStatus.toLowerCase() === "delivered" &&
                        "bg-current opacity-70",
                      message.messageStatus.toLowerCase() === "read" &&
                        "bg-current"
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
