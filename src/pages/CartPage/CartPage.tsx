import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { CartItem } from '../../components/CartItem';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { Modal } from '../../components/Modal';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const quantity = cart.reduce((acc, i) => acc + i.quantity, 0);

  const handleConfirmClear = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className={styles.content}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          {'< Back'}
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cart.length > 0 ? (
          <div className={styles.main}>
            <div className={styles.itemsList}>
              {cart.map(item => (
                <div key={item.id} className={styles.item}>
                  <CartItem item={item} />
                </div>
              ))}
            </div>

            <div className={styles.checkout}>
              <span className={styles.price}>${totalPrice}</span>
              <span className={styles.quantity}>
                Total for {quantity} items
              </span>
              <div className={styles.line}></div>
              <ButtonPrimary
                text={'Checkout'}
                height={'48px'}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        ) : (
          <span className={styles.empty}>Your cart is empty</span>
        )}

        {isModalOpen && (
          <Modal
            // eslint-disable-next-line max-len
            message="Checkout is not implemented yet. Do you want to clear the Cart?"
            onConfirm={handleConfirmClear}
            onCancel={handleCancelModal}
          />
        )}
      </div>
    </div>
  );
};
