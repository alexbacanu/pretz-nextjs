import { Box, Flex, HStack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { definitions } from "src/lib/types/supabase";
import SearchItem from "./SearchItem";
import SearchSort from "./SearchSort";

interface Props {
  products: definitions["products"][];
}

const SearchResults: React.FC<Props> = ({ products }) => {
  return (
    <Box>
      {products.length > 0 ? (
        <>
          <Flex align={"center"} p={2} mx={8} justifyContent="space-between">
            <Text fontSize={{ base: "md", md: "lg" }} fontStyle="italic">{`${
              products.length
            } product${products.length === 1 ? "" : "s"} found`}</Text>
            <HStack align="center">
              <SearchSort />
            </HStack>
          </Flex>
          <Flex py={2}>
            <Wrap w={"full"} justify={"space-evenly"}>
              {products.map((product) => (
                <WrapItem key={product.id}>
                  <SearchItem product={product} />
                </WrapItem>
              ))}
            </Wrap>
          </Flex>
        </>
      ) : (
        <>
          <Flex py={2}>
            <Text>No products found</Text>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SearchResults;
