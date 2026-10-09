import React from 'react';
import styles from './Error.module.scss';

type Props = {
  message: string;
};

export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="container">
      <h2 className={styles.error}>{message}</h2>
    </div>
  );
};
