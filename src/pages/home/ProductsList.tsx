import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Pagination, ProductCard, SearchField } from '../../components';
import { GetProductsResponse } from '../../types/product';

export const ProductsList = () => {
  const [productsData, setProductsData] = useState<GetProductsResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [reqType, setReqType] = useState<'search' | 'get'>('get');

  const getProducts = useCallback(
    async (skip?: number) => {
      return await fetch(
        `https://dummyjson.com/products${searchValue ? '/search' : ''}?` +
          new URLSearchParams({
            limit: '10',
            skip: String(skip ?? (currentPage - 1) * 10),
            ...(searchValue !== null ? { q: searchValue } : {}),
          }).toString()
      );
    },
    [currentPage, searchValue]
  );

  useEffect(() => {
    let timer = null;
    if (reqType === 'search') {
      timer = setTimeout(() => {
        getProducts()
          .then((res) => res.json())
          .then((data: GetProductsResponse) => {
            setProductsData(data);
          });
      }, 1000);
    } else {
      getProducts()
        .then((res) => res.json())
        .then((data: GetProductsResponse) => setProductsData(data));
    }
    if (timer) {
      return () => clearTimeout(timer);
    }
  }, [getProducts, searchValue, reqType]);

  const onSearchFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value || null);
    setReqType('search');
    setCurrentPage(1);
  };

  const onPageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    setReqType('get');
  };

  return (
    <section className="flex flex-col items-center flex-grow w-full relative pb-20">
      <SearchField
        value={searchValue ?? ''}
        onChange={onSearchFieldChange}
        className="w-64 mb-6 sm:w-1/2"
      />
      <div className="grid grid-cols-[repeat(auto-fit,16rem)] gap-6 w-full justify-center">
        {productsData?.products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {productsData?.products && (
        <Pagination
          total={productsData?.total}
          currentPage={currentPage}
          onChange={onPageChange}
          className="absolute bottom-3 left-0 right-0 mx-auto"
        />
      )}
    </section>
  );
};
