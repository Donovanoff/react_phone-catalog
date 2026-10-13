import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { closeImg } from '../../utils/imageStore';
import { CartProduct } from '../../utils/types';
import { ArrowButton } from '../ArrowButton';
import styles from './CartItem.module.scss';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useAppContext();

  const quantity = cart.find(i => i.id === item.id)?.quantity || 1;

  return (
    <div className={styles.item}>
      <div className={styles.leftside}>
        <button className={styles.cross} onClick={() => removeFromCart(item)}>
          <img src={closeImg} alt="Remove item" />
        </button>
        <Link
          to={`/${item.category}/${item.itemId}`}
          className={styles.imgLink}
        >
          <img src={item.image} alt={item.name} className={styles.img} />
        </Link>
        <Link to={`/${item.category}/${item.itemId}`} className={styles.title}>
          {item.name}
        </Link>
      </div>

      <div className={styles.rightside}>
        <div className={styles.quantity}>
          <ArrowButton
            content="-"
            disabled={quantity <= 1}
            onClick={() => decreaseQuantity(item)}
          />
          <div className={styles.text}>{quantity}</div>
          <ArrowButton content="+" onClick={() => increaseQuantity(item)} />
        </div>
        <div className={styles.price}>${item.price * quantity}</div>
      </div>
    </div>
  );
};
