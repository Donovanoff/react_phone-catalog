import { heartFilledImg, heartImg } from '../../utils/imageStore';
import cn from 'classnames';
import styles from './ButtonFavourite.module.scss';

type Props = {
  onClick?: () => void;
  isSelected?: boolean;
  size?: string;
};

export const ButtonFavourite: React.FC<Props> = ({
  onClick,
  isSelected,
  size,
}) => {
  return (
    <button
      className={cn(styles.button, { [styles.selected]: isSelected })}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <img
        className={styles.img}
        src={isSelected ? heartFilledImg : heartImg}
        alt="favourite"
      />
    </button>
  );
};
