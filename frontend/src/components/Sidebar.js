import React from "react";
import {
  VStack,
  Button,
  Box,
  Text,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
  BsCalendarCheck,
  BsClockHistory,
  BsCreditCard,
  BsCurrencyDollar,
  BsGear,
  BsHeart,
  BsShieldCheck,
} from "react-icons/bs";

const navItems = [
  { label: "Clock Punch", to: "/clockin", icon: BsCalendarCheck },
  { label: "Schedule", to: "/schedule", icon: BsClockHistory },
  { label: "Pay", to: "/pay", icon: BsCreditCard },
  { label: "Benefits", to: "/benefits", icon: BsShieldCheck },
  { label: "Settings", to: "/settings", icon: BsGear },
];

const Sidebar = () => {
  const location = useLocation();
  const bg = useColorModeValue("gray.50", "gray.800");
  const activeBg = useColorModeValue("teal.100", "teal.600");

  return (
    <Box
      w="220px"
      h="100vh"
      bg={bg}
      borderRight="1px solid"
      borderColor="gray.200"
      py={6}
      px={4}
      position="fixed"
      boxShadow="sm"
    >
      <VStack spacing={2} align="stretch">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Button
              key={item.to}
              as={Link}
              to={item.to}
              justifyContent="flex-start"
              leftIcon={<Icon as={item.icon} />}
              variant="ghost"
              fontWeight="medium"
              bg={isActive ? activeBg : "transparent"}
              color={isActive ? "teal.700" : "gray.700"}
              _hover={{
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              size="sm"
              borderRadius="md"
            >
              {item.label}
            </Button>
          );
        })}
      </VStack>

      <Divider my={6} />

      <Text fontSize="xs" color="gray.500">
        © {new Date().getFullYear()} Expound Technivo
      </Text>
    </Box>
  );
};

export default Sidebar;
