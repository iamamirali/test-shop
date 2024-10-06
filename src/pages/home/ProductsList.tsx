import { useCallback, useEffect, useState } from 'react';
import { Pagination, ProductCard } from '../../components';
import { GetProductsResponse } from '../../types/product';

export const ProductsList = () => {
  const [productsData, setProductsData] = useState<GetProductsResponse>();
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = useCallback(async () => {
    return await fetch(
      `https://dummyjson.com/products?limit=10&skip=${currentPage * 10}`
    );
  }, [currentPage]);

  useEffect(() => {
    getProducts()
      .then((res) => res.json())
      .then((data: GetProductsResponse) => setProductsData(data));
  }, [currentPage, getProducts]);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,16rem)] gap-6 w-full justify-center relative pb-16 flex-grow">
      {productsData?.products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      {productsData?.products && (
        <Pagination
          total={productsData?.total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className="absolute bottom-2 left-0 right-0 mx-auto"
        />
      )}
    </section>
  );
};
