import {
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import {
  TbArrowDownCircle,
  TbArrowUpCircle,
  TbCurrencyDollar,
  TbDiscount2,
  TbDotsVertical,
  TbList,
} from "react-icons/tb";

interface Props {}

const SearchSort = (props: Props) => {
  return (
    <Flex justifyContent="center">
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={<TbDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<TbList />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="md"
              >
                Default
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<TbArrowUpCircle />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="md"
              >
                Price ascending
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<TbArrowDownCircle />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="md"
              >
                Price descending
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<TbDiscount2 />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="md"
              >
                Discount (%)
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<TbCurrencyDollar />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="md"
              >
                Discount (RON)
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default SearchSort;
