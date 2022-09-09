import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Product, productState } from "../atoms/productsAtom";
import { supabase } from "../clients/supabaseClient";

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
    async (id: string) => {
      try {
        // Get product from supabase
        const { data, error } = await supabase.from("products").select().eq("id", id).single();

        // Store product in state
        setProductStateValue((prev) => ({
          ...prev,
          selectedProduct: {
            ...data,
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
