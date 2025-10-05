import type { Contact } from "../../types/messenger";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ArrowLeft,
  Phone,
  Video,
  User,
  Search,
  VolumeX,
  Star,
  UserX,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface ConversationInfoProps {
  selectedContact: Contact;
  onClose: () => void;
}

export default function ConversationInfo({
  selectedContact,
  onClose,
}: ConversationInfoProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-50 dark:bg-[#0a0a0a] animate-in slide-in-from-right duration-300">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border/30 flex items-center gap-3 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 dark:bg-[#0a0a0a]">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-sidebar-accent/50 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground dark:text-white">
            Conversation Info
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto messenger-scroll p-4 space-y-6">
          {/* Contact Info */}
          <div className="text-center space-y-4">
            <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/20 shadow-lg">
              <AvatarImage
                src={selectedContact.avatar}
                alt={selectedContact.name}
              />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-accent/20 dark:bg-[#1a1a1a] text-foreground dark:text-white font-bold">
                {selectedContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-foreground dark:text-white">
                {selectedContact.name}
              </h2>
              <p className="text-muted-foreground dark:text-gray-300 flex items-center justify-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    selectedContact.isOnline
                      ? "bg-online-indicator animate-pulse"
                      : "bg-muted-foreground/50"
                  )}
                />
                {selectedContact.isOnline ? "Active now" : "Last seen recently"}
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 dark:bg-[#1a1a1a] border-border/50 hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 active:scale-95 dark:border-gray-700 dark:hover:bg-[#2a2a2a]"
              >
                <Phone className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 dark:bg-[#1a1a1a] border-border/50 hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-110 transition-all duration-300 active:scale-95 dark:border-gray-700 dark:hover:bg-[#2a2a2a]"
              >
                <Video className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 dark:bg-[#1a1a1a] border-border/50 hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 transition-all duration-300 active:scale-95 dark:border-gray-700 dark:hover:bg-[#2a2a2a]"
              >
                <User className="h-5 w-5 text-foreground dark:text-white" />
              </Button>
            </div>
          </div>

          {/* Conversation Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wide">
              Conversation Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-emerald-500/20 hover:via-teal-500/15 hover:to-blue-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                <Search className="h-5 w-5" />
                Search in Conversation
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-amber-500/20 hover:via-orange-500/15 hover:to-yellow-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                <VolumeX className="h-5 w-5" />
                Mute Notifications
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-rose-500/15 hover:to-red-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                <Star className="h-5 w-5" />
                Add to Favorites
              </Button>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wide">
              Privacy & Security
            </h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-foreground dark:text-white hover:text-foreground dark:hover:text-white hover:bg-gradient-to-r hover:from-slate-500/20 hover:via-gray-500/15 hover:to-zinc-500/20 dark:hover:bg-[#2a2a2a] hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                <UserX className="h-5 w-5" />
                Block User
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-gradient-to-r hover:from-red-500/25 hover:via-rose-500/20 hover:to-pink-500/25 dark:hover:bg-[#2a1a1a] hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                <Trash2 className="h-5 w-5" />
                Delete Conversation
              </Button>
            </div>
          </div>

          {/* Shared Media */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wide">
              Shared Media
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-muted/50 to-muted/30 dark:bg-[#1a1a1a] rounded-lg flex items-center justify-center hover:from-muted/70 hover:to-muted/50 dark:hover:bg-[#2a2a2a] transition-all duration-200 cursor-pointer"
                >
                  <ImageIcon className="h-6 w-6 text-muted-foreground dark:text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
