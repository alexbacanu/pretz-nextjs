import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Box as="main" flex="1 0 auto" minHeight="800px">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
