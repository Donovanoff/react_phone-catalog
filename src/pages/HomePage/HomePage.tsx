import styles from './HomePage.module.scss';
import cn from 'classnames';
import React from 'react';
import { Banner } from '../../components/Banner';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={cn('container')}>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
};
