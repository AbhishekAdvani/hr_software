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
import { useUser } from "../context/UserContext"; // <-- 👈 Import context
import { useNavigate } from "react-router-dom"; // <-- 👈 To redirect after login

const LoginPage = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();
  const { login } = useUser(); // 👈 Hook into login
  const navigate = useNavigate(); // 👈 React Router navigation

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast({
        title: "Missing Fields",
        description: "Email and Password are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    const result = await login(form.email, form.password); // 👈 Call login

    if (result.success) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/"); // redirect to dashboard or homepage
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.100">
      <Flex
        w={{ base: "100%", md: "90%", lg: "80%" }}
        maxW="6xl"
        height="auto"
        boxShadow="2xl"
        rounded="2xl"
        overflow="hidden"
        bg="white"
        flexDir={{ base: "column", md: "row" }}
      >
        {/* Left Bubble */}
        <Flex
          bgColor="#0B4885"
          color="white"
          flex="1"
          p={10}
          direction="column"
          justify="center"
          align="center"
        >
          <Image src="/image.png" boxSize="80px" mb={4} alt="TechinvoPeople" />
          <Heading fontSize="2xl" mb={2}>
            Welcome to TechinvoPeople
          </Heading>
          <Text fontSize="sm" textAlign="center">
            Empower your HR with smart attendance, automation, and insights.
          </Text>
        </Flex>

        {/* Right Bubble */}
        <Box flex="1" bg="white" p={{ base: 8, md: 12 }}>
          <Stack spacing={6}>
            <Stack spacing={2} align="center">
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
