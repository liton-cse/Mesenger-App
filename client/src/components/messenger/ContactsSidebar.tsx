import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
// import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Settings, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import SearchInput from "../baseComponents/Search";
import type { UserData } from "../../types/auth/auth.type";

interface ContactsSidebarProps {
  contacts: UserData[];
  selectedContact: UserData | null;
  isMobileView: boolean;
  showChat: boolean;
  hoveredContact: string | null;
  onContactSelect: (user: UserData) => void;
  onHoverContact: (id: string | null) => void;
  onSettingsToggle: () => void;
  onMobileMenuToggle: () => void;
}

export default function ContactsSidebar({
  contacts,
  selectedContact,
  isMobileView,
  showChat,
  hoveredContact,
  onContactSelect,
  onHoverContact,
  onSettingsToggle,
  onMobileMenuToggle,
}: ContactsSidebarProps) {
  return (
    <div
      className={cn(
        "border-r border-border/30 backdrop-blur-sm bg-gradient-to-b from-sidebar/70 via-sidebar/60 to-sidebar/70 dark:bg-[#0a0a0a] transition-all duration-300",
        isMobileView ? (showChat ? "hidden" : "w-full") : "w-80 lg:w-96"
      )}
    >
      <div className="p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 dark:bg-[#0a0a0a]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-foreground dark:text-white">
            Messenger
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
              onClick={onSettingsToggle}
            >
              <Settings className="h-4 w-4 text-foreground dark:text-white" />
            </Button>
            {isMobileView && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
                onClick={onMobileMenuToggle}
              >
                <MoreHorizontal className="h-4 w-4 text-foreground dark:text-white" />
              </Button>
            )}
          </div>
        </div>
        <SearchInput />
      </div>
      <div className="overflow-y-auto messenger-scroll h-[calc(100vh-140px)]">
        {contacts.map((user) => (
          <div
            key={user.id}
            onClick={() => onContactSelect(user)}
            onMouseEnter={() => onHoverContact(user.id)}
            onMouseLeave={() => onHoverContact(null)}
            className={cn(
              "p-4 cursor-pointer transition-all duration-300 border-b border-border/20 relative overflow-hidden group",
              "hover:bg-gradient-to-r hover:from-sidebar-accent/60 hover:via-sidebar-accent/40 hover:to-sidebar-accent/60 dark:hover:bg-[#1a1a1a]",
              "hover:shadow-lg hover:shadow-sidebar-accent/20 hover:scale-[1.02] hover:border-sidebar-accent/30",
              "active:scale-[0.98] active:transition-transform active:duration-100",
              selectedContact?.id === user.id &&
                "bg-gradient-to-r from-sidebar-accent/70 to-sidebar-accent/50 dark:bg-[#1a1a1a] shadow-md",
              hoveredContact === user?.id && "transform-gpu"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 dark:bg-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <Avatar
                  className={cn(
                    "h-12 w-12 transition-all duration-300 ring-0 ring-primary/20",
                    hoveredContact === user.id &&
                      "ring-2 ring-primary/30 shadow-lg"
                  )}
                >
                  <AvatarImage
                    src={`${import.meta.env.VITE_IMAGE_URL}/${user.image}`}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 dark:bg-[#1a1a1a] text-foreground dark:text-white font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 bg-online-indicator rounded-full border-2 border-sidebar dark:border-[#0a0a0a] transition-all duration-300",
                      hoveredContact === user.id
                        ? "animate-pulse scale-110"
                        : "animate-pulse"
                    )}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "font-medium text-foreground dark:text-white truncate transition-all duration-300",
                      hoveredContact === user.id && "text-primary font-semibold"
                    )}
                  >
                    {user.name}
                  </h3>
                  <span
                    className={cn(
                      "text-xs text-muted-foreground dark:text-gray-400 transition-all duration-300",
                      hoveredContact === user.id &&
                        "text-foreground dark:text-white font-medium"
                    )}
                  >
                    {user.timestamp}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm text-muted-foreground dark:text-gray-400 truncate transition-all duration-300",
                    hoveredContact === user.id &&
                      "text-foreground/80 dark:text-gray-300"
                  )}
                >
                  {user.lastMessage}
                </p>
              </div>
              {(user.unreadCount ?? 0) > 0 && (
                <Badge
                  variant="default"
                  className={cn(
                    "bg-primary text-primary-foreground animate-pulse transition-all duration-300",
                    hoveredContact === user.id && "scale-110 shadow-lg"
                  )}
                >
                  {user.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
