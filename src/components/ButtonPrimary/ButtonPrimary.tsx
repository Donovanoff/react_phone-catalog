import styles from './ButtonPrimary.module.scss';
import cn from 'classnames';

type Props = {
  text: string;
  onClick?: () => void;
  size?: string;
  height?: string;
  isSelected?: boolean;
};

export const ButtonPrimary: React.FC<Props> = ({
  text,
  onClick,
  size,
  height,
  isSelected,
}) => {
  return (
    <button
      className={cn(styles.button, { [styles.selected]: isSelected })}
      style={{ width: size, height: height }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
