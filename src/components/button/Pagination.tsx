import { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type TProps = {
  perPage?: number;
  total: number;
  currentPage: number;
  onChange: (page: number) => void;
  className: string;
};

export const Pagination = (props: TProps) => {
  const { perPage = 10, total, currentPage, className, onChange } = props;

  const pagesCount = Math.ceil(total / perPage);

  const onArrowClick = useCallback(
    (direction: 'prev' | 'next') => {
      if (direction === 'prev') {
        onChange(currentPage === 1 ? pagesCount : currentPage - 1);
      } else {
        onChange(currentPage === pagesCount ? 1 : currentPage + 1);
      }
    },
    [currentPage, pagesCount, onChange]
  );

  const renderArrow = useCallback(
    (direction: 'prev' | 'next') => {
      return (
        <button
          onClick={() => onArrowClick(direction)}
          className={`text-gray-500 text-md bg-white flex justify-center items-center h-10 w-10 transition-colors hover:bg-gray-200 ${
            direction === 'prev'
              ? 'border-r rounded-l-lg'
              : 'border-l rounded-r-lg '
          }`}
        >
          {direction === 'prev' ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      );
    },
    [onArrowClick]
  );

  return (
    <div className={`flex border border-solid rounded-lg w-fit  ${className}`}>
      {renderArrow('prev')}
      <button className="h-10 w-10 text-lg font-medium text-teal-500 bg-teal-50">
        {currentPage}
      </button>
      {renderArrow('next')}
    </div>
  );
};
