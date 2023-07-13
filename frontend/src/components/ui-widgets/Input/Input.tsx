import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'primary' | 'secondary';
  inputSize?: 'small' | 'medium' | 'large';
  required?: boolean;
  optional?: boolean;
  showLabel?: boolean;
  label?: string;
  showIcon?: boolean;
  onIconClick?: any;
  isVisiblePassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  inputSize = 'medium',
  required = false,
  optional = false,
  showLabel = true,
  label = '',
  showIcon = false,
  onIconClick,
  isVisiblePassword = false,
  ...rest
}) => {
  const inputClassName = `${styles.input} ${styles[variant]} ${styles[inputSize]}`;

  return (
    <div className={styles.inputContainer}>
      {showLabel && (
        <label>
          {label} {optional && <span>(optional)</span>} {required && <span>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input className={inputClassName} {...rest} />
        {
            showIcon && (
                <button className={styles.iconButton} onClick={onIconClick}>
                    {
                        isVisiblePassword ? <AiFillEyeInvisible /> : <AiFillEye />
                    }
                </button>
            )
        }
      </div>
    </div>
  );
};

export default Input;
