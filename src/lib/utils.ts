import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS class names with conditional logic.
 * Combines `clsx` for conditional logic and `twMerge` to handle class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
