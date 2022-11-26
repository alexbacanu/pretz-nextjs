import clientPromise from "lib/client/mongoClient";
import { Product } from "lib/types/mongo";
import Image from "next/image";

type ProductPageProps = {};

const getProduct = async (productID: string) => {
  const client = await clientPromise;
  const db = client.db("pretz");
  const product = await db.collection("emag").findOne<Product | undefined>({ pID: productID });

  return product;
};

export default async function ProductPage({ params }: any) {
  const productPromise = getProduct(params.pid);
  const product = await productPromise;

  if (!product) {
    return;
  }

  return (
    <>
      <div className="flex flex-wrap">
        {/* 1 */}
        <div className="w-full md:w-1/3">
          <figure className="flex items-center justify-center">
            <Image
              src={product.pImg}
              alt={product.pName}
              className="rounded-lg object-contain shadow-md"
              height={400}
              width={400}
            />
          </figure>
          {/* //TODO: Add to wishlist */}
          {/* //TODO: Vouchers */}
        </div>

        {/* 2 */}
        <div className="flex w-full flex-col p-4 md:w-2/3">
          <section className="top-[72px] md:sticky">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                {/* Trail */}
                <span className="text-stone-500 transition hover:text-gray-900">
                  {product.pCategoryTrail}
                </span>

                {/* Category */}
                <span className="text-base font-normal">{product.pCategory}</span>
              </div>

              {/* Name */}
              <h1 className="text-2xl font-extrabold leading-snug text-indigo-600 lg:text-3xl">
                {product.pName}
              </h1>

              {/* Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col rounded-lg border border-gray-300 p-2 shadow-md hover:border-gray-400">
                  <div>Current price</div>
                  <div className="font-mono text-3xl uppercase">{product.priceCurrent}</div>
                  <div className="font-mono text-sm uppercase">{product.pVendor}</div>
                </div>
                <div className="flex flex-col rounded-lg border border-gray-300 p-2 shadow-md hover:border-gray-400">
                  <div>Historical low</div>
                  <div className="font-mono text-3xl uppercase">{product.stats?.lowestAll?.v}</div>
                  <div className="font-mono text-sm uppercase">
                    On: {product.stats?.lowestAll?.k.toDateString()}
                  </div>
                </div>
                <div className="flex flex-col rounded-lg border border-gray-300 p-2 shadow-md hover:border-gray-400">
                  <div>Records</div>
                  <div className="font-mono text-3xl uppercase">
                    {Object.keys(product.timeseries ? product.timeseries : {}).length}
                  </div>
                  <div className="font-mono text-sm uppercase">
                    Since:{" "}
                    {Object.values(product.timeseries ? product.timeseries : {})[0][
                      "priceDate"
                    ].toDateString()}
                  </div>
                </div>
              </div>

              {/* //TODO: Graph */}
            </div>
          </section>
        </div>

        {/* 3 */}
        {/* //TODO: Stores */}
        {/* //TODO: Stores / OLX / Eco */}
        <div className="flex w-full bg-green-500 p-4">
          <span className="py-96">Recommended products</span>
        </div>

        {/* //TODO: Similar products */}
        <div className="flex w-full bg-green-500 p-4">
          <span className="py-96">Recommended products</span>
        </div>
      </div>
    </>
  );
}
