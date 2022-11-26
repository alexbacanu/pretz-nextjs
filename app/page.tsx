import clientPromise from "lib/client/mongoClient";
import {
  randomProductsPipeline,
  topCashProductsPipeline,
  topDiscountProductsPipeline,
} from "lib/helpers/pipelines";
import { Product } from "lib/types/mongo";
import ProductCard from "ui/ProductCard";
import ProductTable from "ui/ProductTable";

const getProducts = async (pipeline: {}[]) => {
  const client = await clientPromise;
  const db = client.db("pretz");
  const products = await db.collection("emag").aggregate(pipeline).toArray();

  return products as Product[];
};

export default async function HomePage() {
  const randomProductsPromise = getProducts(randomProductsPipeline);
  const topDiscountProductsPromise = getProducts(topDiscountProductsPipeline);
  const topCashProductsPromise = getProducts(topCashProductsPipeline);

  const randomProducts = await randomProductsPromise;
  const topDiscountProducts = await topDiscountProductsPromise;
  const topCashProducts = await topCashProductsPromise;

  return (
    <>
      {/* Random Products */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {randomProducts.map((product) => (
          <a key={product.pID} href={product.pLink} className="group">
            <ProductCard product={product} />
          </a>
        ))}
      </div>

      {/* Top Products */}
      <div className="mt-6 columns-1 gap-8 space-y-8 lg:columns-2">
        <div className="overflow-hidden rounded-lg bg-white shadow sm:rounded-xl">
          <div className="p-3 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Cash 30 zile</h3>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              {topCashProducts.map((product) => (
                <div
                  key={product.pID}
                  className="flex items-center border-b border-gray-100 bg-stone-50 p-2 sm:grid sm:grid-cols-3 sm:gap-4"
                >
                  <ProductTable product={product} category={"cash"} />
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow sm:rounded-xl">
          <div className="p-3 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Top 90 zile</h3>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              {topDiscountProducts.map((product) => (
                <div
                  key={product.pID}
                  className="items-center border-b border-gray-100 bg-stone-50 p-2 sm:grid sm:grid-cols-3 sm:gap-4"
                >
                  <ProductTable product={product} category={"discount"} />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
