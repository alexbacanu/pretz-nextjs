import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import ProductItem from "../../components/Products/ProductItem";
import { Product } from "../../lib/atoms/productsAtom";
import { firestore } from "../../lib/firebase/clientApp";
import useProducts from "../../lib/hooks/useProducts";

interface Props {
  products: Product[];
}

const initialLimit = 10;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get products from database
  const productsQuery = query(
    collection(firestore, "products"),
    orderBy("crawledAt", "desc"),
    limit(initialLimit)
  );

  const productsDocs = await getDocs(productsQuery);

  // Define products
  const products = productsDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { products },
  };
};

const ProductsPage: NextPage<Props> = (props) => {
  const { productStateValue, setProductStateValue, onSelectProduct } = useProducts();

  // TODO: Add offline support
  const buildNoUserProductsFeed = async () => {
    // Store products in productState
    setProductStateValue((prev) => ({
      ...prev,
      products: props.products as Product[],
    }));
  };

  const getMoreProducts = async () => {
    const last = productStateValue.products.at(-1);

    const cursor = last?.crawledAt;

    const productsQuery = query(
      collection(firestore, "products"),
      orderBy("crawledAt", "desc"),
      startAfter(cursor),
      limit(initialLimit)
    );

    const newProductsDocs = await getDocs(productsQuery);

    // Define products
    const newProducts = newProductsDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Store products in productState
    setProductStateValue((prev) => ({
      ...prev,
      products: newProducts as Product[],
    }));

    console.log(newProducts);
  };

  useEffect(() => {
    buildNoUserProductsFeed();
  }, []);

  useEffect(() => {
    console.log("PSV", productStateValue);
  }, [productStateValue]);

  return (
    <div className="m-4">
      <div className="p-4 border-4 border-gray-200 border-dashed rounded-lg">
        <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <>
              {productStateValue.products.map((item) => {
                return (
                  <ProductItem key={item.id} product={item} onSelectProduct={onSelectProduct} />
                );
              })}
              <button onClick={getMoreProducts}>Next products</button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
