import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { convertToNumber } from "src/lib/utils/convertToNumber";

interface Props {}

const SearchForm = (props: Props) => {
  const router = useRouter();
  const { query } = router;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const path = router.pathname;
    const { query } = router;
    Object.entries(values).forEach(([key, value]) => {
      if (value !== "" || value !== undefined) {
        query[key] = value as string;
      }
    });

    router.push({ pathname: path, query: query });
  };

  const minValue = 0;
  const maxValue = 999999;

  const [values, setValues] = useState({
    name: "",
    category: "",
    minPrice: minValue,
    maxPrice: maxValue,
    minReviews: 0,
    minStars: 0,
  });

  const { name, category, minPrice, maxPrice, minReviews, minStars } = values;

  useEffect(() => {
    const { query } = router;

    const minValue = 0;
    const maxValue = 999999;

    setValues({
      name: (query.name as string) || "",
      category: (query.category as string) || "",
      minPrice: convertToNumber(query?.minPrice as string) || minValue,
      maxPrice: convertToNumber(query?.maxPrice as string) || maxValue,
      minReviews: convertToNumber(query?.minReviews as string) || 0,
      minStars: convertToNumber(query?.minStars as string) || 0,
    });
  }, [
    query?.name,
    query?.category,
    query?.minPrice,
    query?.maxPrice,
    query?.minReviews,
    query?.minStars,
    router,
  ]);

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
          <FormControl id="name">
            <FormLabel fontWeight="bold">Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Search any product"
              _placeholder={{ color: useColorModeValue("gray.900", "gray.100") }}
              autoComplete="off"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="category">
            <FormLabel fontWeight="bold">Category</FormLabel>
            <Input
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="Select any category"
              _placeholder={{ color: useColorModeValue("gray.900", "gray.100") }}
              autoComplete="off"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel fontWeight="bold">Price</FormLabel>
            <Text>{`${minPrice} RON - ${maxPrice} RON`}</Text>
            <RangeSlider
              //   aria-label={["Min price", "Max price"]}
              min={minValue}
              max={maxValue}
              step={50}
              onChangeEnd={(val) => {
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
            <FormLabel fontWeight="bold">Reviews</FormLabel>
            <Text>{`${minReviews.toLocaleString()}`}</Text>
            <Slider
              aria-label="Reviews"
              onChangeEnd={(val) => {
                setValues({
                  ...values,
                  minReviews: val,
                });
              }}
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
