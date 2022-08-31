import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProductItem from "../../components/Products/ProductItem";
import useProducts from "../../lib/hooks/useProducts";

const PIDPage: NextPage = () => {
  const { productStateValue, fetchProduct } = useProducts();
  const router = useRouter();

  useEffect(() => {
    const { pid } = router.query;
    // console.log("SELECTED PRODUCT:", productStateValue.selectedProduct);

    if (pid && !productStateValue.selectedProduct) {
      fetchProduct(pid as string);
    }
  }, [router.query, productStateValue.selectedProduct, fetchProduct]);

  return (
    <div className="m-4">
      <div className="flex items-center justify-center border-4 border-gray-200 border-dashed rounded-lg">
        {productStateValue.selectedProduct && (
          <ProductItem product={productStateValue.selectedProduct} />
        )}
      </div>
    </div>
  );
};

export default PIDPage;
