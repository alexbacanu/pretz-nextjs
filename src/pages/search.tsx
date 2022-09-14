import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import SearchForm from "src/components/SearchForm";
import SearchResults from "src/components/SearchResults";
import { supabase } from "src/lib/clients/supabaseClient";
import { definitions } from "src/lib/types/supabase";

interface Props {
  products: definitions["products"][];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <Flex mx={{ base: 6, md: "auto" }} maxW="8xl">
      <Box
        w={{ base: "full", md: "20%" }}
        position="relative"
        display={{ base: "none", md: "block" }}
        p={2}
      >
        <SearchForm />
      </Box>
      <Box w={{ base: "full", md: "80%" }} p={2}>
        <SearchResults products={products} />
      </Box>
    </Flex>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const type = query.type || "deals";
  const name = query.name as string;
  const category = query.category as string;
  const minPrice = query.minPrice || 0;
  const maxPrice = query.maxPrice || 999999;
  const minReviews = query.minReviews || 0;
  const minStars = query.minStars || 0;
  //   const reused = query.reused as string;
  //   const store = query.store as string;

  // Get products from supabase
  let searchQuery = supabase
    .from<definitions["products"]>("products")
    .select()
    .gte("priceCurrent", minPrice)
    .lte("priceCurrent", maxPrice)
    .gte("pReviews", minReviews)
    .gte("pStars", minStars)
    .limit(60);

  if (name && name !== "") {
    const nameKeyword = name
      .split(/\s+/)
      .map((word) => `'${word}' & `)
      .join("")
      .slice(0, -3);

    searchQuery = searchQuery.textSearch("fts", nameKeyword, {
      config: "english",
    });
  }

  if (category && category !== "") {
    searchQuery = searchQuery.textSearch("pCategory", category, {
      config: "english",
    });
  }

  const { data: products } = await searchQuery;

  return {
    props: {
      products: products || [],
    },
  };
};
