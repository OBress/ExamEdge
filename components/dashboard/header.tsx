import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  backHref?: string;
  children?: React.ReactNode;
}

export default function DashboardHeader({
  heading,
  text,
  backHref,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
      <div className="space-y-0.5">
        {backHref && (
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 h-8 gap-1 text-muted-foreground"
            asChild
          >
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
