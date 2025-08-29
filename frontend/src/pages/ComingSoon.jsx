// src/pages/ComingSoon.jsx
import React from "react";
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";

export default function ComingSoon() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      p={6}
      direction="column"
    >
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        shadow="xl"
        textAlign="center"
        maxW="600px"
      >
        {/* Coming Soon Image */}
        <Image
          src="/comingsoon.png" // save your image in public/coming-soon.png
          alt="Coming Soon Technivo People"
          mb={6}
          borderRadius="lg"
        />

        {/* Heading */}
        <Heading size="xl" mb={3} color="orange.500">
          Coming Soon
        </Heading>

        <Text fontSize="lg" color="gray.600" mb={6}>
          Something exciting is on the way for <b>Technivo People</b>. Stay
          tuned and be the first to know when we launch!
        </Text>

        {/* Notify Button */}
        <Button
          colorScheme="orange"
          size="lg"
          px={10}
          rounded="full"
          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
        >
          Notify Me
        </Button>
      </Box>
    </Flex>
  );
}
