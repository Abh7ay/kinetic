import { v2 as cloudinary } from 'cloudinary';
import { getCloudinaryUrl } from './cloudinary';
import { products as baseProducts } from '../data/products';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function fetchProductsFromCloudinary() {
  try {
    const res = await cloudinary.api.resources({ 
      context: true, 
      max_results: 100,
      type: 'upload' 
    });

    // Deep copy base products
    const finalProducts = JSON.parse(JSON.stringify(baseProducts));

    // Populate images based on Cloudinary folder matching the product folder field
    finalProducts.forEach(product => {
      product.images = { front: '', detail: '', back: '', side: '' };
      product.image = '';

      res.resources.forEach(img => {
        if (img.asset_folder && img.asset_folder.toLowerCase() === product.folder?.toLowerCase()) {
          const url = getCloudinaryUrl(img.public_id);
          const publicIdLower = img.public_id.toLowerCase();

          if (publicIdLower.includes('front')) {
            product.images.front = url;
            product.image = url; 
          } else if (publicIdLower.includes('detail')) {
            product.images.detail = url;
          } else if (publicIdLower.includes('back')) {
            product.images.back = url;
          } else if (publicIdLower.includes('side')) {
            product.images.side = url;
          } else {
            // Fallback if no specific role in filename
            if (!product.image) {
              product.image = url;
              product.images.front = url;
            }
          }
        }
      });
    });

    return finalProducts;

  } catch (error) {
    console.error('Error fetching from Cloudinary:', error);
    // If fetching fails, just return baseProducts (images will be blank)
    return baseProducts.map(p => ({
      ...p,
      images: { front: '', detail: '', back: '', side: '' },
      image: ''
    }));
  }
}
