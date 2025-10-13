import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-lg font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        /* Glassmorphic variants */
        glassLight:
          "rounded-2xl bg-white/85 text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-black/10 backdrop-blur-md hover:bg-white/70",
        glassPrimary:
          "rounded-2xl text-white border border-white/10 backdrop-blur-md bg-gradient-to-b hover:from-[hsl(var(--primary)/0.39)] hover:to-[hsl(var(--primary)/0.32)] shadow-[0_8px_28px_rgba(16,185,129,0.25)] from-[hsl(var(--primary)/0.48)] to-[hsl(var(--primary)/0.56)]",
        glassNeutral:
          "rounded-2xl text-white/90 border border-white/10 backdrop-blur-md bg-gradient-to-b from-white/10 to-white/5 shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:from-white/12 hover:to-white/7",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-sm px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
