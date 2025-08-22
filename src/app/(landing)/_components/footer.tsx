"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function AppFooter() {
  return (
    <footer className="w-full bg-background border-t pt-10 pb-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4 text-sm">
        {/* Brand */}
        <div className="space-y-2">
          <Link href="/" className="text-lg font-semibold">
            RedDeck
          </Link>
          <p className="text-muted-foreground max-w-xs">
            Browse multiple subreddits side by side with AI-powered summaries
            and smarter workflows.
          </p>
        </div>

        {/* Product */}
        <div className="space-y-1">
          <p className="font-medium mb-1 text-foreground">Product</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link href="/changelog" className="hover:underline">
                Changelog
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:underline">
                Documentation
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-1">
          <p className="font-medium mb-1 text-foreground">Company</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-1">
          <p className="font-medium mb-1 text-foreground">Connect</p>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:otterrcodes@gmail.com">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs gap-3 text-muted-foreground px-1">
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span>
            © {new Date().getFullYear()} RedDeck. All rights reserved.
          </span>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
