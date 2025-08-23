"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import Header from "./_components/header";
import ResizableSubredditSection from "./_components/ResizableSubredditSection";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [subreddits, setSubreddits] = useState<any[]>([]); // lift state up

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="border border-border/50 bg-background backdrop-blur-sm shadow-2xl">
        <div className="flex flex-col h-screen w-full overflow-hidden">
          <div className="px-4 md:px-8 max-w-6xl w-full mx-auto">
            <Header
              pageName="App"
              onAddSubredditClick={() => setIsSheetOpen(true)}
            />
            <Separator />
          </div>

          <main className="flex flex-1 overflow-y-auto px-4 md:px-8 max-w-6xl w-full mx-auto py-3 md:py-6">
            {children}
          </main>
        </div>
      </SidebarInset>

      {/* Right sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="!max-w-none w-[600px] sm:w-[800px] md:w-[1000px] p-6 overflow-hidden"
        >
          <div className="h-full flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Your Subreddits</h2>
            <div className="flex-1 min-h-0 rounded-xl bg-card border p-6 shadow-md">
              <ResizableSubredditSection
                subreddits={subreddits}
                setSubreddits={setSubreddits}
                onClose={() => setIsSheetOpen(false)}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Pull handle when closed & has subreddits */}
      {subreddits.length > 0 && !isSheetOpen && (
        <button
          onClick={() => setIsSheetOpen(true)}
          className="fixed top-1/2 right-0 -translate-y-1/2 bg-background border border-l-0 px-2 py-1 rounded-l-lg shadow z-50 text-xs font-medium"
        >
          Pull
        </button>
      )}
    </SidebarProvider>
  );
}
