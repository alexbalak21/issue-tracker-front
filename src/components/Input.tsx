import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  setValue?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, setValue, className = "", ...props }, ref) => {
    const baseClasses = "appearance-none block w-full px-4 py-3 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    const errorClass = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";
    const finalClasses = `${baseClasses} ${errorClass} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={finalClasses}
          {...props}
          onChange={e => {
            props.onChange?.(e);
            setValue?.(e.target.value);
          }}
        />
        {error && <p className="mt-1 text-sm text-red-600 ms-3">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
