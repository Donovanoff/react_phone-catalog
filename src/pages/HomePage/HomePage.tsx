import styles from './HomePage.module.scss';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProducts } from '../../utils/useApi';
import { Product } from '../../utils/types';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const uniqueProducts = products.filter((product, index, array) => {
    const baseName = product.name.split(product.capacity)[0].trim();

    const isFirst =
      array.findIndex(p => p.name.split(p.capacity)[0].trim() === baseName) ===
      index;

    return isFirst;
  });

  const newModels = [...uniqueProducts]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        return;
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.home}>
      <div className={cn('container')}>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
            <Banner />
          </div>
          <div>
            <ProductsSlider title="Brand new models" products={newModels} />
          </div>
        </div>
      </div>
    </div>
  );
};
