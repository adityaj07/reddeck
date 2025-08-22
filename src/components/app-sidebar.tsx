"use client";

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogsIcon,
  Settings2,
  User2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "./ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="bg-accent">
      <SidebarHeader className="bg-accent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href="#"
                className="flex flex-row justify-center items-center gap-2"
              >
                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/logo-bg-removed.png" />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight dark:text-white ">
                  <span className="truncate font-medium">RedDeck</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Separator className="bg-accent-foreground/20 h-2 my-2" />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-accent">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="bg-accent">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
