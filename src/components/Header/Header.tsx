import { Link, NavLink } from 'react-router-dom';
import {
  closeImg,
  heartImg,
  logoImg,
  menuImg,
  shopBagImg,
} from '../../utils/imageStore';
import styles from './Header.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Sidebar } from '../Sidebar';
import { useAppContext } from '../../context/AppContext';

export const Header: React.FC = () => {
  const [hasMenu, setHasMenu] = useState(false);

  const { cart, favourites } = useAppContext();

  useEffect(() => {
    if (hasMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [hasMenu]);

  return (
    <div className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__container}>
          <Link
            to="/"
            className={styles.header__logo}
            onClick={() => setHasMenu(false)}
          >
            <img
              src={logoImg}
              alt="logo"
              className={styles['header__logo--img']}
            />
          </Link>
          <nav className={cn(styles.nav, styles.header__nav)}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(styles.nav__link, {
                  [styles['nav__link--active']]: isActive,
                })
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={({ isActive }) =>
                cn(styles.nav__link, {
                  [styles['nav__link--active']]: isActive,
                })
              }
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                cn(styles.nav__link, {
                  [styles['nav__link--active']]: isActive,
                })
              }
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                cn(styles.nav__link, {
                  [styles['nav__link--active']]: isActive,
                })
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>
        <div className={styles.header__action}>
          <a
            className={cn(styles.header__icon, styles['header__icon--mobile'])}
            onClick={() => setHasMenu(!hasMenu)}
          >
            <img
              src={hasMenu ? closeImg : menuImg}
              alt="menu"
              className={styles['header__icon--img']}
            />
          </a>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              cn(styles.header__icon, styles['header__icon--tablet'], {
                [styles['header__icon--active']]: isActive,
              })
            }
          >
            <div className={styles['header__icon-container']}>
              <img
                src={heartImg}
                alt="favourite"
                className={styles['header__icon--img']}
              />
              {favourites.length > 0 && (
                <p className={styles['header__icon-number']}>
                  {favourites.length}
                </p>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.header__icon, styles['header__icon--tablet'], {
                [styles['header__icon--active']]: isActive,
              })
            }
          >
            <div className={styles['header__icon-container']}>
              <img
                src={shopBagImg}
                alt="shopBag"
                className={styles['header__icon--img']}
              />
              {cart.length > 0 && (
                <p className={styles['header__icon-number']}>{cart.length}</p>
              )}
            </div>
          </NavLink>
        </div>
      </div>

      <Sidebar hasMenu={hasMenu} closeMenu={() => setHasMenu(false)} />
    </div>
  );
};
