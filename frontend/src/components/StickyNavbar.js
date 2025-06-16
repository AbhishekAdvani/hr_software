import React from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

const Links = [
  { label: "Dashboard", href: "/", disabled: true },
  { label: "Attendance", href: "/attendance", disabled: true },
  { label: "Reports", href: "/reports", disabled: true },
  { label: "Settings", href: "/settings", disabled: false },
];

const NavLink = ({ label, href, disabled }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
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
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            }
      }
      href={disabled ? undefined : href}
      pointerEvents={disabled ? "none" : "auto"}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      opacity={disabled ? 0.6 : 1}
      cursor={disabled ? "not-allowed" : "pointer"}
    >
      {label}
    </Link>
  );
};

const StickyNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="999"
      bg={useColorModeValue("white", "gray.900")}
      px={4}
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex align="center" gap={2}>
          <Image
            src="/image.png" // replace with your actual logo path or URL
            alt="Expound HR Logo"
            boxSize="32px"
            objectFit="contain"
          />
          <Text fontWeight="bold" fontSize="lg" color="teal.600">
            TechinvoPeople{" "}
          </Text>
        </Flex>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={2}>
            {Links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default StickyNavbar;
