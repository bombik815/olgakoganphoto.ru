import React from 'react';
import { motion } from 'framer-motion';

// Определение типов пропсов для компонента Button
interface ButtonProps {
    children: React.ReactNode;        // Содержимое кнопки
    onClick?: () => void;            // Обработчик клика
    type?: 'button' | 'submit' | 'reset';  // Тип кнопки
    className?: string;              // Дополнительные CSS классы
    disabled?: boolean;              // Состояние блокировки кнопки
    href?: string;                   // URL для ссылки (если кнопка является ссылкой)
    icon?: React.ReactElement;       // Иконка для кнопки
    variant?: 'primary' | 'secondary'; // Вариант стиля кнопки
    fullWidth?: boolean;             // Флаг для растягивания кнопки на всю ширину
    ariaLabel?: string;              // ARIA метка для доступности
}

// Компонент Button с поддержкой анимации и различных вариантов отображения
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
    // Базовые стили кнопки с использованием Tailwind CSS
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

    // Компоновка содержимого кнопки (иконка + текст)
    const content = (
        <>
            {icon && icon}
            <span>{children}</span>
        </>
    );

    // Рендер кнопки как ссылки, если указан href
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

    // Рендер обычной кнопки
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

// Мемоизация компонента для оптимизации производительности
export default React.memo(Button); 