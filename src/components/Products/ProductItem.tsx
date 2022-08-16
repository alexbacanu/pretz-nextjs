import Image from "next/image";
import { Product } from "../../lib/atoms/productsAtom";
import LargeGraph from "./LargeGraph";
import SmallGraph from "./SmallGraph";

interface Props {
  product: Product;
  onSelectProduct?: (value: Product) => void;
}

const ProductItem: React.FC<Props> = ({ product, onSelectProduct }) => {
  return (
    <div
      onClick={() => onSelectProduct && product && onSelectProduct(product)}
      className="space-y-2 bg-blue-200 "
    >
      <div className="relative h-64 bg-red-200 max-w-[18rem] hover:opacity-75">
        <Image src={product.productImg} layout="fill" objectFit="contain" alt="Product image" />
      </div>

      <div className="flex justify-between overflow-hidden bg-purple-200 overflow-ellipsis max-h-14">
        <h3 className="w-5/6 text-sm text-gray-700 ">{product.productName}</h3>
        <p className="text-sm font-bold text-gray-900">{product.productPrice}</p>
      </div>
      {onSelectProduct ? (
        <>
          <div className="flex">
            <SmallGraph timeseries={product.timeseries} />
          </div>
        </>
      ) : (
        <>
          <div className="flex">
            <LargeGraph timeseries={product.timeseries} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductItem;
