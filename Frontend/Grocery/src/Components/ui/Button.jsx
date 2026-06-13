import React from 'react';
import { cn } from '../../Utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-warm hover:shadow-warm-lg',
    secondary: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700',
    outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30',
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
    teal: 'bg-accent-600 text-white hover:bg-accent-700',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg font-bold',
    icon: 'p-2.5',
  };

  return (
    <button
      ref={ref}
      disabled={loading || props.disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
