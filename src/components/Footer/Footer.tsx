import styles from './Footer.module.scss';
import React from 'react';
import { logoImg } from '../../utils/imageStore';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={cn('container', styles.footerContainer)}>
        <Link to="/" className={styles.logo}>
          <img src={logoImg} alt="logo" className={styles.logoImg} />
        </Link>
        <nav className={styles.nav}>
          <a
            href={
              'https://github.com/Donovanoff/react_phone-catalog/tree/develop'
            }
            className={styles.navLink}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <Link to={'/'} className={styles.navLink}>
            Contacts
          </Link>
          <Link to={'/'} className={styles.navLink}>
            Rights
          </Link>
        </nav>
        <button className={styles.button} onClick={scrollToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
};
