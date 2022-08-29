import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore/lite";
import { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "../../components/Products/ProductItem";
import { Product } from "../../lib/atoms/productsAtom";
import { firestore } from "../../lib/clients/firebaseClient";
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
  const [loading, setLoading] = useState(true);
  // TODO: hasMore defaults to true, needs more testing
  const [hasMore, setHasMore] = useState(true);

  // TODO: Add offline support
  const buildNoUserProductsFeed = async () => {
    setLoading(true);
    // Store products in productState
    setProductStateValue((prev) => ({
      ...prev,
      products: props.products as Product[],
    }));
    setLoading(false);
  };

  const getMoreProducts = useCallback(async () => {
    setLoading(true);
    const last = productStateValue.products.at(-1);

    const cursor = last?.crawledAt;
    // console.log("Cursor: ", cursor);

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

    // Check if there are more products
    setHasMore(newProductsDocs.docs.length > 0);

    // Store products in productState
    setProductStateValue((prev) => ({
      ...prev,
      products: [...prev.products, ...(newProducts as Product[])],
    }));

    // console.log("New Products: ", newProducts);
    setLoading(false);
  }, [productStateValue.products, setProductStateValue]);

  // Observe the last element
  const observer = useRef<IntersectionObserver>();

  // Get last div element from .map
  const lastProductElement = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getMoreProducts();
        }
      });
      if (node) observer.current.observe(node);
      // console.log("Node: ", node);
    },
    [loading, hasMore, getMoreProducts]
  );

  useEffect(() => {
    buildNoUserProductsFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("PSV: ", productStateValue);
  }, [productStateValue]);

  return (
    <div className="m-4">
      <div className="p-4 border-4 border-gray-200 border-dashed rounded-lg">
        <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <>
              {productStateValue.products.map((item, index) => {
                if (productStateValue.products.length === index + 1) {
                  return (
                    <ProductItem
                      innerRef={lastProductElement}
                      key={item.id}
                      product={item}
                      onSelectProduct={onSelectProduct}
                    />
                  );
                } else {
                  return (
                    <ProductItem key={item.id} product={item} onSelectProduct={onSelectProduct} />
                  );
                }
              })}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
