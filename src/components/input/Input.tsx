import { useState, type InputHTMLAttributes, forwardRef } from "react"
import { InformationCircleIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { cn } from "../../lib/utils.js"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  optional?: boolean
  helpText?: string
  error?: string
  showPasswordToggle?: boolean
  hideDefaultIcons?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      optional = false,
      helpText,
      error,
      className,
      showPasswordToggle = false,
      hideDefaultIcons = true,
      type = "text",
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type

    const isEmail = type === "email"

    return (
      <div className="w-full max-w-[400px]">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-700">{label}</span>
              <InformationCircleIcon className="h-4 w-4 text-gray-500" />
            </div>
            {optional && <span className="text-gray-400">Optional</span>}
          </div>
        )}

        <div className="relative">
          <div
            className={cn(
              "flex items-center border rounded-lg overflow-hidden",
              "h-[40px] px-4",
              "transition-colors duration-200",
              "border-gray-200 bg-white",
              isFocused && "border-purple-500",
              error && "border-red-500 ring-1 ring-red-500",
              disabled && "bg-gray-100 opacity-60",
              className,
            )}
          >
            {isEmail && (
              <EnvelopeIcon
                className={cn("h-5 w-5 mr-2", error ? "text-red-500" : "text-gray-400", disabled && "text-gray-300")}
              />
            )}

            <input
              ref={ref}
              type={inputType}
              disabled={disabled}
              className={cn(
                "w-full h-full outline-none bg-transparent",
                "placeholder:text-gray-400",
                disabled && "cursor-not-allowed text-gray-400",
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none disabled:pointer-events-none"
                disabled={disabled}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            )}
            {!showPasswordToggle && !hideDefaultIcons && type !== "password" && (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        {(helpText || error) && (
          <div className={cn("text-sm mt-1", error ? "text-red-500" : "text-gray-500")}>
            {error || helpText}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input }
