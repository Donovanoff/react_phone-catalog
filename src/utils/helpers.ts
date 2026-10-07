export const getUniqueProducts = <T extends { name: string; capacity: string }>(
  products: T[],
): T[] => {
  return products.filter((product, index, array) => {
    const baseName = product.name.split(product.capacity)[0].trim();

    const isFirst =
      array.findIndex(p => p.name.split(p.capacity)[0].trim() === baseName) ===
      index;

    return isFirst;
  });
};

export function getPaginationArray(
  currentPage: number,
  totalPages: number,
): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages];
  } else if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages];
  } else {
    return [1, '...', currentPage, '...', totalPages];
  }
}

export type SearchParams = {
  [key: string]: string | string[] | null;
};

export function getSearchWith(
  paramsToUpdate: SearchParams,
  search?: string | URLSearchParams,
): string {
  const newParams = new URLSearchParams(search);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(part => {
        newParams.append(key, part);
      });
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
