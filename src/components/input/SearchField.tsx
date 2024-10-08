import { ChangeEventHandler } from 'react';
import { IoSearch } from 'react-icons/io5';

type TProps = {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const SearchField = (props: TProps) => {
  const { className, placeholder, value, onChange } = props;

  return (
    <div
      className={`relative border h-12 rounded-lg focus-within:border-teal-500 ${className}`}
    >
      <IoSearch className="text-gray-400 absolute left-3 bottom-0 top-0 m-auto text-lg pointer-events-none" />
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder ?? 'Search for products...'}
        className="focus:outline-none w-full pl-9 pr-3 rounded-lg h-full tex"
      />
    </div>
  );
};
