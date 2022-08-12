import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Product } from "../../lib/atoms/productsAtom";
import { firestore } from "../../lib/firebase/clientApp";
import useProducts from "../../lib/hooks/useProducts";
import ProductItem from "./ProductItem";

const Products: React.FC = () => {
  const initialLimit = 10;
  const [loading, setLoading] = useState(false);
  const { productStateValue, setProductStateValue, onSelectProduct } = useProducts();

  // TODO: Add offline support
  const getProducts = async () => {
    try {
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

      // Store products in productState
      setProductStateValue((prev) => ({
        ...prev,
        products: products as Product[],
      }));
    } catch (error) {
      console.log("getPosts error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("PSV", productStateValue);
  }, [productStateValue]);

  return (
    <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <>
          {productStateValue.products.map((item) => {
            return <ProductItem key={item.id} product={item} onSelectProduct={onSelectProduct} />;
          })}
        </>
      </div>
    </div>
  );
};
export default Products;
