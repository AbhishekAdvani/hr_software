// Modern & Fun ClockPunchSection Component
import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  useToast,
  Badge,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt, FaClock } from "react-icons/fa";

export default function ClockPunchSection({
  onPunch,
  entries = [],
  selectedId = "",
  setEntries,
}) {
  const toast = useToast();
  const bgCard = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const highlight = useColorModeValue("teal.500", "teal.300");

  const handlePunch = (type) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM

    if (!selectedId) {
      toast({
        title: "Select an employee",
        description: "Please select an employee before punching.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const index = entries.findIndex(
      (entry) => entry.id === selectedId && entry.date === today
    );

    if (type === "In") {
      if (index > -1) {
        toast({
          title: "Already Punched In",
          description: "This employee has already punched in today.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const newEntry = {
          id: selectedId,
          name: selectedId,
          date: today,
          clockIn: time,
          clockOut: "",
          client: "",
          location: "",
          project: "",
          deviceId: "",
        };
        setEntries([...entries, newEntry]);
        toast({
          title: "Clocked In",
          description: `You have successfully punched in at ${time}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } else if (type === "Out") {
      if (index === -1) {
        toast({
          title: "No Check-In Found",
          description: "This employee hasn't punched in yet.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const updated = [...entries];
        updated[index].clockOut = time;
        setEntries(updated);
        toast({
          title: "Clocked Out",
          description: `Successfully punched out at ${time}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      bg={bgCard}
      p={6}
      borderRadius="2xl"
      boxShadow="xl"
      border="1px solid"
      borderColor={borderColor}
      mb={6}
      transition="all 0.3s ease"
      _hover={{ boxShadow: "2xl", transform: "scale(1.01)" }}
    >
      <Flex justify="space-between" align="center" wrap="wrap">
        <VStack align="start" spacing={2} mb={{ base: 4, md: 0 }}>
          <HStack spacing={2}>
            <Icon as={FaClock} boxSize={6} color={highlight} />
            <Text fontSize="xl" fontWeight="bold">
              Clock Punch
            </Text>
            <Badge colorScheme="purple" fontSize="0.8em">
              Live
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            Keep track of your check-in & check-out times — just tap a button!
            🚀
          </Text>
        </VStack>

        <HStack spacing={4}>
          <Tooltip label="Start your workday" hasArrow>
            <Button
              leftIcon={<Icon as={FaSignInAlt} />}
              colorScheme="green"
              variant="solid"
              onClick={() => handlePunch("In")}
              size="md"
              rounded="full"
              px={6}
            >
              Punch In
            </Button>
          </Tooltip>

          <Tooltip label="Wrap up and clock out" hasArrow>
            <Button
              leftIcon={<Icon as={FaSignOutAlt} />}
              colorScheme="red"
              variant="ghost"
              onClick={() => handlePunch("Out")}
              size="md"
              rounded="full"
              px={6}
              border="2px"
              borderColor="red.400"
              _hover={{ bg: "red.50" }}
            >
              Punch Out
            </Button>
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  );
}

// Usage in App.js
// import ClockPunchSection from "./components/ClockPunchSection";

// <ClockPunchSection
//   onPunch={(type) => console.log("User punched:", type)}
//   entries={entries}
//   setEntries={setEntries}
//   selectedId={selectedId}
// />
