"use client";

import { Card } from "@/components/ui/card";

export default function TypingIndicator() {
  return (
    <Card className="inline-flex items-center px-4 py-3 max-w-fit bg-white border-hydrous-100 rounded-2xl rounded-tl-sm shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 bg-gradient-to-br from-hydrous-100 to-hydrous-200 rounded-full flex items-center justify-center">
          {/* Animación de ondas de agua dentro del indicador */}
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-hydrous-300/40 rounded-t-full animate-water-wave"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-hydrous-400/30 rounded-t-full animate-water-wave animation-delay-150"></div>
          </div>
          <WaterIcon className="h-4 w-4 text-hydrous-600 relative z-10" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-hydrous-700 font-medium">Analizando tu consulta</span>
          <div className="flex space-x-1 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-hydrous-300 animate-water-wave" style={{ animationDelay: "0ms" }}></div>
            <div className="h-1.5 w-1.5 rounded-full bg-hydrous-400 animate-water-wave" style={{ animationDelay: "150ms" }}></div>
            <div className="h-1.5 w-1.5 rounded-full bg-hydrous-500 animate-water-wave" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function WaterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
