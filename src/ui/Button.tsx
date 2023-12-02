import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib";
import { Loading } from "@/resources";

const buttonVariants = cva(
  "opacity-100 focus:opacity-100 hover:drop-shadow-sm px-3 py-2 text-sm font-semibold border-transparent border-2 rounded",
  {
    variants: {
      variant: {
        primary: "text-white bg-blue-900  border-blue-900  text-white",
        primaryOutline: "bg-transparent border-blue-900  text-blue-900",
        primaryGhost: "bg-transparent hover:bg-blue-400  text-blue-900",
        primaryLink:
          "bg-transparent  underline-offset-4 hover:underline text-blue-900",

        secondary: "text-white bg-indigo-600  border-indigo-600  text-white",
        secondaryOutline: "bg-transparent border-indigo-600  text-indigo-600",
        secondaryGhost: "bg-transparent hover:bg-indigo-100  text-indigo-600",
        secondaryLink:
          "bg-transparent underline-offset-4 hover:underline  text-indigo-600",

        success: "text-white bg-green-600  border-green-600  text-white",
        successOutline: "bg-transparent border-green-600  text-green-600",
        successGhost: "bg-transparent hover:bg-green-100  text-green-600",
        successLink:
          "bg-transparent underline-offset-4 hover:underline  text-green-600",

        info: "text-white bg-blue-600  border-blue-600  text-white",
        infoOutline: "bg-transparent border-blue-600  text-blue-600",
        infoGhost: "bg-transparent hover:bg-blue-100  text-blue-600",
        infoLink:
          "bg-transparent underline-offset-4 hover:underline  text-blue-600",

        warning: "text-white bg-yellow-500 border-yellow-500  text-white",
        warningOutline: "bg-transparent border-yellow-500  text-yellow-500",
        warningGhost: "bg-transparent hover:bg-yellow-100  text-yellow-500",
        warningLink:
          "bg-transparent underline-offset-4 hover:underline  text-yellow-500",

        danger: "text-white bg-red-600 border-red-600  text-white",
        dangerOutline: "bg-transparent border-red-600  text-red-600",
        dangerGhost: "bg-transparent hover:bg-red-100  text-red-600",
        dangerLink:
          "bg-transparent underline-offset-4 hover:underline  text-red-600",
      },
      size: {
        sm: "text-xs py-1 px-2",
        md: "text-sm py-2 px-4",
        lg: "text-base py-3 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant,
              size,
              className,
            })
          )}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,

            className,
          })
        )}
        ref={ref}
        {...props}
      >
        <div role="status " className=" flex justify-center items-center">
          {loading && (
            <Loading className="w-5 h-5 mr-2 text-gray-200 animate-spin   fill-blue-900" />
          )}
          {children}
        </div>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
