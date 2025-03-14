import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/utils.js"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "primary" | "text"
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = "outline", 
    size = "base", 
    startIcon, 
    endIcon, 
    disabled, 
    ...props 
  }, ref) => {

    const variants = {
      outline:
        "border-none border-slate-200 bg-white hover:bg-slate-100 active:bg-slate-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200",
      primary:
        "bg-purple-600 text-white hover:bg-purple-500 active:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-100 disabled:text-purple-300",
      text: "hover:bg-slate-100 active:bg-slate-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:text-slate-400",
    }

    const sizes = {
      xs: "h-5 text-xs",
      sm: "h-6 text-sm",
      base: "h-8 text-sm",
      lg: "h-10 text-base",
      xl: "h-12 text-base",
    }

    const paddingSizes = {
      xs: "px-2 py-0.5",
      sm: "px-2.5 py-1",
      base: "px-3 py-1.5",
      lg: "px-4 py-2",
      xl: "px-5 py-2.5",
    }

    const iconSizes = {
      xs: "h-3 w-3",
      sm: "h-3.5 w-3.5",
      base: "h-4 w-4",
      lg: "h-5 w-5",
      xl: "h-5 w-5",
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none",
          variants[variant],
          sizes[size],
          paddingSizes[size],
          className,
        )}
        {...props}
      >
        {startIcon && (
          <span className={cn(
            iconSizes[size],
            variant === "primary" ? "text-white" : "text-purple-600",
            disabled && variant === "primary" && "text-purple-300",
            disabled && variant !== "primary" && "text-slate-400"
          )}>
            {startIcon}
          </span>
        )}

        <span>{children}</span>
        {endIcon && (
          <span className={cn(
            iconSizes[size],
            variant === "primary" ? "text-white" : "text-purple-600",
            disabled && variant === "primary" && "text-purple-300",
            disabled && variant !== "primary" && "text-slate-400"
          )}>
            {endIcon}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
