import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading = false, variant = "primary", size = "md", fullWidth = false, className = "", disabled, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center border border-transparent rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
    
    const variants = {
      primary: "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-70 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:text-white",
      secondary: "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 disabled:opacity-70 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
      danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:opacity-70 dark:bg-red-700 dark:hover:bg-red-800 dark:text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };

    const widthClass = fullWidth ? "w-full flex" : "";
    const finalClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={finalClasses}
        {...props}
      >
        {loading ? "..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
