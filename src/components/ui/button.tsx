import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircleIcon } from "lucide-react";
import * as React from "react";

const buttonVariants = cva(
  `focus-visible:border-ring focus-visible:ring-ring/50
  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
  aria-invalid:border-destructive inline-flex shrink-0 items-center
  justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap
  transition-all outline-none hover:cursor-pointer focus-visible:ring-[3px]
  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
  [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: `bg-destructive hover:bg-destructive/90
        focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40
        dark:bg-destructive/60 text-white`,
        outline: `bg-background hover:bg-accent hover:text-accent-foreground
        dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border
        shadow-xs`,
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  onClick,
  asChild = false,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "onClick"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  const [busy, setBusy] = React.useState(false);
  const handleClick = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      setBusy(true);
      try {
        await onClick?.(e);
        setBusy(false);
      } catch (err) {
        setBusy(false);
        throw err;
      }
    },
    [onClick],
  );

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      disabled={busy || loading || disabled}
      {...props}
    >
      {!asChild && (busy || loading) && (
        <LoaderCircleIcon className="size-4 animate-spin" />
      )}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
