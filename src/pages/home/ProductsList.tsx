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
import { productCategories } from './categories';

type TFilters = {
  category?: string | null;
};

export const ProductsList = () => {
  const [productsData, setProductsData] = useState<GetProductsResponse>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [reqType, setReqType] = useState<'search' | 'get' | 'filter'>('get');
  const [showDrawerFilters, setShowDrawerFilters] = useState(false);
  const [filters, setFilters] = useState<TFilters>();

  const getProducts = useCallback(async () => {
    return await fetch(
      `https://dummyjson.com/products${
        filters?.category ? `/category/${filters.category}` : ''
      }${searchValue ? '/search' : ''}?` +
        new URLSearchParams({
          limit: '10',
          skip: String((currentPage - 1) * 10),
          ...(searchValue !== null ? { q: searchValue } : {}),
        }).toString()
    );
  }, [currentPage, searchValue, filters]);

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
    setFilters({});
  };

  const onPageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    setReqType('get');
  };

  const onFiltersButtonClick = () => {
    setShowDrawerFilters(!showDrawerFilters);
  };

  const onFilterCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(null);
    setReqType('get');
    setCurrentPage(1);
    const { value } = e.target;
    if (filters?.category === value) {
      setFilters({ ...filters, category: null });
    } else {
      setFilters({ ...filters, category: value });
    }
  };

  const onClearFilters = () => {
    if (filters?.category) {
      setFilters({});
      setCurrentPage(1);
    }
    if (searchValue) {
      setSearchValue(null);
      setCurrentPage(1);
      setReqType('get');
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
      <div className="flex items-start gap-6 w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6 w-full justify-center">
          {productsData?.products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <FilterBox
          showDrawerBox={showDrawerFilters}
          resultsCount={productsData?.total ?? 0}
          onClear={onClearFilters}
        >
          <div className="flex flex-col overflow-y-auto">
            <p className="font-medium text-md mb-2">Category:</p>
            <div className="flex flex-col gap-2">
              {productCategories?.map((cat) => (
                <Checkbox
                  key={cat}
                  value={cat}
                  checked={Boolean(filters?.category === cat)}
                  onChange={onFilterCheckboxChange}
                />
              ))}
            </div>
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
