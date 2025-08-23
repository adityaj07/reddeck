import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { type FC } from "react";
interface HeaderProps {
  companyName?: string;
  pageName?: string;
  onAddSubredditClick: () => void;
}

const Header: FC<HeaderProps> = ({
  companyName = "App",
  pageName,
  onAddSubredditClick,
}) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-2 md:px-4">
      {/* Left side: Sidebar + Breadcrumb */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">{companyName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right side: Mode toggle + Add Subreddit */}
      <div className="flex items-center gap-2">
        <div
          className="mx-auto max-w-sm relative h-full bg-primary 
            [box-shadow:0_0_10px_-1px_#00000050] border border-[#d94e1f] rounded-2xl overflow-hidden after:absolute after:inset-0 after:pointer-events-none after:content-[''] after:rounded-2xl after:border-t-[3px] after:border-r-[3px] after:border-t-[#ff8757] after:border-r-[#c9441a] after:hover:border-t-[#ff9d76] after:hover:border-r-transparent after:hover:[box-shadow:inset_0_4px_12px_#00000060] transition-all duration-200"
        >
          <Button variant="outline" size="sm" onClick={onAddSubredditClick}>
            <Plus className="w-4 h-4 mr-1" />
            Add Subreddit
          </Button>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
