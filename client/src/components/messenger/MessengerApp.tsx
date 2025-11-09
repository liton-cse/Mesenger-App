import { useMessenger } from "../../hooks/useMessenger";
import { cn } from "../../lib/utils";
import ContactsSidebar from "./ContactsSidebar";
import ChatArea from "./ChatArea";
import SettingsSidebar from "./SettingsSidebar";
import ConversationInfo from "./ConversationInfo";
import ChatMenu from "./ChatMenu";
import MobileMenu from "./MobileMenu";
import EmojiPicker from "./EmojiPicker";

export default function MessengerApp() {
  const {
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
    users,
  } = useMessenger();

  const {
    isDarkMode,
    showSettings,
    showConversationInfo,
    showChatMenu,
    showMobileMenu,
    showEmojiPicker,
    isMobileView,
    showChat,
  } = state;

  return (
    <div
      className={cn(
        "h-screen flex bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-50 dark:bg-[#0a0a0a] transition-all duration-500",
        isDarkMode && "dark"
      )}
    >
      <SettingsSidebar
        isDarkMode={isDarkMode}
        showSettings={showSettings}
        onToggleSettings={() => updateState({ showSettings: !showSettings })}
        onToggleDarkMode={() => updateState({ isDarkMode: !isDarkMode })}
      />

      {showConversationInfo && (
        <ConversationInfo
          selectedContact={state.selectedContact}
          onClose={() => updateState({ showConversationInfo: false })}
        />
      )}

      {showChatMenu && (
        <ChatMenu
          onConversationInfo={() =>
            updateState({
              showConversationInfo: true,
              showChatMenu: false,
            })
          }
          onClose={() => updateState({ showChatMenu: false })}
        />
      )}

      {showMobileMenu && (
        <MobileMenu
          isDarkMode={isDarkMode}
          onConversationInfo={() =>
            updateState({
              showConversationInfo: true,
              showMobileMenu: false,
            })
          }
          onToggleDarkMode={() => updateState({ isDarkMode: !isDarkMode })}
          onSettings={() =>
            updateState({
              showSettings: true,
              showMobileMenu: false,
            })
          }
          onClose={() => updateState({ showMobileMenu: false })}
        />
      )}

      <ContactsSidebar
        contacts={users}
        selectedContact={state.selectedContact}
        isMobileView={isMobileView}
        showChat={showChat}
        hoveredContact={state.hoveredContact}
        onContactSelect={handleContactSelect}
        onHoverContact={(id) => updateState({ hoveredContact: id })}
        onSettingsToggle={() => updateState({ showSettings: !showSettings })}
        onMobileMenuToggle={() =>
          updateState({ showMobileMenu: !showMobileMenu })
        }
      />

      <ChatArea
        state={state}
        messagesEndRef={messagesEndRef}
        inputRef={inputRef}
        isMobileView={isMobileView}
        showChat={showChat}
        onBackToContacts={handleBackToContacts}
        onChatMenuToggle={() => updateState({ showChatMenu: !showChatMenu })}
        onSendMessage={handleSendMessage}
        onNewMessageChange={(message) => updateState({ newMessage: message })}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onToggleMobileOptions={() =>
          updateState({
            showMobileOptions: !state.showMobileOptions,
          })
        }
        onShowEmojiPicker={() => updateState({ showEmojiPicker: true })}
        formatRecordingTime={formatRecordingTime}
        formatTime={formatTime}
      />

      {showEmojiPicker && (
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          onClose={() => updateState({ showEmojiPicker: false })}
        />
      )}
    </div>
  );
}
