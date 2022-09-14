import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/future/image";
import NextLink from "next/link";
import full_logo from "public/images/full_logo.svg";
import { NAV_ITEMS } from "src/data/navItems";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="nav"
      bg={useColorModeValue("gray.50", "gray.900")}
      // backdropFilter="auto"
      // backdropBlur="20px"
      px={6}
      top="0"
      position="sticky"
      boxShadow="md"
      zIndex={"sticky"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon w={4} h={4} mb={0.5} /> : <HamburgerIcon w={6} h={6} />}
          aria-label={"Open Menu"}
          variant={"outline"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={6} alignItems={"center"}>
          <Box>
            <Image src={full_logo} alt="Pretz Logo" />
          </Box>
          <HStack as={"nav"} spacing={6} display={{ base: "none", md: "flex" }}>
            {NAV_ITEMS.map((navItem) => (
              <NextLink key={navItem.label} href={navItem.href} passHref>
                <Link variant={"primary"}>{navItem.label}</Link>
              </NextLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} mx={6} colorScheme="brand" variant="outline">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Not implemented yet</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Mobile dropdown */}
      <Box display={{ md: "none" }}>
        <Collapse in={isOpen} animateOpacity>
          <Stack as={"nav"} spacing={6} pt={2} pb={6}>
            {NAV_ITEMS.map((navItem) => (
              <NextLink key={navItem.label} href={navItem.href} passHref>
                <Link variant={"primary"}>{navItem.label}</Link>
              </NextLink>
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Header;
