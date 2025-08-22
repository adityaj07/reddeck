"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
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
  );
}
