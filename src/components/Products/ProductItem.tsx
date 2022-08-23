import Image from "next/future/image";
import { Product } from "../../lib/atoms/productsAtom";
import LargeGraph from "./Graphs/LargeGraph";
import SmallGraph from "./Graphs/SmallGraph";

interface Props {
  product: Product;
  onSelectProduct?: (value: Product) => void;
  innerRef?: (node: HTMLDivElement) => void;
}

const ProductItem: React.FC<Props> = ({ product, onSelectProduct, innerRef }) => {
  return (
    <>
      <div ref={innerRef} onClick={() => onSelectProduct && product && onSelectProduct(product)}>
        {!onSelectProduct ? (
          <>
            {console.log(product)}
            <div className="flex items-center">
              <div className="overflow-hidden bg-gray-200 rounded-md aspect-w-1 aspect-h-1 group-hover:opacity-75 ">
                <Image
                  src={product.productImg}
                  alt="Product image"
                  className="object-scale-down object-center w-auto h-auto"
                  width={380}
                  height={380}
                />
              </div>
              <div className="relative w-8/12 m-auto">
                <LargeGraph timeseries={product.timeseries} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <h3 className="pr-2 text-sm text-gray-700 line-clamp-3">
                <a href="#">{product.productName}</a>
              </h3>
              <p className="font-bold text-red-600 whitespace-nowrap text-md">
                {product.productPrice} Lei
              </p>
            </div>
            <div className="flex-none max-w-md">
              <p className="mt-1 text-sm text-gray-500">Last update: {`${product.crawledAt}`}</p>
              <p className="mt-1 text-sm text-gray-500">Genius: {`${product.geniusTag}`}</p>
              <p className="mt-1 text-sm text-gray-500">Used: {`${product.usedTag}`}</p>
              <p className="mt-1 text-sm text-gray-500">ID: {product.id}</p>
              <p className="mt-1 text-sm text-gray-500">Category: {product.productCategory}</p>
              <p className="mt-1 text-sm text-gray-500">PID: {product.productID}</p>
              <p className="mt-1 text-sm text-gray-500">Link: {product.productLink}</p>
              <p className="mt-1 text-sm text-gray-500">Reviews: {product.productReviews}</p>
              <p className="mt-1 text-sm text-gray-500">Stars: {product.productStars}</p>
              <p className="mt-1 text-sm text-gray-500">Stoc: {product.productStock}</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none">
              <Image
                src={product.productImg}
                alt="Product image"
                className="object-scale-down object-center"
                width={300}
                height={320}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <h3 className="pr-2 text-sm text-gray-700 line-clamp-3">
                <a href="#">{product.productName}</a>
              </h3>
              <p className="font-bold text-red-600 whitespace-nowrap text-md">
                {product.productPrice} Lei
              </p>
            </div>
            <div className="relative w-full m-auto">
              <SmallGraph timeseries={product.timeseries} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductItem;
