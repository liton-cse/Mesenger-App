import { useState, useRef, useEffect } from "react";
import type { Contact, Message, MessengerState } from "../types/messenger";
import { mockContacts, mockMessages } from "../data/mockData";

export const useMessenger = () => {
  const [state, setState] = useState<MessengerState>({
    selectedContact: mockContacts[0],
    messages: mockMessages,
    newMessage: "",
    isTyping: false,
    isMobileView: false,
    showChat: false,
    showSettings: false,
    showChatMenu: false,
    showConversationInfo: false,
    isDarkMode: false,
    isRecording: false,
    recordingType: null,
    recordingTime: 0,
    showEmojiPicker: false,
    showMobileOptions: false,
    showMobileMenu: false,
    hoveredContact: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setState((prev) => ({
        ...prev,
        isMobileView: isMobile,
        showChat: isMobile ? prev.showChat : false,
      }));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const updateState = (updates: Partial<MessengerState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleContactSelect = (contact: Contact) => {
    updateState({
      selectedContact: contact,
      showChat: state.isMobileView ? true : state.showChat,
    });
  };

  const handleBackToContacts = () => {
    updateState({ showChat: false });
  };

  const startRecording = (type: "audio" | "video") => {
    updateState({
      isRecording: true,
      recordingType: type,
      recordingTime: 0,
    });

    recordingInterval.current = setInterval(() => {
      setState((prev) => ({ ...prev, recordingTime: prev.recordingTime + 1 }));
    }, 1000);
  };

  const stopRecording = () => {
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }

    if (state.recordingType && state.recordingTime > 0) {
      const message: Message = {
        id: Date.now().toString(),
        type: state.recordingType,
        sender: "me",
        timestamp: new Date(),
        status: "sent",
        duration: state.recordingTime,
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
        isRecording: false,
        recordingType: null,
        recordingTime: 0,
      }));
    } else {
      updateState({
        isRecording: false,
        recordingType: null,
        recordingTime: 0,
      });
    }
  };

  const handleSendMessage = () => {
    if (!state.newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: state.newMessage,
      type: "text",
      sender: "me",
      timestamp: new Date(),
      status: "sent",
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
      newMessage: "",
      isTyping: true,
    }));

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon.",
        type: "text",
        sender: "other",
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, response],
        isTyping: false,
      }));
    }, 2000);
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    setState((prev) => ({
      ...prev,
      newMessage: prev.newMessage + emoji,
      showEmojiPicker: false,
    }));
    inputRef.current?.focus();
  };

  return {
    state,
    updateState,
    messagesEndRef,
    inputRef,
    handleContactSelect,
    handleBackToContacts,
    startRecording,
    stopRecording,
    handleSendMessage,
    formatRecordingTime,
    formatTime,
    handleEmojiSelect,
    mockContacts,
  };
};
