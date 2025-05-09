import { forwardRef, type InputHTMLAttributes, useMemo } from 'react';
import type { FieldError } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | string;
  className?: string;
}

const baseClass =
  'block w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 transition-colors';
const normalClass = 'border-gray-300 focus:border-primary focus:ring-primary';
const errorClass = 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;
    const hasError = Boolean(error);
    const inputClass = useMemo(
      () => [baseClass, hasError ? errorClass : normalClass, className].join(' '),
      [hasError, className],
    );

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={inputClass}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {hasError && (
          <span id={`${inputId}-error`} className="mt-1 block text-xs text-red-600" role="alert">
            {typeof error === 'string' ? error : error?.message}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
