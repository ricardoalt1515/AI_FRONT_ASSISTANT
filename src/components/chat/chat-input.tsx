"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, SendIcon, ImageIcon, FileTextIcon, FileIcon as LucideFileIcon } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  isTyping: boolean;
  isDisabled?: boolean;
}

export default function ChatInput({ onSendMessage, isTyping, isDisabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-adjust height
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height - important to shrink when text is deleted
      textareaRef.current.style.height = 'auto';

      // Calculate new height limited to 5 lines
      const newHeight = Math.min(textareaRef.current.scrollHeight, 140);
      textareaRef.current.style.height = `${newHeight}px`;

      // Calculate approximate rows for visual effects
      const lineHeight = 24; // approximately
      setRows(Math.min(Math.ceil(newHeight / lineHeight), 5));
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if ((!message.trim() && !file) || isTyping || isDisabled) return;

    onSendMessage(message, file || undefined);
    setMessage("");
    setFile(null);

    // Reset height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validate file size (max 5MB)
      if (files[0].size > 5 * 1024 * 1024) {
        alert("File is too large. Maximum size is 5MB.");
        return;
      }

      setFile(files[0]);

      // Focus textarea after selecting file
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
    }
  };

  // Format file size
  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(1) + ' MB';
  }

  // Get file icon based on type
  function getFileIcon(fileName: string) {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (['pdf', 'doc', 'docx'].includes(extension)) {
      return <FileTextIcon className="h-4 w-4" />;
    } else {
      return <LucideFileIcon className="h-4 w-4" />;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* File attachment display */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 5, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3 p-2.5 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                className="h-9 w-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                {getFileIcon(file.name)}
              </motion.div>
              <div>
                <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] inline-block">{file.name}</span>
                <span className="text-xs text-gray-500 ml-2">{formatFileSize(file.size)}</span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFile(null)}
              className="h-7 w-7 rounded-full p-0 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span className="sr-only">Delete file</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input field with water effects */}
      <div
        className={cn(
          "relative flex items-end gap-2 rounded-xl overflow-hidden transition-all duration-200",
          isFocused
            ? "border-2 border-blue-400 shadow-md shadow-blue-300/20"
            : "border border-blue-200 hover:border-blue-300 shadow-sm",
          "bg-white/95 backdrop-blur-sm p-1"
        )}
      >
        {/* Water ripple effect when focused */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Water background with technical pattern */}
              <motion.div
                className="absolute bottom-0 w-full h-1/3 bg-blue-50/60 rounded-t-full"
                animate={{
                  y: [0, -3, 0],
                  scaleY: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
              />

              {/* Technical pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(56, 189, 248, 0.05) 8px, rgba(56, 189, 248, 0.05) 9px),
                    repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(56, 189, 248, 0.05) 8px, rgba(56, 189, 248, 0.05) 9px)
                  `,
                  backgroundSize: '12px 12px'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attach file button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isTyping || isDisabled}
            className={cn(
              "h-10 w-10 rounded-lg z-10 transition-colors",
              "text-gray-500 hover:text-blue-700 hover:bg-blue-50"
            )}
          >
            <span className="sr-only">Attach file</span>
            <PaperclipIcon className="h-5 w-5" />
          </Button>
        </motion.div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png"
        />

        {/* Expandable textarea */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isTyping || isDisabled}
          placeholder={isDisabled
            ? "Initializing H₂O Allegiant AI..."
            : "What water treatment solution do you need? Describe your project..."}
          className={cn(
            "min-h-[44px] max-h-[140px] resize-none border-0 p-3 z-10",
            "focus-visible:ring-0 focus-visible:ring-offset-0 flex-1",
            "text-gray-700 transition-all rounded-lg bg-transparent",
            isDisabled && "text-gray-400"
          )}
          rows={rows}
        />

        {/* Send button with animation */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            size="icon"
            disabled={(!message.trim() && !file) || isTyping || isDisabled}
            className={cn(
              "h-10 w-10 rounded-lg shrink-0 transition-all duration-300 z-10",
              (!message.trim() && !file) || isTyping || isDisabled
                ? "bg-gray-100 text-gray-400"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md hover:from-blue-600 hover:to-blue-700"
            )}
          >
            <span className="sr-only">Send message</span>
            <SendIcon className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Helper text */}
      <div className="mt-2 text-xs text-gray-500 flex justify-between px-2">
        <span className="flex items-center gap-1">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="opacity-80">Shift+Enter for new line</span>
        </span>

        {/* Character counter */}
        <AnimatePresence>
          {message.length > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "transition-all duration-300",
                message.length > 500 ? "text-blue-600 font-medium" : "text-blue-500"
              )}
            >
              {message.length} characters
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
