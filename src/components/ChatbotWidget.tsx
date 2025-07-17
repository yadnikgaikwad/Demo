import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBotResponse } from "@/lib/chatService";
import dayjs from "dayjs";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messageHistory, setMessageHistory] = useState<{ text: string; sender: 'user' | 'bot' | 'typing'; timestamp?: number }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Tooltip interval logic
  useEffect(() => {
    if (show) return; // Don't show tooltip if chat is open
    let tooltipTimeout: NodeJS.Timeout | null = null;
    const showAndHideTooltip = () => {
      setShowTooltip(true);
      tooltipTimeout = setTimeout(() => setShowTooltip(false), 5000);
    };
    // Show first after 15s, then every 15s
    const interval = setInterval(showAndHideTooltip, 15000);
    // Show first after 15s
    const firstTimeout = setTimeout(showAndHideTooltip, 15000);
    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
    };
  }, [show]);

  // Hide tooltip if chat is opened
  useEffect(() => {
    if (show) setShowTooltip(false);
  }, [show]);

  // Handle mount/unmount for animation
  const handleOpen = () => {
    setShow(true);
    setTimeout(() => setIsOpen(true), 10);
    setShowTooltip(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setShow(false), 220);
  };

  const defaultMessages = [
    "Hi there! 👋 I'm your AI assistant.",
    "Ask me anything about posture correction, our products, or how to get started.",
    "Need help choosing a product? I'm here to guide you!"
  ];

  // Handle sending a message
  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setInputValue("");
    setTimeout(() => {
      setMessageHistory((prev) => [...prev, { text: trimmed, sender: 'user', timestamp: Date.now() }]);
      // Add typing indicator
      setMessageHistory((prev) => [
        ...prev,
        { text: 'Bot is typing...', sender: 'typing', timestamp: Date.now() }
      ]);
      // Use chatService to get bot response
      (async () => {
        const botReply = await getBotResponse(trimmed);
        setIsBotTyping(true);
        setBotTypingText("");
        // Animate character-by-character
        let i = 0;
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = setInterval(() => {
          i++;
          setBotTypingText(botReply.slice(0, i));
          if (i >= botReply.length) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            setTimeout(() => {
              setMessageHistory((prev) => {
                // Remove the last 'typing' message if it exists
                const last = prev[prev.length - 1];
                let newHistory = prev;
                if (last && last.sender === 'typing') {
                  newHistory = prev.slice(0, -1);
                }
                return [
                  ...newHistory,
                  { text: botReply, sender: 'bot', timestamp: Date.now() }
                ];
              });
              setIsBotTyping(false);
              setBotTypingText("");
            }, 200); // Short pause after animation
          }
        }, 18); // Typing speed (ms per character)
      })();
    }, 200); // 200ms delay before showing user message
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Handle Enter key
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Scroll to bottom when messageHistory or typing changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageHistory, show, botTypingText]);

  return (
    <div className="fixed bottom-6 right-20 sm:bottom-8 sm:right-8 z-50 font-sans flex flex-col items-end p-0 chatbot-widget-container">
      {/* Chat Window */}
      {show && (
        <Card
          className={`mb-8 w-full max-w-[410px] h-[70vh] max-h-[520px] shadow-2xl bg-[#23252b] border border-[#35373e] rounded-2xl transition-all duration-200 ease-smooth
            ${isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#35373e] bg-[#23252b] rounded-t-2xl">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#6c6f78]" />
                <span className="font-semibold text-white text-base">New Message</span>
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 px-2 sm:px-6 py-4 space-y-3 overflow-y-auto bg-[#23252b] text-[#e4e6eb] text-[15px]">
              {/* Render default bot messages */}
              {defaultMessages.map((message, index) => (
                <div key={"default-" + index} className="flex">
                  <div className="bg-[#23252b] text-[#e4e6eb] p-3 rounded-2xl rounded-bl-none max-w-[85%] text-sm leading-relaxed shadow-sm border border-[#35373e]">
                    {message}
                  </div>
                </div>
              ))}
              {/* Render user and bot messages */}
              {messageHistory.map((msg, idx) => (
                <div
                  key={"user-" + idx}
                  className={
                    msg.sender === 'user'
                      ? 'flex justify-end'
                      : 'flex'
                  }
                >
                  <div
                    className={
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-[#3a3b41] to-[#23252b] text-[#e4e6eb] p-3 rounded-2xl rounded-br-md max-w-[85%] text-sm leading-relaxed shadow-sm ml-auto border border-[#35373e]'
                        : msg.sender === 'bot'
                          ? 'bg-[#23252b] text-[#e4e6eb] p-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm leading-relaxed shadow-sm border border-[#35373e]'
                          : 'bg-[#282a31] text-[#b0b3bb] italic p-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm leading-relaxed shadow-sm opacity-80 border border-[#35373e]'
                    }
                  >
                    {msg.text}
                    {msg.timestamp && (
                      <div className="text-[11px] text-[#b0b3bb] mt-1 text-right select-none">
                        {dayjs(msg.timestamp).format('HH:mm')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* Animated bot typing bubble */}
              {isBotTyping && (
                <div className="flex">
                 <div className="bg-[#23252b] text-[#e4e6eb] p-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm leading-relaxed shadow-sm border border-[#35373e]">
                   {botTypingText}
                   <span className="animate-pulse">▍</span>
                 </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input Area */}
            <div className="px-6 py-4 border-t border-[#35373e] bg-[#23252b] rounded-b-2xl">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 text-[15px] bg-[#282a31] text-[#e4e6eb] border border-[#35373e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c6f78] placeholder-[#6c6f78] transition-all"
                  style={{ fontFamily: 'inherit' }}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={!show}
                />
                <Button
                  size="icon"
                  className="bg-[#3a3b41] hover:bg-[#35373e] text-[#e4e6eb] rounded-lg w-10 h-10 flex items-center justify-center shadow-none"
                  onClick={handleSend}
                  type="button"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              {/* File upload and attachment bar (mock, for visual match) */}
              <div className="flex items-center mt-3 text-[#b0b3bb] text-xs gap-2">
                <span className="flex items-center gap-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M16.5 6.5l-9 9" stroke="#b0b3bb" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#b0b3bb" strokeWidth="1.5"/></svg> Advertising materials.pdf</span>
                <span className="ml-auto">75% uploaded</span>
              </div>
            </div>
          </div>
        </Card>
      )}
      {/* Tooltip Pop-up */}
      {showTooltip && (
        <div
          className="mb-4 mr-2 px-4 py-2 rounded-xl bg-[#282a31] text-[#e4e6eb] shadow-lg text-sm font-medium max-w-[220px] transition-all duration-300 ease-smooth animate-fade-in-up cursor-pointer"
          style={{
            transform: 'translateY(10px)',
            animation: 'fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
          onClick={() => setShowTooltip(false)}
        >
          Any question about our product, ask here
        </div>
      )}
      {/* Floating Toggle/Close Button (morphs between open and close) */}
      <Button
        onClick={show ? handleClose : handleOpen}
        className="relative bg-[#23252b] hover:bg-[#35373e] text-white rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-2xl flex items-center justify-center border border-[#35373e] transition-all duration-300"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-0 scale-90 rotate-45' : 'opacity-100 scale-100 rotate-0'}`}>
          <MessageCircle className="w-7 h-7" />
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-45'}`}>
          <X className="w-7 h-7" />
        </span>
      </Button>
      {/* Keyframes for fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .chatbot-card {
            width: 98vw !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            height: 80vh !important;
            max-height: 90vh !important;
            margin-bottom: 1.5rem !important;
          }
          .chatbot-widget-container {
            position: fixed !important;
            bottom: 1.25rem !important; /* 20px for a nice margin */
            right: 1.25rem !important;  /* 20px for a nice margin */
            left: auto !important;
            z-index: 9999 !important;
            will-change: transform;
            pointer-events: none !important;
            transform: none !important;
            width: auto !important;
            height: auto !important;
          }
          .chatbot-widget-container button {
            pointer-events: auto !important;
            width: 56px !important; /* w-14 */
            height: 56px !important; /* h-14 */
            min-width: 56px !important;
            min-height: 56px !important;
            max-width: 56px !important;
            max-height: 56px !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
};