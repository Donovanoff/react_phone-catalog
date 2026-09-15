import styles from './ButtonPrimary.module.scss';
import cn from 'classnames';

type Props = {
  text: string;
  onClick?: () => void;
  size?: string;
  isSelected?: boolean;
};

export const ButtonPrimary: React.FC<Props> = ({
  text,
  onClick,
  size,
  isSelected,
}) => {
  return (
    <button
      className={cn(styles.button, { [styles.selected]: isSelected })}
      style={{ width: size }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
