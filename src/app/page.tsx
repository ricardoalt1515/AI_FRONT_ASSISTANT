import ChatContainer from "@/components/chat/chat-container";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container">
        <ChatContainer />
      </main>
    </div>
  );
}
