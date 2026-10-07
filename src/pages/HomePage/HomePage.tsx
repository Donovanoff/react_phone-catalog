import styles from './HomePage.module.scss';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProducts } from '../../utils/useApi';
import { Product } from '../../utils/types';
import { Category } from '../../components/Category';
import { accessoriesImg, phonesImg, tabletsImg } from '../../utils/imageStore';

import { getUniqueProducts } from '../../utils/helpers';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const uniqueProducts = getUniqueProducts(products);

  const newModels = [...uniqueProducts]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const hotPricesModels = [...uniqueProducts]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  const phonesCount = products.filter(
    item => item.category === 'phones',
  ).length;
  const tabletCount = products.filter(
    item => item.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    item => item.category === 'accessories',
  ).length;

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
          <div>
            <h2 className={styles.sectionTitle}>Shop by category</h2>
            <div className={styles.categories}>
              <Category
                title="Mobile phones"
                quantity={phonesCount}
                image={phonesImg}
                linkTo="/phones"
              />
              <Category
                title="Tablets"
                quantity={tabletCount}
                image={tabletsImg}
                linkTo="/tablets"
              />
              <Category
                title="Accessories"
                quantity={accessoriesCount}
                image={accessoriesImg}
                linkTo="/accessories"
              />
            </div>
          </div>
          <div>
            <ProductsSlider
              title="Hot prices"
              products={hotPricesModels}
              showDiscount={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
