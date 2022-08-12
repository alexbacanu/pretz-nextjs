import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Product, productState } from "../atoms/productsAtom";

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

  return {
    productStateValue,
    setProductStateValue,
    onSelectProduct,
  };
};

export default useProducts;
