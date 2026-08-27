import { fetchProductsFromCloudinary } from '../utils/cloudinaryServer';
import HomeClient from './HomeClient';
import { products as fallbackProducts } from '../data/products';

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function HomePage() {
  let products = await fetchProductsFromCloudinary();
  
  if (!products || products.length === 0) {
    products = fallbackProducts;
  }

  return <HomeClient initialProducts={products} />;
}
