import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Input,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  IconButton,
  Badge,
  Select,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { loggedInUser, setLoggedInUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
    phone: loggedInUser?.phone || "",
    password: "",
    role: loggedInUser?.role || "Employee",
    country: loggedInUser?.country || "India",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setLoggedInUser({
      ...loggedInUser,
      name: form.name,
      email: form.email,
      phone: form.phone,
    });
    setEditMode(false);
  };

  const menuItems = [
    "My Profile",
    "Payslips",
    "Leave History",
    "Salary Structure",
    "Settings",
    "Notifications",
  ];

  return (
    <Flex bg="#f9f9f9" minH="100vh" px={1}>
      {/* Sidebar */}
      <Box
        w="250px"
        bg="white"
        borderRight="1px solid #e2e8f0"
        pt={6}
        px={4}
        minH="100vh"
      >
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          variant="ghost"
          aria-label="Back"
          mb={6}
        />

        <VStack spacing={2} align="stretch">
          {menuItems.map((item) => (
            <Box
              key={item}
              px={4}
              py={2}
              cursor="pointer"
              bg={selectedMenu === item ? "orange.50" : "transparent"}
              color={selectedMenu === item ? "orange.500" : "gray.700"}
              fontWeight={selectedMenu === item ? "bold" : "normal"}
              borderRadius="md"
              _hover={{
                bg: "orange.50",
                color: "orange.500",
              }}
              onClick={() => setSelectedMenu(item)}
            >
              <Flex justify="space-between" align="center">
                <Text>{item}</Text>
                {item === "Notifications" && (
                  <Badge colorScheme="green" borderRadius="full" fontSize="xs">
                    ●
                  </Badge>
                )}
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={10}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md">My Profile</Heading>
          {!editMode ? (
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          ) : (
            <HStack>
              <Button variant="ghost" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={handleSave}>
                Save
              </Button>
            </HStack>
          )}
        </Flex>

        <Text color="gray.500" fontSize="sm" mb={6}>
          View and update your personal information.
        </Text>

        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          p={8}
          maxW="800px"
          mx="auto"
        >
          <Text fontWeight="semibold" mb={2}>
            Profile Photo
          </Text>
          <Flex align="center" gap={4} mb={6}>
            <Avatar name={form.name} size="xl" />
            <Stack direction="row">
              <Button size="sm" colorScheme="gray" isDisabled>
                Change
              </Button>
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                aria-label="Delete"
                isDisabled
              />
            </Stack>
          </Flex>

          <FormControl mb={4} isDisabled={!editMode}>
            <FormLabel>Full Name</FormLabel>
            <Input name="name" value={form.name} onChange={handleChange} />
          </FormControl>

          <FormControl mb={4} isDisabled={!editMode}>
            <FormLabel>Email ID</FormLabel>
            <Input name="email" value={form.email} onChange={handleChange} />
          </FormControl>

          <FormControl mb={4} isDisabled={!editMode}>
            <FormLabel>Phone Number</FormLabel>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </FormControl>

          <FormControl mb={6} isDisabled={!editMode}>
            <FormLabel>Change Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={4} isDisabled>
            <FormLabel>Role</FormLabel>
            <Input value={form.role} isReadOnly />
          </FormControl>
        </Box>
      </Box>
    </Flex>
  );
};

export default MyProfile;
