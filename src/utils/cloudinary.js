export const getCloudinaryUrl = (publicId) => {
  // Replace 'your_cloud_name' with your actual Cloudinary cloud name, 
  // or set it in your .env.local file as NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dolpkts64';
  
  if (!publicId) return '';
  
  // Base Cloudinary URL structure
  // Using f_auto (auto format) and q_auto (auto quality) for performance
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
};
