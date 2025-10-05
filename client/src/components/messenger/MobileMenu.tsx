import { Button } from "../ui/button";
import { Info, Settings, Sun, Moon, Bell, User, LogOut } from "lucide-react";

interface MobileMenuProps {
  isDarkMode: boolean;
  onConversationInfo: () => void;
  onToggleDarkMode: () => void;
  onSettings: () => void;
  onClose: () => void;
}

export default function MobileMenu({
  isDarkMode,
  onConversationInfo,
  onToggleDarkMode,
  onSettings,
  onClose,
}: MobileMenuProps) {
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
          <div className="border-t border-border/30 my-1" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-emerald-500/20 hover:via-teal-500/15 hover:to-blue-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
            onClick={onSettings}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-violet-500/15 hover:to-purple-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-amber-500/20 hover:via-orange-500/15 hover:to-yellow-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-sky-500/15 hover:to-blue-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <div className="border-t border-border/30 my-1" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 text-sm text-destructive hover:text-destructive hover:bg-gradient-to-r hover:from-red-500/25 hover:via-rose-500/20 hover:to-pink-500/25 dark:hover:bg-[#2a1a1a] hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
