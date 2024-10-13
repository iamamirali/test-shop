import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Checkbox,
  FilterBox,
  Pagination,
  ProductCard,
  SearchField,
} from '../../components';
import { GetProductsResponse } from '../../types/product';
import { IoFilter } from 'react-icons/io5';

type TFilters = {
  categories: string[];
};

export const ProductsList = () => {
  const [productsData, setProductsData] = useState<GetProductsResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [reqType, setReqType] = useState<'search' | 'get'>('get');
  const [showDrawerFilters, setShowDrawerFilters] = useState(false);
  const [filters, setFilters] = useState<TFilters>();

  const getProducts = useCallback(async () => {
    return await fetch(
      `https://dummyjson.com/products${searchValue ? '/search' : ''}?` +
        new URLSearchParams({
          limit: '10',
          skip: String((currentPage - 1) * 10),
          ...(searchValue !== null ? { q: searchValue } : {}),
        }).toString()
    );
  }, [currentPage, searchValue]);

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

  const onFiltersButtonClick = () => {
    setShowDrawerFilters(!showDrawerFilters);
  };

  const onFilterCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      const updatedCats = [...(filters?.categories ?? []), value];
      setFilters({ ...filters, categories: updatedCats });
    } else {
      const updatedCats =
        filters?.categories?.filter((cat) => cat !== value) ?? [];
      setFilters({ ...filters, categories: updatedCats });
    }
  };

  return (
    <section className="flex flex-col items-center flex-grow w-full relative pb-20">
      <div className="flex justify-center gap-4 w-full">
        <SearchField
          value={searchValue ?? ''}
          onChange={onSearchFieldChange}
          className="w-full mb-6 sm:w-1/2"
        />
        <button
          onClick={onFiltersButtonClick}
          className="lg:hidden flex items-center justify-center gap-1 h-12 w-20 px-2 rounded-lg bg-white border"
        >
          <IoFilter /> Filters
        </button>
      </div>
      <div className="flex gap-6 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6 w-full justify-center">
          {productsData?.products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <FilterBox
          showDrawerBox={showDrawerFilters}
          resultsCount={productsData?.total ?? 0}
        >
          <div className="flex flex-col overflow-y-auto">
            <p className="font-medium text-md mb-2">Category:</p>
            <Checkbox
              label="hello"
              value="hello"
              checked={Boolean(filters?.categories?.includes('hello'))}
              onChange={onFilterCheckboxChange}
            />
            <Checkbox
              label="تست"
              value="shout"
              checked={Boolean(filters?.categories?.includes('shout'))}
              onChange={onFilterCheckboxChange}
            />
          </div>
        </FilterBox>
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
