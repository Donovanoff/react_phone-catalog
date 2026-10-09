import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { arrowRightImg, homeImg } from '../../utils/imageStore';

type Props = {
  category: 'phones' | 'tablets' | 'accessories' | 'favourites';
};

const breadcrumbs = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favourites: 'Favourites',
};

export const Breadcrumbs: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles.address}>
      <Link to="/" className={styles.homeLink}>
        <img src={homeImg} alt="home" className={styles.homeImg} />
      </Link>
      <img src={arrowRightImg} alt="right" className={styles.arrow} />
      <span className={styles.breadcrumbText}>{breadcrumbs[category]}</span>
    </div>
  );
};
