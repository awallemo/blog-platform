import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', wrapperClassName = '', ...props }, ref) => {
    return (
      <div className={`space-y-1 ${wrapperClassName}`}>
        {label && (
          <label 
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            block w-full rounded-md shadow-sm
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            disabled:bg-gray-50 disabled:text-gray-500
            sm:text-sm
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id || props.name}-error` : undefined}
          {...props}
        />
        {error && (
          <p 
            className="text-sm text-red-600" 
            id={`${props.id || props.name}-error`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;