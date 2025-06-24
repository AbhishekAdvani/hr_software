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
  Badge,
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

    console.log("Signing up:", form);
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.100">
      <Flex
        w={{ base: "100%", md: "90%", lg: "80%" }}
        maxW="6xl"
        boxShadow="2xl"
        rounded="2xl"
        overflow="hidden"
        bg="white"
        flexDir={{ base: "column", md: "row" }}
      >
        {/* Left Side: Branding (consistent) */}
        <Flex
          bgColor="#0B4885"
          color="white"
          flex="1"
          p={10}
          direction="column"
          justify="center"
          align="center"
          borderTopLeftRadius={{ base: "2xl", md: "2xl" }}
          borderBottomLeftRadius={{ base: "2xl", md: "2xl" }}
        >
          <Image src="/image.png" boxSize="80px" mb={4} alt="TechinvoPeople" />
          <Heading fontSize="2xl" mb={2} textAlign="center">
            Join TechinvoPeople
          </Heading>
          <Text fontSize="sm" textAlign="center">
            Register to access powerful HR automation and insights.
          </Text>
        </Flex>

        {/* Right Side: Sign Up Form */}
        <Box
          flex="1"
          p={{ base: 8, md: 12 }}
          bg="gray.50"
          rounded={{ base: "2xl", md: "2xl" }}
        >
          <Stack spacing={6}>
            <Stack spacing={1} align="center">
              <Icon as={FaUserPlus} boxSize={7} color="teal.500" />
              <Heading size="md" color="teal.600">
                Sign Up
              </Heading>
              <Badge colorScheme="teal" fontSize="0.7em">
                New User Registration
              </Badge>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Fill in the details below to create your account
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
              Create Account
            </Button>

            <Text fontSize="sm" textAlign="center">
              Already registered?{" "}
              <Link color="teal.500" fontWeight="medium" onClick={onSwitch}>
                Login here
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SignupPage;
