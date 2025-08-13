"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  key: string;
  label: string;
  href: (projectId: string) => string;
}

const navItems: NavItem[] = [
  { key: "overview", label: "Overview", href: (id) => `/projects/${id}` },
  { key: "discovery", label: "Discovery", href: (id) => `/projects/${id}/discovery` },
  { key: "proposal", label: "Proposal", href: (id) => `/projects/${id}/proposal` },
  { key: "engineering", label: "Engineering", href: (id) => `/projects/${id}/engineering` },
  { key: "procurement", label: "Procurement", href: (id) => `/projects/${id}/procurement` },
  { key: "chat", label: "Chat", href: (id) => `/projects/${id}/chat` },
];

export function ProjectSubnav() {
  const { projectId } = useParams<{ projectId: string }>();
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Project navigation">
          {navItems.map((item) => {
            const href = item.href(projectId);
            const isActive = pathname === href || (item.key !== "overview" && pathname.startsWith(href));
            return (
              <li key={item.key}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
