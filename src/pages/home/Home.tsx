import { ProductsList } from './ProductsList';

export const Home = () => {
  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        List of Products
      </h1>
      <ProductsList />
    </main>
  );
};
