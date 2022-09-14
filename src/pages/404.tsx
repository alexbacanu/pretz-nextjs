import { Box, Button, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" as="h2" size="2xl">
        404
      </Heading>
      <Text fontSize="18px" mt={4} mb={2}>
        Page Not Found
      </Text>
      <Text color={useColorModeValue("gray.700", "gray.200")} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Button colorScheme="brand" variant="outline">
        Go to Home
      </Button>
    </Box>
  );
}
