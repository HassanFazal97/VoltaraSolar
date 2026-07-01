"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { AuroraLayer } from "./aurora-layer";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <AuroraLayer
          variant="demo"
          showRadialGradient={showRadialGradient}
          className="absolute inset-0"
        />
        {children}
      </div>
    </main>
  );
};
