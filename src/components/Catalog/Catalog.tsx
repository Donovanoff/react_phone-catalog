import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import styles from './Catalog.module.scss';
import { Dropdown, DropdownOption } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import { ArrowButton } from '../ArrowButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { Error } from '../Error';

import { Product } from '../../utils/types';
import {
  getPaginationArray,
  getSearchWith,
  SearchParams,
} from '../../utils/helpers';

type Props = {
  products: Product[];
  title: string;
  category?: 'phones' | 'tablets' | 'accessories' | 'favourites';
  hasError?: boolean;
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

export const Catalog: React.FC<Props> = ({
  products,
  title,
  category,
  hasError,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(visibleProducts.length / itemsPerPage) : 0;
  const pages =
    totalPages > 0 ? getPaginationArray(currentPage, totalPages) : [];

  return (
    <div className={styles.catalog}>
      <div className="container">
        {category && (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs category={category} />
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.count}>
          {products.length} {category === 'favourites' ? 'items' : 'models'}
        </div>

        {hasError ? (
          <Error message="Something went wrong" />
        ) : (
          <>
            {products.length > 0 && (
              <>
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
                  {visibleProducts.slice(startIndex, endIndex).map(product => (
                    <div className={styles.product} key={product.id}>
                      <ProductCard product={product} showDiscount={true} />
                    </div>
                  ))}
                </div>

                {pages.length > 1 && (
                  <div className={styles.pagination}>
                    <ArrowButton
                      direction="left"
                      disabled={currentPage <= 1}
                      onClick={() =>
                        onParamChange('page', String(currentPage - 1))
                      }
                    />

                    <div className={styles.pages}>
                      {pages.map((n, index) =>
                        n === '...' ? (
                          <span key={index} className={styles.dots}>
                            ...
                          </span>
                        ) : (
                          <button
                            key={index}
                            className={cn(styles.numberPage, {
                              [styles.numberPageActive]: currentPage === n,
                            })}
                            onClick={() => onParamChange('page', String(n))}
                          >
                            {n}
                          </button>
                        ),
                      )}
                    </div>

                    <ArrowButton
                      direction="right"
                      disabled={currentPage >= totalPages}
                      onClick={() =>
                        onParamChange('page', String(currentPage + 1))
                      }
                    />
                  </div>
                )}
              </>
            )}

            {products.length === 0 && (
              <h2 className={styles.noResults}>
                There are no {category || 'items'} yet
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};
