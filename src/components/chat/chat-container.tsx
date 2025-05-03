"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { apiService } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import MessageItem from "./message-item";
import ChatInput from "./chat-input";
import TypingIndicator from "./typing-indicator";
import LoadingScreen from "./loading-screen";
import { ArrowDown, RefreshCw } from "lucide-react";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [dropletMood, setDropletMood] = useState<'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'technical'>('default');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start conversation when component loads
    startConversation();

    // Listen for the custom 'newConversationStarted' event
    const handleNewConversation = (event: CustomEvent) => {
      const newConversationId = event.detail?.conversationId;
      if (newConversationId) {
        resetConversation(newConversationId);
      } else {
        startConversation();
      }
    };

    window.addEventListener('newConversationStarted', handleNewConversation as EventListener);
    return () => {
      window.removeEventListener('newConversationStarted', handleNewConversation as EventListener);
    };
  }, []);

  // Handle scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Show scroll button when not at bottom
      const isScrolledToBottom =
        container.scrollHeight - container.clientHeight <= container.scrollTop + 150;
      setShowScrollButton(!isScrolledToBottom);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isScrolledToBottom =
      container.scrollHeight - container.clientHeight <= container.scrollTop + 150;

    const lastMessage = messages[messages.length - 1];
    const isUserLastMessage = lastMessage?.role === 'user';

    if (isScrolledToBottom || isUserLastMessage || isTyping) {
      scrollToBottom("auto");
    }
  }, [messages, isTyping]);

  // Update Droplet's mood based on context
  useEffect(() => {
    if (isTyping) {
      setDropletMood('thinking');
    } else if (messages.length === 0) {
      setDropletMood('default');
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      const lastContent = messages[messages.length - 1].content.toLowerCase();

      if (lastContent.includes('perfect') ||
        lastContent.includes('excellent') ||
        lastContent.includes('great')) {
        setDropletMood('happy');
      } else if (lastContent.includes('analysis') ||
        lastContent.includes('calculating') ||
        lastContent.includes('processing')) {
        setDropletMood('processing');
      } else if (lastContent.includes('technical') ||
        lastContent.includes('parameters') ||
        lastContent.includes('engineering')) {
        setDropletMood('technical');
      } else {
        setDropletMood('explaining');
      }

      const timer = setTimeout(() => {
        setDropletMood('default');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isTyping, messages]);

  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior,
        block: "end"
      });
    }
  };

  const resetConversation = (newId?: string) => {
    setMessages([]);
    setIsTyping(false);
    setDropletMood('default');

    if (newId) {
      setConversationId(newId);
      setIsInitializing(false);

      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: "Hello, I am H₂O Allegiant AI, your engineer specialized in water treatment solutions. How can I assist you with your project today?",
        created_at: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    } else {
      setConversationId(null);
      setIsInitializing(true);
      startConversation();
    }
  };

  const startConversation = async () => {
    try {
      setIsInitializing(true);

      if (apiService.isInitializing && apiService.isInitializing()) {
        console.log("Backend initializing, waiting...")
      }

      const data = await apiService.startConversation();
      setConversationId(data.id);

      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      }

      // Artificial delay for smoother loading animation
      setTimeout(() => {
        setIsInitializing(false);

        if (!data.messages || data.messages.length === 0) {
          const welcomeMessage: Message = {
            id: `welcome-${Date.now()}`,
            role: "assistant",
            content: "Hello, I am H₂O Allegiant AI, your engineer specialized in water treatment solutions. How can I assist you with your project today?",
            created_at: new Date().toISOString(),
          };
          setMessages([welcomeMessage]);
        }
      }, 1200);

    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Connection error: Could not establish a connection to the server.");
      setIsInitializing(false);
    }
  };

  const sendMessage = async (messageText: string, file?: File) => {
    if ((!messageText.trim() && !file) || !conversationId || isTyping) return;

    // Add user message locally first
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: messageText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    scrollToBottom();

    // Visual delay before showing typing
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      let data;

      if (file) {
        data = await apiService.uploadDocument(conversationId, file, messageText);
      } else {
        data = await apiService.sendMessage(conversationId, messageText);
      }

      setIsTyping(false);

      // Handle PDF download
      if (data.action === "trigger_download" && data.download_url) {
        window.open(data.download_url, "_blank");

        const systemMessage: Message = {
          id: `system-${Date.now()}`,
          role: "assistant",
          content: "📄 **Your proposal has been generated successfully.**\n\nThe PDF document should open automatically. If you need to download it again, type \"download proposal\" or \"download pdf\".",
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, systemMessage]);
        return;
      }

      // Handle proposal download
      if (data.action === "download_proposal_pdf" && data.download_url) {
        window.open(data.download_url, "_blank");

        const assistantMessage: Message = {
          id: data.id || `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message || "Your proposal is ready! It has opened in a new tab.",
          created_at: data.created_at || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return;
      }

      // Normal assistant message
      if (data.message) {
        const assistantMessage: Message = {
          id: data.id || `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message,
          created_at: data.created_at || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I'm sorry, a communication error has occurred. Please try again or refresh the page if the problem persists.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-5xl mx-auto relative">
      {/* Enhanced Background with water effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white/80 to-white/90 opacity-80"></div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-[45rem] h-[45rem] rounded-full bg-blue-200/10
                   filter blur-3xl opacity-40"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[40rem] h-[40rem] rounded-full bg-blue-300/10
                   filter blur-3xl opacity-30"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Chat Container with glassmorphism effect */}
      <div className="flex-1 flex flex-col relative rounded-xl overflow-hidden shadow-lg border border-blue-100/50">
        {/* Header with date and session info */}
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 border-b border-blue-100/50 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 bg-blue-50/90 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            <div className="h-1 w-1 rounded-full bg-blue-300"></div>

            <div className="text-blue-700 text-xs font-medium">
              Technical Consultation
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-blue-600 flex items-center gap-1 hover:bg-blue-50"
            onClick={() => resetConversation()}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>New Conversation</span>
          </Button>
        </div>

        {/* Messages area with custom scrollbar */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent"
        >
          {/* Glass background for messages area */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

          {/* Messages content */}
          <div className="relative z-10 px-4 sm:px-6 py-6 space-y-6">
            {isInitializing ? (
              <div className="h-full flex items-center justify-center">
                <LoadingScreen />
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-6 pb-2">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <MessageItem
                        message={message}
                        isSequential={
                          index > 0 && messages[index - 1].role === message.role
                        }
                        isLast={index === messages.length - 1}
                        dropletMood={message.role === 'assistant' ? dropletMood : undefined}
                      />
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <TypingIndicator mood={dropletMood} />
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-24 right-6 z-20"
            >
              <Button
                size="icon"
                className="rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 text-white h-10 w-10"
                onClick={() => scrollToBottom()}
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="bg-white/95 backdrop-blur-lg border-t border-blue-100 py-4 px-4 sm:px-5 rounded-b-xl shadow-md z-10">
          <ChatInput
            onSendMessage={sendMessage}
            isTyping={isTyping}
            isDisabled={isInitializing || !conversationId}
          />

          <div className="mt-2 text-center flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="flex items-center text-blue-600/80">
              <span className="font-medium">H₂O Allegiant — Advanced Water Treatment Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
