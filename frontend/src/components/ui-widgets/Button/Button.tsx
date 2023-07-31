import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  title?: any;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = ({ variant = 'primary', title = 'Button', size = 'medium', disabled = false, ...rest }: ButtonProps) => {
  const buttonClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''}`;
  return (
    <button className={buttonClassName} {...rest}>
      {title}
    </button>
  )
}

export default Button