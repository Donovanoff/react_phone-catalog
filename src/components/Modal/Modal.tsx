import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const Modal: React.FC<Props> = ({ message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <p className={styles.title}>{message}</p>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
