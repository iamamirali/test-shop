import { ReactNode } from 'react';

type TProps = {
  showDrawerBox: boolean;
  resultsCount: number;
  children?: ReactNode;
  onClear?: () => void;
};

export const FilterBox = (props: TProps) => {
  const { showDrawerBox, resultsCount, children, onClear } = props;

  return (
    <>
      <div className="w-80 lg:block hidden p-4 bg-white border rounded-xl">
        <div className="flex justify-between mb-6">
          <p className="text-xl font-semibold">{resultsCount || 0} Products</p>
          {typeof onClear === 'function' && (
            <button className="text-red-500 text-sm spacing" onClick={onClear}>
              Clear Filters
            </button>
          )}
        </div>
        {children}
      </div>

      {showDrawerBox && (
        <div className="lg:hidden flex flex-col h-2/5 w-full left-0 right-0 fixed z-10 bottom-0 p-4 bg-white shadow-2xl rounded-t-xl">
          <div className="flex justify-between mb-6">
            <p className="text-xl font-semibold">
              {resultsCount || 0} Products
            </p>
            <button className="text-red-500">Clear Filters</button>
          </div>
          {children}
        </div>
      )}
    </>
  );
};
