import styles from './ProductsSlider.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowButton } from '../ArrowButton';
import { ProductCard } from '../ProductCard';
import { Product } from '../../utils/types';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxSteps, setMaxSteps] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const handleNext = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    const updateCarouselMath = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const firstCard = trackRef.current.children[0] as HTMLElement;
        const cardWidth = firstCard.clientWidth + 16;

        setItemWidth(cardWidth);

        const windowWidth = window.innerWidth;
        const visibleCards = Math.floor(windowWidth / cardWidth);

        setMaxSteps(products.length - visibleCards);

        const trackFullWidth = trackRef.current.scrollWidth;
        const visibleWindowWidth =
          trackRef.current.parentElement?.clientWidth || windowWidth;

        setMaxTranslate(trackFullWidth - visibleWindowWidth + 16);
      }
    };

    updateCarouselMath();

    window.addEventListener('resize', updateCarouselMath);

    return () => window.removeEventListener('resize', updateCarouselMath);
  }, [products]);

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.arrows}>
          <ArrowButton
            direction="left"
            onClick={handlePrev}
            disabled={currentStep === 0}
          />
          <ArrowButton
            direction="right"
            onClick={handleNext}
            disabled={currentStep >= maxSteps}
          />
        </div>
      </div>

      <div className={styles.caruselWindow}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translateX(-${Math.min(currentStep * itemWidth, maxTranslate)}px)`,
          }}
        >
          {products.map(product => (
            <ProductCard
              key={product.itemId}
              product={product}
              showDiscount={showDiscount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
