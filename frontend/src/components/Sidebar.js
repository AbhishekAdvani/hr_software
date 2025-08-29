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
  BsShieldCheck,
  BsStickies,
  BsGear,
} from "react-icons/bs";

const navItems = [
  { label: "Ticketing", to: "/Ticketing", icon: BsStickies },
  { label: "Clock Punch", to: "/clockin", icon: BsCalendarCheck },
  { label: "Schedule", to: "/schedule", icon: BsClockHistory },
  { label: "Pay", to: "/pay", icon: BsCreditCard },
  { label: "Benefits", to: "/benefits", icon: BsShieldCheck },
  { label: "Settings", to: "/settings", icon: BsGear },
];

const Sidebar = () => {
  const location = useLocation();

  // Light/Dark adaptive values
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderClr = useColorModeValue("gray.200", "gray.700");
  const activeBg = useColorModeValue("teal.100", "teal.600");
  const activeColor = useColorModeValue("teal.700", "white");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const footerColor = useColorModeValue("gray.500", "gray.500");

  return (
    <Box
      w="min-content"
      h="100vh"
      bg={bg}
      borderRight="1px solid"
      borderColor={borderClr}
      py={6}
      px={4}
      position="fixed"
      boxShadow="sm"
      minW="min-content"
      overflowX="hidden"
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
              color={isActive ? activeColor : textColor}
              _hover={{
                bg: hoverBg,
              }}
              size="sm"
              borderRadius="md"
            >
              {item.label}
            </Button>
          );
        })}
      </VStack>

      <Divider my={6} borderColor={borderClr} />

      <Text fontSize="xs" color={footerColor}>
        © {new Date().getFullYear()} Technivo People
      </Text>
    </Box>
  );
};

export default Sidebar;
