import { Button } from "../ui/button";
import { Info, Search, VolumeX, Star, UserX, Trash2 } from "lucide-react";

interface ChatMenuProps {
  onConversationInfo: () => void;
  onClose: () => void;
}

export default function ChatMenu({
  onConversationInfo,
  onClose,
}: ChatMenuProps) {
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute top-16 right-4 w-64 bg-gradient-to-br from-purple-100/95 via-blue-50/90 to-cyan-50/95 dark:bg-[#0a0a0a] backdrop-blur-xl border border-border/30 rounded-lg shadow-2xl animate-in slide-in-from-top-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:via-purple-500/15 hover:to-cyan-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
            onClick={onConversationInfo}
          >
            <Info className="h-4 w-4" />
            Conversation Info
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-emerald-500/20 hover:via-teal-500/15 hover:to-blue-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <Search className="h-4 w-4" />
            Search in Conversation
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-amber-500/20 hover:via-orange-500/15 hover:to-yellow-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <VolumeX className="h-4 w-4" />
            Mute Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-rose-500/15 hover:to-red-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <Star className="h-4 w-4" />
            Add to Favorites
          </Button>
          <div className="border-t border-border/30 my-1" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-slate-500/20 hover:via-gray-500/15 hover:to-zinc-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <UserX className="h-4 w-4" />
            Block User
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-destructive hover:text-destructive hover:bg-gradient-to-r hover:from-red-500/25 hover:via-rose-500/20 hover:to-pink-500/25 dark:hover:bg-[#2a1a1a] hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <Trash2 className="h-4 w-4" />
            Delete Conversation
          </Button>
        </div>
      </div>
    </div>
  );
}
