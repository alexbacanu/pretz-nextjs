import { Product } from "lib/types/mongo";
import Image from "next/image";
import React from "react";

type ProductTableProps = {
  product: Product;
  category: "cash" | "discount";
};

const ProductTable: React.FC<ProductTableProps> = ({ product, category }) => {
  return (
    <>
      <dt className="sm:col-span-2">
        <a className="flex items-center text-sm font-medium text-gray-500" href={product.pLink}>
          <div className="flex w-20 items-center justify-center px-2">
            <Image
              src={product.pImg}
              alt={product.pName}
              className="rounded-md object-contain object-center shadow-sm"
              height={80}
              width={80}
            />
          </div>
          <div className="flex w-full">
            <p className="pl-2 pt-1 line-clamp-2">{product.pName}</p>
          </div>
        </a>
      </dt>
      <dd className="text-right text-sm text-gray-900">
        <div className="flex justify-end whitespace-nowrap">
          <span className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
            {category === "cash"
              ? `${Math.round(product.stats?.cash30?.v ? product.stats?.cash30?.v : 0)}RON`
              : `${Math.round(product.stats?.deal90?.v ? product.stats?.deal90?.v * 100 : 0)}%`}
          </span>
          <p className="font-semibold text-orange-500">{product.priceCurrent}RON</p>
        </div>
        <div className="flex justify-end whitespace-nowrap pt-1 text-sm text-gray-400">
          <span className="mr-2">{product.pVendor}</span>
          <p className="line-through">
            {category === "cash"
              ? product.stats?.lowest30?.v ?? product.priceSlashed ?? product.priceRetail
              : product.stats?.lowest90?.v ?? product.priceSlashed ?? product.priceRetail}
            RON
          </p>
        </div>
      </dd>
    </>
  );
};

export default ProductTable;
