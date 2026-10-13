import styles from './ArrowButton.module.scss';

type Props = {
  direction?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
  content?: string;
};

export const ArrowButton: React.FC<Props> = ({
  direction,
  disabled,
  onClick,
  content,
}) => {
  const buttonContent =
    content ??
    (direction === 'left' ? '<' : direction === 'right' ? '>' : null);

  return (
    <div>
      <button className={styles.button} disabled={disabled} onClick={onClick}>
        {buttonContent}
      </button>
    </div>
  );
};
