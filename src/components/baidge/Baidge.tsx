import type { HTMLAttributes } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { cn } from "../../lib/utils.js"

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink" | "gray" | "orange"
  withDot?: boolean
  withClose?: boolean
  onClose?: () => void
  radius?: "default" | "md" | "full" 
}

const Badge = ({
  children,
  className,
  variant = "default",
  withDot = false,
  withClose = false,
  onClose, 
  radius = "full", 
  ...props
}: BadgeProps) => {

  const variants = {
    default: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    indigo: "bg-indigo-100 text-indigo-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    gray: "bg-gray-800 text-white",
    orange: "bg-orange-100 text-orange-800",
  }

  const dotColors = {
    default: "bg-gray-400",
    red: "bg-red-400",
    yellow: "bg-yellow-400",
    green: "bg-green-400",
    blue: "bg-blue-400",
    indigo: "bg-indigo-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
    gray: "bg-gray-400",
    orange: "bg-orange-400",
  }
  const radiusVariants = {
    default: "rounded-md",
    md: "rounded-lg",
    full: "rounded-full",
  }
  const shouldShowCloseButton = withClose && !withDot && onClose

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-[2px] text-xs font-medium",radiusVariants[radius],
        variants[variant],
        radiusVariants[radius], 
        className,
      )}
      {...props}
    >
      {withDot && <div className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])} />}
      {children}
      {shouldShowCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-black/10",
            variant === "gray" && "hover:bg-white/20",
          )}
        >
          <XMarkIcon className="h-3 w-3" />
          <span className="sr-only">Remove badge</span>
        </button>
      )}
    </div>
  )
}

export { Badge }


