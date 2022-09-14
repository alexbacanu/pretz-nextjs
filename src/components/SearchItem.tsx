import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "next/future/image";
import { definitions } from "src/lib/types/supabase";

interface Props {
  product: definitions["products"];
}

const SearchItem: React.FC<Props> = ({ product }) => {
  return (
    <Flex p={1} pb={6} w="full" alignItems="center" justifyContent="center">
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
        />

        <Box p="2">
          <Flex justifyContent="space-between" alignContent="center" noOfLines={2}>
            <Box fontSize="md" fontWeight="semibold" as="h4" lineHeight="tight">
              {product.pName}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="xl" fontWeight={"bold"} color={useColorModeValue("red.500", "red.400")}>
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
    </Flex>
  );
};

export default SearchItem;
