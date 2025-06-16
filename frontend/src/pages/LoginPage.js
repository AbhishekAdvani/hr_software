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
import { FaUserLock } from "react-icons/fa";

const LoginPage = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = () => {
    if (!form.email || !form.password) {
      return toast({
        title: "Missing Fields",
        description: "Email and Password are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    // Replace with your login logic (API call)
    console.log("Logging in:", form);
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
        {/* Left Side */}
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
            src="/image.png" // Replace with your logo path
            boxSize="80px"
            mb={4}
            alt="TechinvoPeople"
          />
          <Heading fontSize="2xl" mb={2}>
            Welcome to TechinvoPeople
          </Heading>
          <Text fontSize="sm" textAlign="center">
            Empower your HR with smart attendance, automation, and insights.
          </Text>
        </Flex>

        {/* Right Side Form */}
        <Box flex="1" p={{ base: 6, md: 10 }}>
          <Stack spacing={5}>
            <Stack spacing={1} align="center">
              <Icon as={FaUserLock} boxSize={7} color="teal.500" />
              <Heading size="md" color="teal.600">
                Login to your account
              </Heading>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Enter your credentials to continue
              </Text>
            </Stack>

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

            <Button colorScheme="teal" onClick={handleLogin}>
              Login
            </Button>

            <Text fontSize="sm" textAlign="center">
              Don’t have an account?{" "}
              <Link color="teal.500" fontWeight="medium" onClick={onSwitch}>
                Sign up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
