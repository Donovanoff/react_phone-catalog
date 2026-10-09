import styles from './SkeletonCard.module.scss';

export const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imgBlock}></div>
      <div className={styles.title}></div>
      <div className={styles.price}></div>
      <div className={styles.line}></div>
      <div className={styles.specs}></div>
      <div className={styles.buttons}>
        <div className={styles.buttonMain}></div>
        <div className={styles.buttonFav}></div>
      </div>
    </div>
  );
};
