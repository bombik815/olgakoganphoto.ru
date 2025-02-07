import React from 'react';
import { motion } from 'framer-motion';


interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
    href?: string;
    icon?: React.ReactElement;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
    href,
    icon,
    variant = 'primary',
    fullWidth = false,
    ariaLabel,
}) => {
    const baseStyles = `
        ${fullWidth ? 'w-full md:max-w-[300px]' : 'w-auto'}
        ${variant === 'primary' ? 'bg-[#A65D57] hover:bg-[#8B4E49]' : 'bg-transparent'}
        text-white
        px-6
        py-4
        md:px-12
        md:py-4
        rounded-full
        uppercase
        text-sm
        tracking-wider
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3
        transform
        hover:scale-105
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
    `.trim();

    const content = (
        <>
            {icon && icon}
            <span>{children}</span>
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={baseStyles}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                aria-label={ariaLabel}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={baseStyles}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-label={ariaLabel}
        >
            {content}
        </motion.button>
    );
};

export default React.memo(Button); 