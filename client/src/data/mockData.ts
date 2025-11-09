import type { Contact, Message } from "../types/messenger";

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Creative Director",
    image: "/professional-woman-diverse.png",
    lastMessage: "Great work on the slides! Love it! Just one more thing...",
    timestamp: "2m",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    image: "/woman-with-glasses.png",
    lastMessage: "Can we schedule a meeting for tomorrow?",
    timestamp: "1h",
    isOnline: true,
  },
  // ... rest of contacts
];

export const mockMessages: Message[] = [
  {
    _id: "1",
    content: "Hey! Are you here?",
    type: "text",
    senderId: "me",
    timestamp: new Date(Date.now() - 300000),
    status: "read",
  },
  {
    _id: "2",
    content: "Yeah...",
    type: "text",
    senderId: "other",
    timestamp: new Date(Date.now() - 240000),
  },
];
