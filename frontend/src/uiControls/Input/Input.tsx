import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'primary' | 'secondary';
  inputSize?: 'small' | 'medium' | 'large';
  required?: boolean;
  optional?: boolean;
  showLabel?: boolean;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  inputSize = 'medium',
  required = false,
  optional = false,
  showLabel = true,
  label = '',
  ...rest
}) => {
  const inputClassName = `${styles.input} ${styles[variant]} ${styles[inputSize]}`;

  return (
    <div className='inputContainer'>
      {showLabel && (
        <label>
          {label} {optional && <span>(optional)</span>} {required && <span>*</span>}
        </label>
      )}
      <div>
        <input className={inputClassName} {...rest} />
      </div>
    </div>
  );
};

export default Input;
