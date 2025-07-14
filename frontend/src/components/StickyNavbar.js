import React, { useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionLink = motion(Link);

const Links = [
  { label: "Dashboard", href: "/Dashboard", disabled: false },
  { label: "Attendance", href: "/attendance", disabled: true },
  { label: "Reports", href: "/reports", disabled: true },
  { label: "Settings", href: "/settings", disabled: false },
];

const NavLink = ({ label, href, disabled, onNavigate }) => {
  const isActive = location.pathname === href;

  return (
    <MotionLink
      whileHover={!disabled ? { scale: 1.05 } : {}}
      transition={{ duration: 0.2 }}
      px={4}
      py={2}
      rounded="full"
      fontWeight="medium"
      fontSize="sm"
      bg={isActive ? "teal.100" : "transparent"}
      color={
        disabled
          ? "gray.400"
          : isActive
          ? "teal.700"
          : useColorModeValue("gray.600", "gray.300")
      }
      _hover={
        disabled
          ? {}
          : {
              textDecoration: "none",
              bg: "teal.200",
              transition: "all 0.2s ease-in-out",
            }
      }
      href={disabled ? undefined : href}
      pointerEvents={disabled ? "none" : "auto"}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      opacity={disabled ? 0.6 : 1}
      cursor={disabled ? "not-allowed" : "pointer"}
      onClick={onNavigate}
    >
      {label}
    </MotionLink>
  );
};

const StickyNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onClose(); // Auto-close mobile nav
  }, [location.pathname]);

  const handleLogout = () => {
    // Add auth cleanup here if needed
    navigate("/login");
  };

  const handleMyProfile = () => {
    // Add auth cleanup here if needed
    navigate("/MyProfile");
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="999"
      bg={useColorModeValue("whiteAlpha.800", "gray.800")}
      px={4}
      backdropFilter="saturate(180%) blur(12px)"
      boxShadow="sm"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Flex align="center" gap={3}>
          <Image src="/image.png" alt="TechinvoPeople" boxSize="36px" />
          <Text
            fontWeight="bold"
            fontSize="lg"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
          >
            TechinvoPeople
          </Text>
        </Flex>

        {/* Desktop Nav */}
        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </HStack>

        <Flex align="center" gap={4}>
          {/* Notification Bell */}
          <IconButton
            icon={<BellIcon />}
            variant="ghost"
            aria-label="Notifications"
            size="md"
          />

          {/* Profile Menu */}
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="Abhishek Advani" src="/profile.png" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>

          {/* Hamburger */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle Navigation"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
          />
        </Flex>
      </Flex>

      {/* Mobile Nav */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={2}>
            {Links.map((link) => (
              <NavLink key={link.label} {...link} onNavigate={onClose} />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default StickyNavbar;
