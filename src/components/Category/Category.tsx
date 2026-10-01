import { Link } from 'react-router-dom';
import styles from './Category.module.scss';

type Props = {
  title: string;
  quantity: number;
  image: string;
  linkTo: string;
};

export const Category: React.FC<Props> = ({
  title,
  quantity,
  image,
  linkTo,
}) => {
  return (
    <Link to={linkTo} className={styles.categoryCard}>
      <div className={styles.imgBlock}>
        <img src={image} alt={title} className={styles.img} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.quantity}>{quantity} models</div>
    </Link>
  );
};
