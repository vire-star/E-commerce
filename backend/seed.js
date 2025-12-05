import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
// import Product from '../src/models/product.model.js';
import dotenv from 'dotenv';
import Product from './src/models/product.model.js';

dotenv.config();

const categories = [ 'Kids', 'Mens', 'Womens'];
const names =['Shirt', 'Pant', 'Jacket','Jeans', 'Saree', 'Shoes']
const imageMap = {
   
    'Kids': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    'Mens': 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
    'Womens': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
  };
const generateProducts = (count) => {
  const products = [];
  
  for (let i = 0; i < count; i++) {
     const category = faker.helpers.arrayElement(categories);
    products.push({
      name: faker.helpers.arrayElement(names),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
        category: category, // ✅ Ab yeh defined hai
      image: imageMap[category], // ✅ Ab yeh bhi kaam karega
      isFeatured: false, 
      createdAt: faker.date.past(),
    });
  }
  
  return products;
};

const seedDatabase = async () => {
  try {
    // MongoDB connect
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ MongoDB Connected');

    // Existing products delete (optional)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // 1000 products generate
    const products = generateProducts(1000);

    // Bulk insert - fast and efficient
    await Product.insertMany(products);
    console.log(`✅ Successfully inserted ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
