import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "next/future/image";
import Link from "next/link";
import { Product } from "src/lib/types/mongodb";

interface Props {
  product: Product;
}

const SearchItem: React.FC<Props> = ({ product }) => {
  return (
    <Flex p={1} pb={6} w="full" alignItems="center" justifyContent="center">
      <Link
        href="/details/[name]/[pid]"
        as={`/details/${encodeURI(product.pName ? product.pName.replace(/ /g, "-") : "")}/${
          product.pID
        }`}
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="20.5em"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Image
            src={product.pImg as string}
            alt={`Picture of ${product.pName}`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "20.5em", height: "256px", objectFit: "contain" }}
            priority
          />

          <Box p="2">
            <Flex justifyContent="space-between" alignContent="center" noOfLines={2}>
              <Box fontSize="md" fontWeight="semibold" minH={12} as="h4" lineHeight="tight">
                {product.pName}
              </Box>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              <Box
                fontSize="xl"
                fontWeight={"bold"}
                color={useColorModeValue("red.500", "red.400")}
              >
                {product.priceCurrent
                  ? product.priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : 0}
                <Box as="span" color={useColorModeValue("gray.700", "gray.200")} fontSize="lg">
                  {" "}
                  RON
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Link>
    </Flex>
  );
};

export default SearchItem;
