import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import SearchForm from "src/components/SearchForm";
import SearchResults from "src/components/SearchResults";
import { connectToDatabase } from "src/lib/clients/mongodbClient";
import { Product } from "src/lib/types/mongodb";

interface SearchPageProps {
  products: Product[];
  prices: number[];
  stars: number;
  reviews: number;
}

const SearchPage: NextPage<SearchPageProps> = ({ products, prices, stars, reviews }) => {
  return (
    <Flex mx={{ base: 6, md: "auto" }} maxW="8xl">
      <Box
        w={{ base: "full", md: "20%" }}
        position="relative"
        display={{ base: "none", md: "block" }}
        p={2}
      >
        <SearchForm products={products} prices={prices} stars={stars} reviews={reviews} />
      </Box>
      <Box w={{ base: "full", md: "80%" }} p={2}>
        <SearchResults products={products} />
      </Box>
    </Flex>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  // Set cache
  res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");

  // Connect to db
  let { db } = await connectToDatabase();

  // Query for a single product and sort by price
  const [getMaxPrice] = await db
    .collection<Product>("emag")
    .find()
    .sort({ priceCurrent: -1 })
    .limit(1)
    .toArray();

  const [getMinPrice] = await db
    .collection<Product>("emag")
    .find()
    .sort({ priceCurrent: 1 })
    .limit(1)
    .toArray();

  const [getMaxStars] = await db
    .collection<Product>("emag")
    .find()
    .sort({ pStars: -1 })
    .limit(1)
    .toArray();

  const [getMaxReviews] = await db
    .collection<Product>("emag")
    .find()
    .sort({ pReviews: -1 })
    .limit(1)
    .toArray();

  // Get query params
  const minPrice = Number(query.minPrice) || 0;
  const maxPrice = Number(query.maxPrice) || getMaxPrice.priceCurrent;
  const minStars = Number(query.minStars) || 0;
  const minReviews = Number(query.minReviews) || 0;

  // Set filters
  const filter = {
    priceCurrent: {
      $gte: minPrice,
      $lte: maxPrice,
    },
    pReviews: {
      $gte: minReviews,
    },
    pStars: {
      $gte: minStars,
    },
  };

  const limit = 60;

  // Query for all products that match the filter
  const products = await db.collection<Product[]>("emag").find(filter, { limit }).toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      prices: [getMinPrice.priceCurrent ? getMinPrice.priceCurrent : 0, getMaxPrice.priceCurrent],
      stars: getMaxStars.pStars,
      reviews: getMaxReviews.pReviews,
    },
  };
};
