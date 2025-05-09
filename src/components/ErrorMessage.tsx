import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0ZM9.172 14.828a4 4 0 0 1 5.656 0"
        />
      </svg>
    </div>
    <div className="text-lg font-semibold text-red-600 mb-2">Error</div>
    <div className="text-base text-gray-700 dark:text-gray-200 mb-4 max-w-xs text-center">
      {message}
    </div>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[color:var(--color-primary)] text-white font-semibold shadow-md hover:bg-[color:var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-offset-2 transition-all duration-150 active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582M20 20v-5h-.581M19.418 15A7.974 7.974 0 0 1 12 20a8 8 0 1 1 7.418-5"
        />
      </svg>
      Retry
    </button>
  </div>
);

export default ErrorMessage;
