import { GetServerSideProps, NextPage } from "next";
import ProductDetails from "src/components/ProductDetails";
import { connectToDatabase } from "src/lib/clients/mongodbClient";
import { Product } from "src/lib/types/mongodb";

type ProductsPageProps = {
  product: Product;
};

const ProductPage: NextPage<ProductsPageProps> = ({ product }) => {
  return <ProductDetails product={product} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  // Set cache
  res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");

  // Get id from url
  const id = params?.pid;

  // Connect to db
  const { db } = await connectToDatabase();

  // Query for a single product and filter by id
  const products = db.collection<Product[]>("emag");
  const product = await products.findOne<Product | undefined>({
    pID: id,
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  // Return product
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
};

export default ProductPage;
