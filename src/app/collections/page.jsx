import { fetchProductsFromCloudinary } from '../../utils/cloudinaryServer';
import CollectionClient from './CollectionClient';
import { products as fallbackProducts } from '../../data/products';

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function CollectionsPage() {
  let products = await fetchProductsFromCloudinary();
  
  // If no products found in Cloudinary (or error), fallback to local products
  if (!products || products.length === 0) {
    products = fallbackProducts;
  }

  return <CollectionClient initialProducts={products} />;
}
