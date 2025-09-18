// src/app/chat/page.tsx
import ChatContainer from "@/components/chat/chat-container";
import Header from "@/components/layout/header";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        <ChatContainer />
      </main>
      <footer className="border-t border-blue-100 py-4 bg-white/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto px-4 text-center text-blue-600/80 text-sm">
          © {new Date().getFullYear()} H₂O Allegiant — Advanced Water Treatment Solutions
        </div>
      </footer>
    </div>
  );
}
