import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { heartImg, shopBagImg } from '../../utils/imageStore';

type Props = {
  hasMenu: boolean;
  closeMenu: () => void;
};

export const Sidebar: React.FC<Props> = ({ hasMenu, closeMenu }) => {
  return (
    <div
      className={cn(styles.sidebar, { [styles['sidebar--active']]: hasMenu })}
    >
      <nav className={cn(styles.nav, styles.sidebar__nav)}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(styles.nav__link, styles.sidebar__link, {
              [styles['nav__link--active']]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) =>
            cn(styles.nav__link, styles.sidebar__link, {
              [styles['nav__link--active']]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            cn(styles.nav__link, styles.sidebar__link, {
              [styles['nav__link--active']]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            cn(styles.nav__link, styles.sidebar__link, {
              [styles['nav__link--active']]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.sidebar__action}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            cn(styles.sidebar__icon, {
              [styles['sidebar__icon--active']]: isActive,
            })
          }
          onClick={closeMenu}
        >
          <div className={styles['sidebar__icon-container']}>
            <img
              src={heartImg}
              alt="favourite"
              className={styles['sidebar__icon--img']}
            />
            <p className={styles['sidebar__icon-number']}>12</p>
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            cn(styles.sidebar__icon, styles['sidebar__icon--right'], {
              [styles['sidebar__icon--active']]: isActive,
            })
          }
          onClick={closeMenu}
        >
          <div className={styles['sidebar__icon-container']}>
            <img
              src={shopBagImg}
              alt="shopBag"
              className={styles['sidebar__icon--img']}
            />
            <p className={styles['sidebar__icon-number']}>12</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
