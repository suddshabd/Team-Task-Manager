import React from 'react';

const buttonVariants = {
    primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
    secondary: 'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10',
    danger: 'bg-rose-500 text-white hover:bg-rose-400',
};

export const FormInput = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
    as = 'input',
    children,
    rows = 4,
}) => {
    const inputClasses = [
        'w-full rounded-2xl border bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500',
        'transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30',
        error ? 'border-rose-400/70' : 'border-white/10',
    ].join(' ');

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-slate-200">
                {label}
            </label>
            {as === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className={`${inputClasses} resize-y`}
                />
            ) : as === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={inputClasses}
                >
                    {children}
                </select>
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClasses}
                />
            )}
            {error && <span className="text-sm text-rose-300">{error}</span>}
        </div>
    );
};

export const Button = ({
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    type = 'button',
    className = '',
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={[
            'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold',
            'transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
            buttonVariants[variant] || buttonVariants.primary,
            className,
        ].join(' ')}
    >
        {children}
    </button>
);

export const Card = ({ children, title, className = '' }) => (
    <div
        className={[
            'rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur',
            className,
        ].join(' ')}
    >
        {title && <h2 className="mb-5 text-xl font-semibold text-white">{title}</h2>}
        {children}
    </div>
);
