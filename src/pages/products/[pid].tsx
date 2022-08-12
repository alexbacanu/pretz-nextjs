import { doc, getDoc } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProductItem from "../../components/Products/ProductItem";
import { Product } from "../../lib/atoms/productsAtom";
import { firestore } from "../../lib/firebase/clientApp";
import useProducts from "../../lib/hooks/useProducts";

const PIDPage: NextPage = () => {
  const { productStateValue, setProductStateValue } = useProducts();
  const router = useRouter();

  // Get selected product from database
  const fetchProduct = async (productId: string) => {
    try {
      const productRef = doc(firestore, "products", productId);

      const productDocs = await getDoc(productRef);

      // Store products in productState
      setProductStateValue((prev) => ({
        ...prev,
        selectedProduct: {
          id: productDocs.id,
          ...productDocs.data(),
        } as Product,
      }));
    } catch (error) {
      console.log("fetchProduct error", error);
    }
  };

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !productStateValue.selectedProduct) {
      fetchProduct(pid as string);
    }
  }, [router.query, productStateValue.selectedProduct]);

  return (
    <div className="m-4">
      <div className="flex items-center justify-center border-4 border-gray-200 border-dashed rounded-lg h-96">
        {productStateValue.selectedProduct && (
          <ProductItem product={productStateValue.selectedProduct} />
        )}
      </div>
    </div>
  );
};

export default PIDPage;
