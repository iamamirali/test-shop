import { FaStar } from 'react-icons/fa';
import { Product } from '../../types/product';

type TProps = Product;

export const ProductCard = (props: TProps) => {
  const { images, title, price, rating, category } = props;

  return (
    <article className="flex flex-col h-80 bg-white rounded-xl p-4 shadow-md shadow-gray-200">
      <img
        src={images[0]}
        alt={title}
        className="w-full h-40 mb-4 object-contain"
      />
      <div className="flex flex-col justify-between grow">
        <div>
          <p className="text-xs mb-1 text-gray-400 transform capitalize font-medium">
            {category}
          </p>
          <h3 className="text-base font-semibold mb-2 h-12">{title}</h3>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="text-gray-400 text-sm font-medium">{rating}</span>
          </div>
          <p className="text-xl font-bold text-teal-500 text-end">${price}</p>
        </div>
      </div>
    </article>
  );
};
