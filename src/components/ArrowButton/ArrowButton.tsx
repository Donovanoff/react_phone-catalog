import styles from './ArrowButton.module.scss';

type Props = {
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
};

export const ArrowButton: React.FC<Props> = ({
  direction,
  disabled,
  onClick,
}) => {
  return (
    <div>
      <button className={styles.button} disabled={disabled} onClick={onClick}>
        {direction === 'left' ? '<' : '>'}
      </button>
    </div>
  );
};
