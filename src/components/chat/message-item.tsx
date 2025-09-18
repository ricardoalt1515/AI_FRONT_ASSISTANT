"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import DropletAvatar from "./droplet-avatar";
import { Copy, Check } from "lucide-react";

interface MessageItemProps {
  message: Message;
  isSequential?: boolean;
  isLast?: boolean;
  dropletMood?: 'default' | 'thinking' | 'happy' | 'explaining' | 'processing' | 'technical';
}

function MessageItem({
  message,
  isSequential = false,
  isLast = false,
  dropletMood = 'default'
}: MessageItemProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const isUser = message.role === "user";

  // Obtener datos del usuario
  useEffect(() => {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    }
  }, []);

  // Format time
  const formattedTime = (() => {
    try {
      const date = new Date(message.created_at);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "";
    }
  })();

  // Copy to clipboard - memoizado para evitar recreación en cada render
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [message.content]);

  // Detect if message contains code
  const containsCode = message.content.includes("```");

  // Detect if message contains technical parameters
  const containsParameters = message.content.toLowerCase().includes("bod:") ||
    message.content.toLowerCase().includes("cod:") ||
    message.content.toLowerCase().includes("tss:");

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start",
        isSequential ? "mt-2" : "mt-6"
      )}
    >
      {/* Avatar for AI - only show if not sequential */}
      {!isUser && !isSequential && (
        <motion.div
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 500 }}
          style={{ willChange: "transform, opacity" }}
        >
          <DropletAvatar mood={dropletMood} />
        </motion.div>
      )}

      {/* Spacer for sequential AI messages */}
      {!isUser && isSequential && <div className="w-12 flex-shrink-0" />}

      {/* Message content */}
      <div
        className={cn(
          "relative flex flex-col gap-1",
          isUser ? "items-end" : "items-start",
          isUser ? "max-w-[75%] md:max-w-[70%]" : "max-w-[80%] md:max-w-[75%]"
        )}
      >
        {/* Message bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ willChange: "transform, opacity" }}
          className={cn(
            "px-5 py-3 transition-all duration-300 relative",
            isUser
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-sm shadow-md"
              : "bg-white/95 backdrop-blur-sm text-gray-800 rounded-2xl rounded-tl-sm shadow-md border border-blue-100"
          )}
        >
          {/* User message content */}
          {isUser ? (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          ) : (
            /* AI message content with Markdown */
            <div className="text-sm markdown-content relative z-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                skipHtml
                components={{
                  // Tables with professional design
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4 border border-blue-100 rounded-lg shadow-sm bg-white">
                      <table className="w-full border-collapse text-sm" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50 sticky top-0" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border-b border-blue-200 px-4 py-2 text-left font-medium text-blue-800" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border-b border-blue-100/70 px-4 py-2.5 text-gray-700" {...props} />
                  ),

                  // Code blocks with better design
                  pre: ({ node, ...props }) => (
                    <pre className="bg-gray-50 border border-gray-100 p-4 rounded-md overflow-x-auto text-xs my-3 text-gray-800 shadow-inner font-mono relative group">
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(
                              ((props.children as any)?.props?.children || '').toString()
                            );
                          }}
                          className="h-7 w-7 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div {...props} />
                    </pre>
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');

                    return match ? (
                      <div className="font-mono rounded overflow-hidden bg-gray-900 text-gray-100">
                        <div className="bg-gray-800 text-xs text-gray-200 px-3 py-1.5 font-sans flex items-center justify-between">
                          <span>{match[1]}</span>
                        </div>
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </div>
                    ) : (
                      <code className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  },

                  // Headings with better styling
                  h1: ({ node, ...props }) => (
                    <h1 className="text-xl font-semibold text-blue-800 mt-4 mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-lg font-semibold text-blue-700 mt-4 mb-2" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-base font-semibold text-blue-600 mt-3 mb-1.5" {...props} />
                  ),

                  // Paragraphs with technical data detection
                  p: ({ node, children, ...props }) => {
                    // Check for water treatment parameters
                    if (typeof children === 'string') {
                      // Detection of BOD parameter
                      if (children.match(/BOD:?\s*=?\s*(\d+)/) ||
                        children.match(/COD:?\s*=?\s*(\d+)/) ||
                        children.match(/TSS:?\s*=?\s*(\d+)/)) {

                        // Extract parameters and values
                        const parameters = [];

                        const bodMatch = children.match(/BOD:?\s*=?\s*(\d+)/);
                        if (bodMatch) parameters.push({ name: 'BOD', value: parseInt(bodMatch[1]), max: 1000 });

                        const codMatch = children.match(/COD:?\s*=?\s*(\d+)/);
                        if (codMatch) parameters.push({ name: 'COD', value: parseInt(codMatch[1]), max: 1500 });

                        const tssMatch = children.match(/TSS:?\s*=?\s*(\d+)/);
                        if (tssMatch) parameters.push({ name: 'TSS', value: parseInt(tssMatch[1]), max: 600 });

                        if (parameters.length > 0) {
                          return (
                            <div className="mb-3 p-3 bg-blue-50/70 rounded-lg border border-blue-100 shadow-sm">
                              <p className="mb-2 text-sm leading-relaxed text-blue-900">{children}</p>

                              {/* Parameter visualizations */}
                              <div className="space-y-2.5 mt-3">
                                {parameters.map((param, index) => {
                                  const percentage = Math.min(100, Math.max(0, (param.value / param.max) * 100));
                                  let colorClass = 'from-green-300 to-green-500';

                                  if (percentage > 60 && percentage <= 85) {
                                    colorClass = 'from-yellow-300 to-yellow-500';
                                  } else if (percentage > 85) {
                                    colorClass = 'from-red-300 to-red-500';
                                  }

                                  return (
                                    <div key={index}>
                                      <div className="flex justify-between text-xs font-medium mb-1">
                                        <span className="text-gray-600">{param.name}</span>
                                        <span className="text-blue-800">{param.value} mg/L</span>
                                      </div>
                                      <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${percentage}%` }}
                                          transition={{ duration: 1, delay: index * 0.3 }}
                                          className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                                        ></motion.div>
                                      </div>
                                      <div className="flex justify-between text-xs mt-0.5 text-gray-500">
                                        <span>Min</span>
                                        <span>{percentage < 30 ? "Low" : percentage < 70 ? "Moderate" : "High"}</span>
                                        <span>Max</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                      }

                      // Detection of ROI or savings
                      if (children.match(/saving.*?\$[\d,]+/) ||
                        children.match(/ROI.*?(\d+).*?months/) ||
                        children.match(/recover.*?(\d+).*?months/)) {

                        let savings = null;
                        const savingsMatch = children.match(/saving.*?\$([\d,]+)/);
                        if (savingsMatch) {
                          savings = savingsMatch[1].replace(',', '');
                        }

                        let roi = null;
                        const roiMatch = children.match(/ROI.*?(\d+).*?months/) ||
                          children.match(/recover.*?(\d+).*?months/);
                        if (roiMatch) {
                          roi = parseInt(roiMatch[1]);
                        }

                        if (savings || roi) {
                          return (
                            <div className="mb-3 p-3 bg-blue-50/70 rounded-lg border border-blue-100 shadow-sm">
                              <p className="mb-2 text-sm leading-relaxed text-blue-900">{children}</p>

                              {savings && (
                                <div className="flex items-end gap-3 mt-3">
                                  <motion.div
                                    className="text-blue-700 text-xl font-bold"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    ${parseInt(savings).toLocaleString()}
                                  </motion.div>
                                  <div className="text-blue-600 text-sm">
                                    estimated savings
                                  </div>
                                  <div className="ml-auto flex items-center text-xs text-blue-700">
                                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                      <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                    <span className="font-medium">Positive return</span>
                                  </div>
                                </div>
                              )}

                              {roi && (
                                <div className="mt-3">
                                  <div className="text-xs text-blue-700 font-medium mb-1">
                                    Return on investment period
                                  </div>
                                  <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(100, Math.max(0, (roi / 36) * 100))}%` }}
                                      transition={{ duration: 1 }}
                                      className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full"
                                    ></motion.div>
                                  </div>
                                  <div className="flex justify-between text-xs mt-0.5 text-gray-500">
                                    <span className="font-medium text-blue-700">{roi} months</span>
                                    <span>36 months</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      }
                    }

                    return <p className="mb-2 leading-relaxed" {...props}>{children}</p>;
                  },

                  // Enhanced links
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),

                  // Enhanced lists
                  ul: ({ node, ...props }) => (
                    <ul className="pl-6 my-2 space-y-1" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="pl-6 my-2 space-y-1 list-decimal" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="pl-1 my-0.5 relative" {...props} />
                  ),

                  // Blockquotes with style
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-300 pl-4 py-1 my-3 italic text-gray-600 bg-blue-50/50 rounded-r-md" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Decorative elements for AI messages */}
          {!isUser && (
            <div className="absolute -bottom-1 -left-1 w-full h-8 bg-gradient-to-t from-blue-50/20 to-transparent opacity-30 pointer-events-none"></div>
          )}
        </motion.div>

        {/* Timestamp and actions - only for non-sequential or last message */}
        {(!isSequential || isLast) && (
          <div className={cn(
            "flex items-center text-xs text-gray-500 gap-2 px-1",
            isUser ? "justify-end" : "justify-start"
          )}>
            {/* Time */}
            {formattedTime && (
              <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{formattedTime}</span>
              </div>
            )}

            {/* User company indicator */}
            {isUser && userData?.company_name && (
              <div className="flex items-center gap-1 text-blue-600">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7h-9M14 17H5M15 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                </svg>
                <span className="text-xs">{userData.company_name}</span>
              </div>
            )}

            {/* Copy button for AI messages */}
            {!isUser && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-6 w-6 rounded-full transition-all duration-300",
                    isCopied
                      ? "bg-blue-100 text-blue-700"
                      : "opacity-70 hover:opacity-100 hover:bg-blue-100"
                  )}
                  onClick={copyToClipboard}
                >
                  <span className="sr-only">Copy message</span>
                  {isCopied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* User avatar with improved styling */}
      {isUser && !isSequential && (
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 
                       rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          {/* Status indicator */}
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </motion.div>
      )}

      {/* Spacer for sequential user messages */}
      {isUser && isSequential && <div className="w-10 flex-shrink-0" />}
    </div>
  );
}

// Exportar como componente memoizado para prevenir re-renderizados innecesarios
export default memo(MessageItem);
