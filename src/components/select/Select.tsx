import * as React from "react"
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { cn } from "../../lib/utils.js"

export interface SelectOption {
    value: string
    label: string
}

interface CustomSelectProps {
    label?: string
    options: SelectOption[]
    placeholder?: string
    helpText?: string
    optional?: boolean
    disabled?: boolean
    error?: string
    value?: string | string[]
    onChange?: (value: string | string[]) => void
    multiple?: boolean
    className?: string
}

export function Select({
    label = "Label",
    options,
    placeholder = "Select",
    helpText = "This is a help text.",
    optional = true,
    disabled = false,
    error,
    value,
    onChange,
    multiple = false,
    className,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("") // New Search State
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
        multiple ? (Array.isArray(value) ? value : []) : value ? [value as string] : []
    )
    const selectRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (multiple) {
            setSelectedValues(Array.isArray(value) ? value : [])
        } else {
            setSelectedValues(value ? [value as string] : [])
        }
    }, [value, multiple])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setIsFocused(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSelect = (optionValue: string) => {
        let newValues: string[]

        if (multiple) {
            if (selectedValues.includes(optionValue)) {
                newValues = selectedValues.filter((v) => v !== optionValue)
            } else {
                if (selectedValues.length >= 4) return
                newValues = [...selectedValues, optionValue]
            }
        } else {
            newValues = [optionValue]
            setIsOpen(false)
        }

        setSelectedValues(newValues)
        onChange?.(multiple ? newValues : newValues[0] || "")
    }

    const handleRemoveValue = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation()
        const newValues = selectedValues.filter((v) => v !== optionValue)
        setSelectedValues(newValues)
        onChange?.(multiple ? newValues : newValues[0] || "")
    }

    const handleClearAll = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedValues([])
        onChange?.(multiple ? [] : "")
    }

    const getSelectedLabels = () => {
        return selectedValues.map((value) => options.find((option) => option.value === value)?.label || value)
    }

    const getFilteredOptions = () => {
        return options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    const getBorderColor = () => {
        if (disabled) return "border-slate-200"
        if (error) return "border-red-500"
        if (isFocused) return "border-purple-500"
        if (isHovered) return "border-purple-500"
        return "border-slate-200"
    }

    const getMaxSelectionsMessage = () => {
        if (multiple && selectedValues.length >= 4) {
            return "Maximum of 4 selections allowed"
        }
        return null
    }

    const renderBadge = (label: string, index: number) => (
        <div
            key={index}
            className="inline-flex items-center h-[24px] rounded bg-slate-100 hover:bg-slate-200 transition-colors duration-150 text-sm text-slate-900 py-[2px] pl-[10px] pr-[2px]"
        >
            <span className="truncate">{label}</span>
            <button
                type="button"
                onClick={(e) => handleRemoveValue(selectedValues[index], e)}
                className="ml-[8px] p-[2px] inline-flex items-center justify-center hover:bg-slate-300/50 rounded transition-colors duration-150"
            >
                <XMarkIcon className="h-3 w-3" />
                <span className="sr-only">Remove {label}</span>
            </button>
        </div>
    )

    return (
        <div className={cn("w-full max-w-[400px]", className)}>
            {label && (
                <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-1">
                        <label className="text-sm font-medium">{label}</label>
                        <InformationCircleIcon className="h-4 w-4 text-slate-400" />
                    </div>
                    {optional && <span className="text-sm text-slate-400">Optional</span>}
                </div>
            )}

            <div
                ref={selectRef}
                onClick={(e) => {
                    if ((e.target as HTMLInputElement).tagName !== "INPUT") {
                        setIsOpen(!isOpen)
                    }
                }}
                className={cn(
                    "relative min-h-[32px] rounded-[4px] border px-3 py-2 flex items-center justify-between gap-1",
                    getBorderColor(),
                    disabled ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-white cursor-pointer"
                )}
            >
                <div className="flex flex-wrap items-center gap-1 overflow-hidden">
                    {multiple && selectedValues.length > 0 ? (
                        getSelectedLabels().map((label, index) => renderBadge(label, index))
                    ) : (
                        <span className="text-sm truncate text-slate-400">
                            {selectedValues.length > 0 ? getSelectedLabels()[0] : placeholder}
                        </span>
                    )}
                </div>

                {isOpen && !disabled && (
                    <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto">
                        <input
                            type="text"
                            placeholder="Search Pokémon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}  // Prevents dropdown from closing
                            className="w-full px-3 py-2 border-b border-slate-200"
                        />
                        {getFilteredOptions().map((option) => (
                            <div
                                key={option.value}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {multiple && getMaxSelectionsMessage() && (
                <p className="mt-1 text-sm text-amber-500">{getMaxSelectionsMessage()}</p>
            )}
        </div>
    )
}
