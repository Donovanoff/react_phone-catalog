import { Accessory, Phone, Product, Tablet } from './types';

function request<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}

export function getProducts() {
  return request<Product[]>('/api/products.json');
}

export function getPhones() {
  return request<Phone[]>('/api/phones.json');
}

export function getTablets() {
  return request<Tablet[]>('/api/tablets.json');
}

export function getAccessories() {
  return request<Accessory[]>('/api/accessories.json');
}
