import { Link } from 'react-router-dom';
import { Product } from '../../utils/types';
import { ButtonFavourite } from '../ButtonFavourite';
import { ButtonPrimary } from '../ButtonPrimary';
import styles from './ProductCard.module.scss';
import cn from 'classnames';
import { useAppContext } from '../../context/AppContext';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const { name, image, price, fullPrice, screen, capacity, ram } = product;
  const { addToCart, removeFromCart, toggleFavorite, favourites, cart } =
    useAppContext();

  const isAddedToCart = cart?.some(
    item => (item?.id || item?.itemId) === (product?.id || product?.itemId),
  );

  const toggleCart = () => {
    if (isAddedToCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgBlock}>
        <img src={image} alt={name} className={styles.img} />
      </div>

      <Link to="#" className={styles.title}>
        {name}
      </Link>

      <div className={styles.prices}>
        <p className={styles.price}>${price}</p>
        {showDiscount && (
          <p className={cn(styles.price, styles.fullPrice)}>${fullPrice}</p>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.detailsLine}>
          <div className={styles.detailTitle}>Screen</div>
          <div className={styles.detailText}>{screen}</div>
        </div>
        <div className={styles.detailsLine}>
          <div className={styles.detailTitle}>
            {product.category === 'accessories' ? 'Size' : 'Capacity'}
          </div>
          <div className={styles.detailText}>{capacity}</div>
        </div>
        <div className={styles.detailsLine}>
          <div className={styles.detailTitle}>
            {product.category === 'accessories' ? 'Color' : 'RAM'}
          </div>
          <div className={styles.detailText}>
            {product.category === 'accessories' ? product.color : ram}
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <ButtonPrimary
          isSelected={isAddedToCart}
          text={isAddedToCart ? 'Added' : 'Add to cart'}
          onClick={() => toggleCart()}
        />
        <ButtonFavourite
          isSelected={favourites?.some(
            item =>
              (item?.id || item?.itemId) === (product?.id || product?.itemId),
          )}
          onClick={() => toggleFavorite(product)}
        />
      </div>
    </div>
  );
};
