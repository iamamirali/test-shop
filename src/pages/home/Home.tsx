import { ProductsList } from './ProductsList';

export const Home = () => {
  return (
    <main className="flex flex-col items-center p-6 h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-9">
        List of Products
      </h1>
      <ProductsList />
    </main>
  );
};
