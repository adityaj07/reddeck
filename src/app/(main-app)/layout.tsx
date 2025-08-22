import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./_components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="border border-border/50 bg-background backdrop-blur-sm shadow-2xl">
        <div className="flex flex-col h-screen w-full overflow-hidden">
          {/* Shared padding container */}
          <div className="px-4 md:px-8 max-w-6xl w-full mx-auto">
            <Header pageName={"App"} />
            <Separator />
          </div>

          {/* <Separator /> */}

          <main className="flex flex-1 overflow-y-auto px-4 md:px-8 max-w-6xl w-full mx-auto py-3 md:py-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
