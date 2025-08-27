"use client";

import { useConvexAuth, useQuery } from "convex/react";
import {
  LayoutDashboard,
  LogIn,
  LogsIcon,
  Settings2,
  User2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Separator } from "./ui/separator";

const navItems = [
  {
    title: "New chat",
    url: "/app/new",
    icon: LayoutDashboard,
  },
  {
    title: "Changelogs",
    url: "/dashboard/changelogs",
    icon: LogsIcon,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: User2,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(
    api.users.queries.getCurrentUser,
    isAuthenticated ? {} : "skip"
  );
  const router = useRouter();

  return (
    <Sidebar variant="inset" {...props} className="bg-accent">
      {/* ---- Header ---- */}
      <SidebarHeader className="bg-accent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href="/"
                className="flex flex-row justify-center items-center gap-2"
              >
                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                  <img
                    src="/logo-bg-removed.png"
                    alt="RedDeck Logo"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight dark:text-white">
                  <span className="truncate font-medium">RedDeck</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Separator className="bg-accent-foreground/20 h-2 my-2" />
        </SidebarMenu>
      </SidebarHeader>

      {/* ---- Content ---- */}
      <SidebarContent className="bg-accent">
        {isLoading ? (
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : isAuthenticated ? (
          <NavMain
            chats={[
              { id: "1", title: "My first chat" },
              { id: "2", title: "Another chat" },
            ]}
            onNewChat={() => console.log("new chat")}
            platform={navItems}
          />
        ) : (
          <div className="p-4 text-muted-foreground text-sm">
            Sign in to view your chat history.
          </div>
        )}
      </SidebarContent>

      {/* ---- Footer ---- */}
      <SidebarFooter className="bg-accent">
        {isLoading ? (
          <div className="px-4 py-2">
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        ) : isAuthenticated ? (
          <NavUser
            user={{
              name: user?.email.split("@")[0].replace(/\./g, " ") ?? "user",
              email: user?.email ?? "user@example.com",
              avatar: `https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(
                user?.email ?? "user"
              )}`,
            }}
          />
        ) : (
          <div className="px-4 py-2">
            <Button
              variant="default"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={() => router.push("/auth")}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
