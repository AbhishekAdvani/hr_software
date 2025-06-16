import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Link,
  useToast,
  Icon,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

const SignupPage = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const toast = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = () => {
    if (!form.email || !form.password || !form.name) {
      return toast({
        title: "Missing Fields",
        description: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    // Replace with your signup logic (API call)
    console.log("Signing up:", form);
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.50">
      <Flex
        w={{ base: "100%", md: "80%", lg: "100%" }}
        maxW="full"
        height="full"
        boxShadow="lg"
        rounded="lg"
        overflow="hidden"
        bg="white"
      >
        {/* Left Side Form */}
        <Box flex="1" p={{ base: 6, md: 10 }}>
          <Stack spacing={5}>
            <Stack spacing={1} align="center">
              <Icon as={FaUserPlus} boxSize={7} color="teal.500" />
              <Heading size="md" color="teal.600">
                Create an Account
              </Heading>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Fill in the details to register
              </Text>
            </Stack>

            <FormControl>
              <FormLabel fontSize="sm">Full Name</FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Email</FormLabel>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </FormControl>

            <Button colorScheme="teal" onClick={handleSignup}>
              Sign Up
            </Button>

            <Text fontSize="sm" textAlign="center">
              Already have an account?{" "}
              <Link color="teal.500" fontWeight="medium" onClick={onSwitch}>
                Login
              </Link>
            </Text>
          </Stack>
        </Box>

        {/* Right Side */}
        <Flex
          bgColor="#0B4885"
          color="white"
          flex="1"
          p={10}
          direction="column"
          justify="center"
          align="center"
        >
          <Image
            src="/image.png" // Replace with your actual image path
            boxSize="80px"
            mb={4}
            alt="TechinvoPeople"
          />
          <Heading fontSize="2xl" mb={2}>
            Welcome to TechinvoPeople
          </Heading>
          <Text fontSize="sm" textAlign="center">
            Your smart HRMS solution starts here. Sign up and streamline your
            HR.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
