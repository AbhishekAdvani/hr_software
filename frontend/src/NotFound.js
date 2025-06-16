import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

const NotFound = () => (
  <Box textAlign="center" py={10} px={6}>
    <Image
      src="https://cdn.vectorstock.com/i/500p/81/59/404-error-page-not-found-vector-51588159.jpg"
      alt="Page Not Found"
      width="auto"
      height="300px"
      mx="auto"
      mb={4}
    />
    <Text fontSize="2xl" fontWeight="bold" mb={2}>
      Page Not Found
    </Text>
    <Text color="gray.500">
      Sorry, the page you are looking for does not exist.
    </Text>
  </Box>
);

export default NotFound;
