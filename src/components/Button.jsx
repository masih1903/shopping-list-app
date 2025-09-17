import React from 'react';

/**
 * Reusable Button component with consistent styling and behavior
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon: Icon,
  className = '',
  title,
  ...props
}) => {
  const baseClasses = 'button-base';
  const variantClasses = {
    primary: 'add-to-cart',
    secondary: 'cancel',
    danger: 'delete',
    edit: 'edit',
    save: 'save',
    login: 'login-button',
    logout: 'logout-button',
    submit: 'login-submit-button'
  };
  
  const sizeClasses = {
    small: 'button-small',
    medium: '',
    large: 'button-large',
    icon: 'icon-button'
  };

  const classes = [
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      title={title}
      {...props}
    >
      {Icon && <Icon color="white" />}
      {children}
    </button>
  );
};

export default Button;
