import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = "full" 
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  };

  return (
    <div className={cn(
      "w-full mx-auto px-3 sm:px-4 lg:px-6",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 }
}: {
  children: ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}) {
  const gridCols = {
    sm: `grid-cols-${cols.sm || 1}`,
    md: `md:grid-cols-${cols.md || 2}`,
    lg: `lg:grid-cols-${cols.lg || 3}`,
    xl: `xl:grid-cols-${cols.xl || 4}`
  };

  return (
    <div className={cn(
      "grid gap-3 sm:gap-4 lg:gap-6",
      gridCols.sm,
      gridCols.md,
      gridCols.lg,
      gridCols.xl,
      className
    )}>
      {children}
    </div>
  );
}

export function ResponsiveCard({ 
  children, 
  className 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "bg-card rounded-lg border shadow-sm p-3 sm:p-4 lg:p-6",
      className
    )}>
      {children}
    </div>
  );
}

export function ResponsiveTable({ 
  children, 
  className 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6",
      className
    )}>
      <div className="inline-block min-w-full align-middle">
        {children}
      </div>
    </div>
  );
}
