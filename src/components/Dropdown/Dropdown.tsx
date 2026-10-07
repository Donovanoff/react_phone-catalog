import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { arrowTopImg } from '../../utils/imageStore';

export type DropdownOption = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.dropdown}>
        <button
          type="button"
          className={classNames(styles.trigger, {
            [styles.isOpen]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.triggerText}>
            {selectedOption?.label || 'Select'}
          </span>
          <img
            src={arrowTopImg}
            alt="arrow"
            className={classNames(styles.arrow, {
              [styles.arrowUp]: isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div className={styles.menu}>
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                className={classNames(styles.menuItem, {
                  [styles.menuItemActive]: option.value === value,
                })}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
