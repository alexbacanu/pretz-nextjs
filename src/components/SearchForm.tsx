import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Product } from "src/lib/types/mongodb";

interface SearchFormProps {
  products: Product[];
  prices: number[];
  stars: number;
  reviews: number;
}

const SearchForm: React.FC<SearchFormProps> = ({ products, prices, stars, reviews }) => {
  const { query, pathname, push, replace, asPath } = useRouter();

  const minValue = prices[0];
  const maxValue = prices[1];
  const maxStars = stars;
  const maxReviews = reviews;

  const [values, setValues] = useState({
    minPrice: Number(query.minPrice) || minValue,
    maxPrice: Number(query.maxPrice) || maxValue,
    minReviews: Number(query.minReviews) || 0,
    minStars: Number(query.minStars) || 0,
  });

  const { minPrice, maxPrice, minReviews, minStars } = values;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.entries(values).forEach(([key, value]) => {
      if (typeof value !== "number") return;

      if (value !== undefined) {
        query[key] = value.toString();
      }
    });

    replace({ pathname, query });
  };

  return (
    <Box
      borderWidth={1}
      rounded="md"
      shadow={"lg"}
      position="sticky"
      top={20}
      my={16}
      py={6}
      mx="auto"
    >
      <form onSubmit={handleSubmit}>
        <VStack mx={6} spacing={2}>
          <FormControl id="price">
            <FormLabel fontWeight="bold">Price</FormLabel>
            <Text>{`${minPrice} RON - ${maxPrice} RON`}</Text>
            <RangeSlider
              min={minValue}
              max={maxValue}
              step={50}
              onChange={(val) => {
                setValues({
                  ...values,
                  minPrice: val[0],
                  maxPrice: val[1],
                });
              }}
              defaultValue={[minPrice, maxPrice]}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </FormControl>

          <FormControl id="reviews">
            <FormLabel fontWeight="bold">Product reviews</FormLabel>
            <Text>{`${minReviews.toLocaleString()}`}</Text>
            <Slider
              aria-label="Product reviews"
              onChange={(val) => {
                setValues({
                  ...values,
                  minReviews: val,
                });
              }}
              max={maxReviews}
              value={minReviews}
              defaultValue={0}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={4}>
                <Box color={"orange"} as={AiFillStar} />
              </SliderThumb>
            </Slider>
          </FormControl>

          <FormControl id="stars">
            <FormLabel fontWeight="bold">Product stars</FormLabel>
            <Text>{`${minStars.toLocaleString()}`}</Text>
            <Slider
              aria-label="Product stars"
              onChange={(val) => {
                setValues({
                  ...values,
                  minStars: val,
                });
              }}
              max={maxStars}
              value={minStars}
              defaultValue={0}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={4}>
                <Box color={"orange"} as={AiFillStar} />
              </SliderThumb>
            </Slider>
          </FormControl>

          <Button width="full" mt={4} type="submit" variant="primary">
            Search
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SearchForm;
