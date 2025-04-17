import { Card } from "@/components/ui/card";

export default function TypingIndicator() {
  return (
    <Card className="inline-flex items-center px-4 py-3 max-w-fit bg-white border-hydrous-100 rounded-2xl rounded-tl-sm shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-hydrous-300 animate-water-wave" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-hydrous-400 animate-water-wave" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-hydrous-500 animate-water-wave" style={{ animationDelay: "300ms" }}></div>
        </div>
        <span className="text-sm text-hydrous-700 font-medium">El ingeniero está analizando tu consulta...</span>
      </div>
    </Card>
  );
}
