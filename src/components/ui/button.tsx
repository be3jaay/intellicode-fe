'use client';

import React, { useState } from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps, Loader, Group } from '@mantine/core';
import { forwardRef } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
    extends Omit<MantineButtonProps, 'variant' | 'size'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    rounded?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const getVariantStyles = (variant: ButtonVariant, isHovered: boolean, isActive: boolean) => {
    const baseStyles = {
        border: 'none',
        position: 'relative' as const,
        overflow: 'hidden' as const,
    };

    switch (variant) {
        case 'primary':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #8bc232 0%, #a3d742 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, #a3d742 0%, #8bc232 100%)'
                        : 'linear-gradient(135deg, #bdf052 0%, #a3d742 100%)',
                color: '#222222',
                boxShadow: isActive
                    ? '0 2px 4px rgba(189, 240, 82, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)'
                    : isHovered
                        ? '0 8px 16px rgba(189, 240, 82, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(189, 240, 82, 0.3), 0 2px 4px rgba(0, 0, 0, 0.15)',
                transform: isActive ? 'translateY(0px) scale(0.98)' : isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0px) scale(1)',
            };
        case 'secondary':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #9585e6 0%, #8573d9 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, #a694f2 0%, #9585e6 100%)'
                        : 'linear-gradient(135deg, #b3a1ff 0%, #a694f2 100%)',
                color: '#222222',
                boxShadow: isActive
                    ? '0 2px 4px rgba(179, 161, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.4)'
                    : isHovered
                        ? '0 8px 16px rgba(179, 161, 255, 0.35), 0 4px 8px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(179, 161, 255, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)',
                transform: isActive ? 'translateY(0px) scale(0.98)' : isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0px) scale(1)',
            };
        case 'outline':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #bdf052 0%, #a3d742 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, rgba(189, 240, 82, 0.1) 0%, rgba(189, 240, 82, 0.05) 100%)'
                        : 'transparent',
                color: isActive || isHovered ? (isActive ? '#222222' : '#8bc232') : '#8bc232',
                border: '2px solid #bdf052',
                boxShadow: isActive
                    ? '0 2px 4px rgba(189, 240, 82, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
                    : isHovered
                        ? '0 4px 12px rgba(189, 240, 82, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)'
                        : '0 0 0 rgba(0, 0, 0, 0)',
                transform: isActive ? 'translateY(0px) scale(0.98)' : isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0px) scale(1)',
            };
        case 'ghost':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                        : 'transparent',
                color: isActive || isHovered ? '#212529' : '#495057',
                boxShadow: isActive || isHovered ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                transform: isActive ? 'translateY(0px)' : isHovered ? 'translateY(-1px)' : 'translateY(0px)',
            };
        case 'success':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #37b24d 0%, #2d8f3f 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, #40c057 0%, #37b24d 100%)'
                        : 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
                color: 'white',
                boxShadow: isActive
                    ? '0 2px 4px rgba(81, 207, 102, 0.4), 0 1px 2px rgba(0, 0, 0, 0.4)'
                    : isHovered
                        ? '0 6px 12px rgba(81, 207, 102, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)'
                        : '0 4px 8px rgba(81, 207, 102, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
                transform: isActive ? 'translateY(0px)' : isHovered ? 'translateY(-2px)' : 'translateY(0px)',
            };
        case 'warning':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #ffb700 0%, #e6a200 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, #ffc947 0%, #ffb700 100%)'
                        : 'linear-gradient(135deg, #ffd43b 0%, #ffc947 100%)',
                color: '#212529',
                boxShadow: isActive
                    ? '0 2px 4px rgba(255, 212, 59, 0.4), 0 1px 2px rgba(0, 0, 0, 0.4)'
                    : isHovered
                        ? '0 6px 12px rgba(255, 212, 59, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)'
                        : '0 4px 8px rgba(255, 212, 59, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
                transform: isActive ? 'translateY(0px)' : isHovered ? 'translateY(-2px)' : 'translateY(0px)',
            };
        case 'danger':
            return {
                ...baseStyles,
                background: isActive
                    ? 'linear-gradient(135deg, #ff3838 0%, #e62e2e 100%)'
                    : isHovered
                        ? 'linear-gradient(135deg, #ff5252 0%, #ff3838 100%)'
                        : 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                color: 'white',
                boxShadow: isActive
                    ? '0 2px 4px rgba(255, 107, 107, 0.4), 0 1px 2px rgba(0, 0, 0, 0.4)'
                    : isHovered
                        ? '0 6px 12px rgba(255, 107, 107, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)'
                        : '0 4px 8px rgba(255, 107, 107, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
                transform: isActive ? 'translateY(0px)' : isHovered ? 'translateY(-2px)' : 'translateY(0px)',
            };
        default:
            return baseStyles;
    }
};

const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
        case 'xs':
            return {
                height: '32px',
                padding: '0 16px',
                fontSize: '12px',
                borderRadius: '8px',
            };
        case 'sm':
            return {
                height: '36px',
                padding: '0 20px',
                fontSize: '14px',
                borderRadius: '10px',
            };
        case 'md':
            return {
                height: '44px',
                padding: '0 24px',
                fontSize: '16px',
                borderRadius: '12px',
            };
        case 'lg':
            return {
                height: '52px',
                padding: '0 28px',
                fontSize: '18px',
                borderRadius: '14px',
            };
        case 'xl':
            return {
                height: '60px',
                padding: '0 32px',
                fontSize: '20px',
                borderRadius: '16px',
            };
        default:
            return {};
    }
};

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            variant = 'primary',
            size = 'md',
            loading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            rounded = false,
            disabled,
            children,
            style,
            onClick,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState<boolean>(false);
        const [isActive, setIsActive] = useState<boolean>(false);

        const variantStyles = getVariantStyles(variant, isHovered, isActive);
        const sizeStyles = getSizeStyles(size);

        const buttonStyles = {
            ...variantStyles,
            ...sizeStyles,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 600,
            letterSpacing: '0.025em',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            width: fullWidth ? '100%' : 'auto',
            borderRadius: rounded ? '50px' : sizeStyles.borderRadius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            ...style,
        } as React.CSSProperties;

        const content = (
            <Group
                gap="xs"
                style={{
                    flexWrap: 'nowrap',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {loading && <Loader size="sm" color="currentColor" />}
                {!loading && leftIcon && leftIcon}
                {children}
                {!loading && rightIcon && rightIcon}
            </Group>
        );

        return (
            <MantineButton
                onClick={onClick}
                ref={ref}
                variant="unstyled"
                disabled={disabled || loading}
                style={buttonStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsActive(false);
                }}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                suppressHydrationWarning={true}
                {...props}
            >
                {content}
            </MantineButton>
        );
    }
);

Button.displayName = 'Button';
