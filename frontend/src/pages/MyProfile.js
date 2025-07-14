import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Divider,
  Badge,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  useToast,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useUser } from "../context/UserContext";
import axios from "axios";

const MyProfile = () => {
  const { loggedInUser, setLoggedInUser } = useUser();
  console.log("loggedInUser", loggedInUser);
  console.log("setLoggedInUser", setLoggedInUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(loggedInUser || {});
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);
  const toast = useToast();

  if (!loggedInUser) return <Text>Loading...</Text>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "avatar") setAvatar(file);
    if (type === "resume") setResume(file);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (avatar) formData.append("avatar", avatar);
      if (resume) formData.append("resume", resume);

      const res = await axios.put(
        `/api/v1/users/${loggedInUser._id}`,
        formData
      );
      toast({ title: "Profile updated!", status: "success", duration: 3000 });
      setEditMode(false);
      setLoggedInUser(res.data.user);
    } catch (err) {
      toast({ title: "Update failed", status: "error", duration: 3000 });
    }
  };

  return (
    <Box maxW="4xl" mx="auto" p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">My Profile</Heading>
        <Flex align="center" gap={4}>
          <Avatar
            name={form.name}
            src={avatar ? URL.createObjectURL(avatar) : "/profile.png"}
            size="xl"
          />
          {editMode && (
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, "avatar")}
            />
          )}
        </Flex>
      </Flex>

      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            isReadOnly={!editMode}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            isReadOnly={!editMode}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            isReadOnly={!editMode}
          />
        </FormControl>
        <Box>
          <Text fontWeight="bold">Role:</Text>
          <Badge colorScheme="teal">{form.role}</Badge>
        </Box>
        <FormControl>
          <FormLabel>Joining Date</FormLabel>
          <Input
            name="joiningDate"
            type="date"
            value={form.joiningDate || ""}
            onChange={handleChange}
            isReadOnly={!editMode}
          />
        </FormControl>

        {editMode && (
          <FormControl>
            <FormLabel>Resume Upload</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, "resume")}
            />
          </FormControl>
        )}
      </Stack>

      <Divider my={6} />

      <Flex gap={4}>
        <Button
          colorScheme={editMode ? "green" : "blue"}
          onClick={editMode ? handleSave : () => setEditMode(true)}
        >
          {editMode ? <CheckIcon mr={2} /> : <EditIcon mr={2} />}{" "}
          {editMode ? "Save Changes" : "Edit Profile"}
        </Button>
        {editMode && (
          <Button variant="ghost" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default MyProfile;
