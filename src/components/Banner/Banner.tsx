import styles from './Banner.module.scss';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { bannerImg1 } from '../../utils/imageStore';

export const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slidesCount = 3;
  const minSwipeDistance = 50;

  const goToPrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? slidesCount - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === slidesCount - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  return (
    <section className={styles.banner}>
      <div className={styles.bannerWrapper}>
        <button
          onClick={goToPrev}
          className={cn(styles.arrow, styles.arrowLeft)}
        >
          {'<'}
        </button>

        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={styles.window}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <article className={styles.slide}>
              <img src={bannerImg1} alt="iPhone 14 Pro" />
            </article>

            <article className={styles.slide}>
              <img src={bannerImg1} alt="iPhone 14 Pro" />
            </article>

            <article className={styles.slide}>
              <img src={bannerImg1} alt="iPhone 14 Pro" />
            </article>
          </div>
        </div>

        <button
          onClick={goToNext}
          className={cn(styles.arrow, styles.arrowRight)}
        >
          {'>'}
        </button>
      </div>

      <div className={styles.pagination}>
        {[0, 1, 2].map(index => (
          <div
            key={index}
            className={cn(styles.dot, {
              [styles.active]: currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};
