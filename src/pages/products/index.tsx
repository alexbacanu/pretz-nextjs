import { NextPage } from "next";
import Products from "../../components/Products/Products";

const ProductsPage: NextPage = () => {
  return (
    <div className="m-4">
      <div className="p-4 border-4 border-gray-200 border-dashed rounded-lg">
        <Products />
      </div>
    </div>
  );
};
export default ProductsPage;
