import { Button } from "../ui/button";
import {
  X,
  User,
  Sun,
  Moon,
  Bell,
  Palette,
  Shield,
  HelpCircle,
  MailQuestion,
} from "lucide-react";
import { cn } from "../../lib/utils";
import LogoutButton from "../baseComponents/Logout";
import SettingProfile from "../baseComponents/SettingProfile";
interface SettingsSidebarProps {
  isDarkMode: boolean;
  showSettings: boolean;
  onToggleSettings: () => void;
  onToggleDarkMode: () => void;
}

export default function SettingsSidebar({
  isDarkMode,
  showSettings,
  onToggleSettings,
  onToggleDarkMode,
}: SettingsSidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-card/95 via-card/90 to-card/95 dark:bg-[#0a0a0a] backdrop-blur-xl border-r border-border/30 shadow-2xl",
          "transform transition-all duration-300 ease-in-out",
          showSettings
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 dark:bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground dark:text-white">
              Settings
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSettings}
              className="hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
            >
              <X className="h-5 w-5 text-foreground dark:text-white" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-6">
          {/* Profile Card */}
          <SettingProfile />
          {/* Menu */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
            >
              <User className="h-5 w-5" />
              Profile Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
            >
              <Palette className="h-5 w-5" />
              Themes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
            >
              <MailQuestion className="h-5 w-5" />
              Message Requests
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
            >
              <Shield className="h-5 w-5" />
              Privacy & Security
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:to-sidebar-accent/30 dark:hover:bg-[#2a2a2a] transition-all duration-200"
            >
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out",
          showSettings ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggleSettings}
      />
    </>
  );
}
