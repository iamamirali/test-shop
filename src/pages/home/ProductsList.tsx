import { useEffect, useState } from 'react';
import { ProductCard } from '../../components';
import { GetProductsResponse, Product } from '../../types/product';

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>();

  const getProducts = async () => {
    return await fetch('https://dummyjson.com/products?limit=10&skip=10');
  };

  useEffect(() => {
    getProducts()
      .then((res) => {
        return res.json();
      })
      .then((data: GetProductsResponse) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,16rem)] gap-6 w-full justify-center">
      {products?.map((product) => (
        <ProductCard {...product} />
      ))}
    </section>
  );
};
