import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Send,
  Plus,
  Smile,
  ImageIcon,
  Camera,
  Mic,
  VideoIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { addMessage } from "../../redux/feature/messenger/messageSlice";
// import { sendMessage } from "../../redux/feature/messenger/messageSlice";
import type { AppDispatch } from "../../redux/app/store";
import { sendMessage } from "../../redux/feature/messenger/messageSlice";

interface MessageInputProps {
  sendContactId: string;
  newMessage: string;
  isRecording: boolean;
  recordingType: "audio" | "video" | null;
  recordingTime: number;
  showMobileOptions: boolean;
  isMobileView: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNewMessageChange: (message: string) => void;
  onStartRecording: (type: "audio" | "video") => void;
  onStopRecording: () => void;
  onToggleMobileOptions: () => void;
  onShowEmojiPicker: () => void;
  formatRecordingTime: (seconds: number) => string;
}

export default function MessageInput({
  sendContactId,
  newMessage,
  isRecording,
  recordingType,
  recordingTime,
  showMobileOptions,
  isMobileView,
  inputRef,
  onNewMessageChange,
  onStartRecording,
  onStopRecording,
  onToggleMobileOptions,
  onShowEmojiPicker,
  formatRecordingTime,
}: MessageInputProps) {
  const dispatch: AppDispatch = useDispatch();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messagePayload = {
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "text" as const,
      receiverId: sendContactId,
    };

    dispatch(addMessage(messagePayload));
    dispatch(sendMessage(messagePayload));
    onNewMessageChange("");
  };

  // Recording send (audio/video)
  const handleSendRecording = (type: "audio" | "video") => {
    const messagePayload = {
      content: `[${type} message]`,
      timestamp: new Date().toISOString(),
      type,
      receiverId: sendContactId,
    };

    dispatch(addMessage(messagePayload));
    dispatch(sendMessage(messagePayload));
    onStopRecording();
  };

  // Recording UI
  if (isRecording) {
    return (
      <div className="p-4 border-t border-border/30 backdrop-blur-sm bg-gradient-to-r from-card/70 via-primary/5 to-accent/10 dark:bg-[#0a0a0a]">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 dark:bg-[#0a0a0a] rounded-lg border border-destructive/20 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {recordingType === "video" ? (
              <VideoIcon className="h-5 w-5 text-destructive animate-pulse" />
            ) : (
              <Mic className="h-5 w-5 text-destructive animate-pulse" />
            )}
            <span className="text-sm font-medium text-foreground dark:text-white">
              Recording {recordingType}... {formatRecordingTime(recordingTime)}
            </span>
          </div>
          <div className="flex-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendRecording(recordingType!)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            Stop & Send
          </Button>
        </div>
      </div>
    );
  }

  // Main Input UI
  return (
    <div className="p-4 border-t border-border/30 backdrop-blur-sm bg-gradient-to-r from-card/70 via-primary/5 to-accent/10 dark:bg-[#0a0a0a]">
      <div className="flex items-center gap-2">
        {isMobileView ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
              onClick={onToggleMobileOptions}
            >
              <Plus
                className={cn(
                  "h-5 w-5 transition-transform duration-200 text-foreground dark:text-white",
                  showMobileOptions && "rotate-45"
                )}
              />
            </Button>
            <div className="flex-1 min-w-0">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => onNewMessageChange(e.target.value)}
                placeholder="Type a message..."
                className="bg-gradient-to-r from-input/80 via-input/60 to-input/80 dark:bg-[#1a1a1a] border-border/30 focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>

            <div
              className={cn(
                "flex gap-1 transition-all duration-300 ease-in-out overflow-hidden",
                showMobileOptions
                  ? "opacity-100 max-w-[180px]"
                  : "opacity-0 max-w-0"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
                onClick={onShowEmojiPicker}
              >
                <Smile className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
              >
                <ImageIcon className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
              >
                <Camera className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
                onClick={() => onStartRecording("audio")}
              >
                <Mic className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="h-10 w-10 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground transition-all duration-200 flex-shrink-0 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <Plus className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
                onClick={onShowEmojiPicker}
              >
                <Smile className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <ImageIcon className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <Camera className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => onNewMessageChange(e.target.value)}
                placeholder="Type a message..."
                className="bg-gradient-to-r from-input/80 via-input/60 to-input/80 dark:bg-[#1a1a1a] border-border/30 focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
                onClick={() => onStartRecording("audio")}
              >
                <Mic className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="icon"
                className="h-10 w-10 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground transition-all duration-200 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
