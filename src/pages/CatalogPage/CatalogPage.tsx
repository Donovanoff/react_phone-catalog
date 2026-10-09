import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/useApi';
import { Product } from '../../utils/types';
import { Catalog } from '../../components/Catalog';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setHasError(false);
        setIsLoading(true);

        const data = await getProducts();
        const filteredProducts = data.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [category]);

  return (
    <Catalog
      products={products}
      title={title}
      category={category}
      hasError={hasError}
      isLoading={isLoading}
    />
  );
};
