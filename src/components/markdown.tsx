"use client";

import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

// shadcn/ui
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, CheckCircle2, Flame, Info } from "lucide-react";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-6 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-5 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="leading-7 mb-4">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,

    /**
     * Blockquotes -> Either a styled callout (if it matches pattern)
     * or a normal blockquote.
     */
    blockquote: ({ children }) => {
      const raw = String(children).trim();

      // Match callout syntax: > [!NOTE] something...
      const calloutMatch = raw.match(/^\[!(\w+)\]\s*([\s\S]*)/);

      if (calloutMatch) {
        const type = calloutMatch[1].toUpperCase();
        const body = calloutMatch[2] || "";

        switch (type) {
          case "NOTE":
            return (
              <Alert className="my-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>{body}</AlertDescription>
              </Alert>
            );
          case "WARNING":
            return (
              <Alert variant="destructive" className="my-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>{body}</AlertDescription>
              </Alert>
            );
          case "TIP":
            return (
              <Alert className="my-4 border-green-500 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>{body}</AlertDescription>
              </Alert>
            );
          case "DANGER":
            return (
              <Alert variant="destructive" className="my-4">
                <Flame className="h-4 w-4" />
                <AlertTitle>Danger</AlertTitle>
                <AlertDescription>{body}</AlertDescription>
              </Alert>
            );
          default:
            return (
              <Alert className="my-4">
                <Info className="h-4 w-4" />
                <AlertTitle>{type}</AlertTitle>
                <AlertDescription>{body}</AlertDescription>
              </Alert>
            );
        }
      }

      // Fallback: plain blockquote
      return (
        <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
          {children}
        </blockquote>
      );
    },

    /**
     * Code blocks (syntax highlighting) + inline code
     */
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark as { [key: string]: React.CSSProperties }}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-4"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },

    /**
     * Links: secure external, internal uses Next/link
     */
    a: ({ href, children }) => {
      const isInternal =
        href?.startsWith(process.env.NEXT_PUBLIC_BASE_URL || "") ||
        href?.startsWith("/");
      if (isInternal) {
        return (
          <Link href={href || "#"} className="text-primary hover:underline">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },

    /**
     * Images: wrapped in Card for consistent style
     */
    img: ({ src, alt }) => (
      <Card className="overflow-hidden my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || ""}
          alt={alt || ""}
          loading="lazy"
          className="rounded-lg max-w-full h-auto"
        />
      </Card>
    ),

    /**
     * Tables -> shadcn/ui table
     */
    table: ({ children }) => (
      <div className="my-6">
        <Table>{children}</Table>
      </div>
    ),
    thead: ({ children }) => <TableHeader>{children}</TableHeader>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => <TableHead>{children}</TableHead>,
    td: ({ children }) => <TableCell>{children}</TableCell>,
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  );
}
