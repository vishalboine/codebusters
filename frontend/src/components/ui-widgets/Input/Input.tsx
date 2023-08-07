import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Tooltip } from 'devextreme-react/tooltip';
import { RiInformationLine } from 'react-icons/ri';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'primary' | 'secondary';
  inputSize?: 'small' | 'medium' | 'large';
  required?: boolean;
  optional?: boolean;
  showLabel?: boolean;
  label?: string;
  tooltipTitle?: any;
  showIcon?: boolean;
  onIconClick?: any;
  isVisiblePassword?: boolean;
  showNote?: boolean;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  inputSize = 'medium',
  required = false,
  optional = false,
  showLabel = true,
  label = '',
  tooltipTitle = '',
  showIcon = false,
  showNote = false,
  onIconClick,
  isVisiblePassword,
  id,
  ...rest
}) => {
  const inputClassName = `${styles.input} ${styles[variant]} ${styles[inputSize]}`;

  return (
    <div className={styles.inputContainer}>
     <div className="inputTop">
        {showLabel && (
            <label>
              {label} {optional && <span>(optional)</span>} {required && <span>*</span>}
            </label>
          )}
        {showNote && (
          <RiInformationLine id={id} />
          )
        }
        <Tooltip
              target={`#${id}`}
              showEvent="dxhoverstart"
              hideEvent="dxhoverend"
              contentRender={tooltipTitle}
              position="left"
          />
     </div>
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
