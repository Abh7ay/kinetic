import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dolpkts64',
  api_key: '223529167346359',
  api_secret: 'nXtZqqoVzOz0H0stWqaDGWfu-SQ'
});

async function test() {
  try {
    const res = await cloudinary.api.resources({ context: true, max_results: 10 });
    console.log(JSON.stringify(res.resources, null, 2));
  } catch(e) {
    console.error(e);
  }
}

test();
