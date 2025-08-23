"use client";

import { Input } from "@/components/ui/input";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { LucideIcon, Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavMainProps {
  chats: { id: string; title: string }[];
  onNewChat: () => void;
  platform: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavMain({ chats, onNewChat, platform }: NavMainProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const showPlatformLinks = false;

  const filteredChats = chats.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Chats section */}
      <SidebarGroup>
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <SidebarMenu className="space-y-2">
          {/* New Chat button */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex items-center gap-2 font-medium bg-primary/10 hover:bg-primary/20 text-primary"
              onClick={onNewChat}
            >
              <Plus className="h-4 w-4" />
              New Chat
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Searchbar */}
          <SidebarMenuItem>
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </SidebarMenuItem>

          {/* Chats list */}
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => {
              const isActive = pathname === `/c/${chat.id}`;
              return (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    asChild
                    className={clsx(
                      "truncate",
                      isActive
                        ? "bg-muted font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link href={`/c/${chat.id}`}>{chat.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          ) : (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              No chats yet
            </p>
          )}
        </SidebarMenu>
      </SidebarGroup>

      {/* platform links */}
      {showPlatformLinks && (
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {platform.map((item) => {
              const isActive =
                item.url === "/dashboard"
                  ? pathname === item.url
                  : pathname.startsWith(item.url);

              return (
                <Collapsible key={item.title} asChild defaultOpen={isActive}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a
                        href={item.url}
                        className={clsx(
                          "group relative flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 font-semibold text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        )}
                      >
                        {/* Left glowing border pill */}
                        {isActive && (
                          <span className="absolute left-0 top-1 bottom-1 w-[4px] rounded-r-md bg-primary shadow-[0_0_10px_2px_#ff622e66]" />
                        )}

                        <item.icon
                          className={clsx(
                            "w-4 h-4 transition-colors duration-200",
                            isActive
                              ? "text-primary"
                              : "group-hover:text-foreground"
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
}
