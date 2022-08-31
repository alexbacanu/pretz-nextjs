import { doc, getDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Product, productState } from "../atoms/productsAtom";
import { firestore } from "../clients/firebaseClient";

const useProducts = () => {
  const router = useRouter();
  const [productStateValue, setProductStateValue] = useRecoilState(productState);

  const onSelectProduct = (product: Product) => {
    setProductStateValue((prev) => ({
      ...prev,
      selectedProduct: product,
    }));
    router.push(`/products/${product.id}`);
  };

  const fetchProduct = useCallback(
    async (productId: string) => {
      try {
        // Get product from firestore
        const productRef = doc(firestore, "products", productId);
        const productDocs = await getDoc(productRef);

        // Store product in state
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
    },
    [setProductStateValue]
  );

  return {
    productStateValue,
    setProductStateValue,
    onSelectProduct,
    fetchProduct,
  };
};

export default useProducts;
