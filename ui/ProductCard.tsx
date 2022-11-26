import { Product } from "lib/types/mongo";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex w-full grow flex-col overflow-hidden rounded-lg bg-white text-slate-700 shadow">
      {/*  */}
      <button className="absolute top-0 right-0 z-10 m-4 whitespace-nowrap rounded-lg bg-indigo-500 px-2 py-1 align-middle text-sm font-medium uppercase leading-snug text-white transition-all duration-300 md:px-3 md:py-1 lg:-translate-y-12 lg:group-hover:translate-y-0">
        {Object.keys(product.timeseries ? product.timeseries : {}).length} records
      </button>

      <button className="absolute top-0 left-0 z-10 m-4 whitespace-nowrap rounded-lg bg-orange-500 px-2 py-1 align-middle text-sm font-medium uppercase leading-snug text-white transition-all duration-300 md:px-3 md:py-1">
        {Math.round(product.stats?.deal90?.v ? product.stats?.deal90?.v * 100 : 0)}%
      </button>

      {/*  */}
      <div className="overflow-hidden">
        <figure className="items-center justify-center">
          <div className="relative h-60 overflow-hidden">
            <Image
              src={product.pImg}
              alt={product.pName}
              className="object-contain object-center group-hover:opacity-75"
              fill
            />
          </div>
        </figure>
      </div>

      {/*  */}
      <div className="flex grow flex-col border-t border-slate-100 bg-stone-50 p-4">
        <div className="h-auto">
          <div className="text-base">
            <h3 className="truncate pb-1 font-extrabold leading-none">{product.pName}</h3>
            <div className="truncate leading-tight">{product.pCategory}</div>
          </div>
          <div className="mt-2 w-full font-mono text-xs font-medium leading-none">
            <span>{product.pStock}</span>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="mt-2">
            <p className="font-mono text-sm font-medium uppercase leading-snug">
              {product.priceCurrent}
            </p>
          </div>
          <div className="mt-2">
            <p className="font-mono text-sm font-medium uppercase leading-snug">
              {product.pVendor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
