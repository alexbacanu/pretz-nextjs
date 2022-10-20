import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Product } from "src/lib/types/mongodb";
import GraphFull from "./GraphFull";

type ProductsDetailsProps = {
  product: Product;
};

const ProductDetails: React.FC<ProductsDetailsProps> = ({ product }) => {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.pName}
            </Heading>
            <VStack align={"flex-start"}>
              {/* Reviews */}
              <Box display="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon key={i} color={i < product.pStars! ? "teal.500" : "gray.300"} />
                  ))}
                <Text as="span" ml="2" color="gray.600" fontSize="sm">
                  {product.pReviews} reviews
                </Text>
              </Box>

              {/* Price */}
              <Text
                color={useColorModeValue("red.500", "red.400")}
                fontWeight={400}
                fontSize={"2xl"}
              >
                {product.priceCurrent} RON
              </Text>
            </VStack>
          </Box>
          <GraphFull timeseries={product.timeseries ? product.timeseries : {}} />
        </Stack>
        <Flex justifyContent={"center"}>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={product.pImg}
            fit={"cover"}
            align={"center"}
            w={"400px"}
            h={{ base: "300px", sm: "350px", lg: "400px" }}
          />
        </Flex>
      </SimpleGrid>
      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={"column"}
        divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
      >
        <Box>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={useColorModeValue("yellow.500", "yellow.300")}
            fontWeight={"500"}
            textTransform={"uppercase"}
            mb={"4"}
          >
            Stores
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <List spacing={2} pb={5}>
              <ListItem>Chronograph</ListItem>
              <ListItem>Master Chronometer Certified</ListItem> <ListItem>Tachymeter</ListItem>
              <ListItem>Anti‑magnetic</ListItem>
              <ListItem>Chronometer</ListItem>
              <ListItem>Small seconds</ListItem>
            </List>
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProductDetails;
