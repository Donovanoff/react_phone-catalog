import { useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { getProducts } from '../../utils/useApi';
import { Product } from '../../utils/types';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown, DropdownOption } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { ArrowButton } from '../../components/ArrowButton';
import cn from 'classnames';
import {
  getPaginationArray,
  getSearchWith,
  SearchParams,
} from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

const sortOptions: DropdownOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const perPageOptions: DropdownOption[] = [
  { value: 'all', label: 'All' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: '25', label: '25' },
];

export const CatalogPage: React.FC<Props> = ({ category, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const perPage = searchParams.get('perPage') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const currentPage = Number(searchParams.get('page')) || 1;

  const onParamChange = (key: string, value: string) => {
    const isDefaultValue =
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === 'all') ||
      (key === 'sort' && value === 'newest');

    const paramsToUpdate: SearchParams = {
      [key]: isDefaultValue ? null : value,
    };

    if (key === 'sort' || key === 'perPage') {
      paramsToUpdate.page = null;
    }

    const newSearch = getSearchWith(paramsToUpdate, searchParams);

    setSearchParams(newSearch);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getProducts();

        const filteredProducts = data.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);
      } catch (error) {
        return;
      }
    };

    getData();
  }, [category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const visibleProducts = [...products].sort((productA, productB) => {
    switch (sort) {
      case 'newest':
        return productB.year - productA.year;

      case 'alphabetically':
        return productA.name.localeCompare(productB.name);

      case 'cheapest':
        return productA.price - productB.price;

      default:
        return 0;
    }
  });

  const itemsPerPage =
    perPage === 'all' ? visibleProducts.length : Number(perPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);
  const pages = getPaginationArray(currentPage, totalPages);

  return (
    <div className={styles.catalog}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <Breadcrumbs category={category} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.count}>{products.length} models</div>

        <div className={styles.filter}>
          <div className={styles.sort}>
            <Dropdown
              label="Sort by"
              options={sortOptions}
              value={sort}
              onChange={newValue => onParamChange('sort', newValue)}
            />
          </div>
          <div className={styles.itemsPerPage}>
            <Dropdown
              label="Items on page"
              options={perPageOptions}
              value={perPage}
              onChange={newValue => onParamChange('perPage', newValue)}
            />
          </div>
        </div>

        <div className={styles.productList}>
          {visibleProducts.slice(startIndex, endIndex).map(product => {
            return (
              <div key={product.id} className={styles.product}>
                <ProductCard product={product} showDiscount={true} />
              </div>
            );
          })}
        </div>

        {pages.length > 1 && (
          <div className={styles.pagination}>
            <ArrowButton
              direction="left"
              disabled={currentPage <= 1}
              onClick={() => onParamChange('page', String(currentPage - 1))}
            />

            <div className={styles.pages}>
              {pages.map((n, index) => {
                if (n === '...') {
                  return (
                    <span key={index} className={cn(styles.dots)}>
                      {n}
                    </span>
                  );
                }

                return (
                  <button
                    key={index}
                    className={cn(styles.numberPage, {
                      [styles.numberPageActive]: currentPage === n,
                    })}
                    onClick={() => onParamChange('page', String(n))}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <ArrowButton
              direction="right"
              disabled={currentPage >= totalPages}
              onClick={() => onParamChange('page', String(currentPage + 1))}
            />
          </div>
        )}
      </div>
    </div>
  );
};
