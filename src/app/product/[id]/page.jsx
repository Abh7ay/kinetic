import { fetchProductsFromCloudinary } from '../../../utils/cloudinaryServer';
import ProductClient from './ProductClient';
import { products as fallbackProducts } from '../../../data/products';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function ProductPage({ params }) {
  // Await the params in Next.js App Router (if needed) or directly access
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let products = await fetchProductsFromCloudinary();
  
  if (!products || products.length === 0) {
    products = fallbackProducts;
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
