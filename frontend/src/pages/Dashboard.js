import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Icon,
  Avatar,
  Badge,
  Button,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import {
  FaUserCheck,
  FaUmbrellaBeach,
  FaCalendarDay,
  FaFileInvoiceDollar,
  FaCalendarPlus,
  FaRegClock,
  FaFileAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

const KPIBox = ({ icon, label, value, helpText, color }) => {
  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const glassBg = useColorModeValue(`${color}.50`, `${color}.700`);
  const borderClr = useColorModeValue(`${color}.100`, `${color}.600`);
  const borderHover = useColorModeValue(`${color}.200`, `${color}.500`);
  const labelClr = useColorModeValue("gray.500", "gray.400");
  const valueClr = useColorModeValue("gray.700", "whiteAlpha.900");
  const helpClr = useColorModeValue("gray.400", "gray.500");

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      p={5}
      shadow="lg"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={borderClr}
      transition="all 0.3s ease"
      _hover={{
        boxShadow: `0 6px 20px rgba(0, 0, 0, 0.1)`,
        cursor: "pointer",
        borderColor: borderHover,
      }}
    >
      <Flex align="center" gap={4}>
        <Box bg={glassBg} color={`${color}.600`} p={3} borderRadius="full">
          <Icon as={icon} boxSize={6} />
        </Box>
        <Stat>
          <StatLabel fontSize="sm" color={labelClr}>
            {label}
          </StatLabel>
          <StatNumber fontSize="xl" color={valueClr}>
            {value}
          </StatNumber>
          <StatHelpText color={helpClr}>{helpText}</StatHelpText>
        </Stat>
      </Flex>
    </Box>
  );
};

const ShortcutButton = ({ label, icon, colorScheme }) => (
  <Button
    leftIcon={<Icon as={icon} />}
    colorScheme={colorScheme}
    variant="outline"
    borderRadius="xl"
    size="sm"
    w="100%"
  >
    {label}
  </Button>
);

const UserDashboard = () => {
  const { loggedInUser } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const boxBg = useColorModeValue("white", "gray.800");
  const borderClr = useColorModeValue("gray.100", "gray.700");
  const headingClr = useColorModeValue("gray.800", "whiteAlpha.900");
  const subTextClr = useColorModeValue("gray.500", "gray.400");

  return (
    <Box p={{ base: 4, md: 4 }} minH="100vh">
      {/* Top Section */}
      <Flex
        justify="space-between"
        align="center"
        mb={10}
        flexDir={{ base: "column", md: "row" }}
        gap={6}
      >
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading size="lg" color={headingClr}>
            {getGreeting()}, {loggedInUser?.name || "User"} 👋
          </Heading>
          <Text fontSize="sm" color={subTextClr} mt={1}>
            Here's your personalized HR dashboard
          </Text>
        </Box>
        <Flex align="center" gap={4}>
          <Badge
            colorScheme="green"
            fontSize="0.8em"
            px={3}
            py={1}
            borderRadius="full"
          >
            Present Today
          </Badge>
          <Avatar
            name={loggedInUser?.name || "User"}
            size="sm"
            src="/profile.png"
          />
        </Flex>
      </Flex>

      {/* KPI Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        mb={10}
      >
        <KPIBox
          icon={FaUserCheck}
          label="Attendance"
          value="✔ Present"
          helpText="Clocked in at 9:32 AM"
          color="teal"
        />
        <KPIBox
          icon={FaUmbrellaBeach}
          label="Leaves Remaining"
          value="7"
          helpText="Annual | 3 Casual"
          color="orange"
        />
        <KPIBox
          icon={FaCalendarDay}
          label="Next Holiday"
          value="Jul 17"
          helpText="Bakrid - Wednesday"
          color="blue"
        />
        <KPIBox
          icon={FaFileInvoiceDollar}
          label="Latest Payslip"
          value="₹56,700"
          helpText="May 2025"
          color="purple"
        />
        <KPIBox
          icon={FaRegClock}
          label="Punch In Time"
          value="09:32 AM"
          helpText="Today"
          color="green"
        />
        <KPIBox
          icon={FaRegClock}
          label="Punch Out Time"
          value="—"
          helpText="Not yet punched out"
          color="red"
        />
        <KPIBox
          icon={FaRegClock}
          label="Total Hours Worked"
          value="6h 42m"
          helpText="Today"
          color="teal"
        />
        <KPIBox
          icon={FaCalendarPlus}
          label="Pending Leave Requests"
          value="2"
          helpText="Awaiting approval"
          color="orange"
        />
        <KPIBox
          icon={FaCalendarPlus}
          label="Approved Leaves"
          value="5"
          helpText="This year"
          color="green"
        />
        <KPIBox
          icon={FaFileAlt}
          label="Overtime (This Month)"
          value="11 hrs"
          helpText="Across 5 days"
          color="blue"
        />
        <KPIBox
          icon={FaEnvelopeOpenText}
          label="Tasks Assigned"
          value="4"
          helpText="Today"
          color="pink"
        />
        <KPIBox
          icon={FaEnvelopeOpenText}
          label="Tasks Completed"
          value="3"
          helpText="Today"
          color="purple"
        />
        <KPIBox
          icon={FaCalendarDay}
          label="Next Evaluation"
          value="Aug 5, 2025"
          helpText="Performance cycle"
          color="gray"
        />
        <KPIBox
          icon={FaCalendarDay}
          label="Birthdays This Month"
          value="3"
          helpText="Teammates"
          color="cyan"
        />
      </Grid>

      {/* Sections (Shortcuts, Events, etc.) */}
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gap={8}
        alignItems="start"
      >
        {/* Example Box with adaptive bg/border */}
        <Box
          bg={boxBg}
          p={3}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor={borderClr}
        >
          <Heading size="md" mb={4} color={headingClr}>
            My Shortcuts
          </Heading>
          {/* ... rest unchanged */}
        </Box>

        {/* Repeat above pattern for all other boxes */}
        {/* Replace bg="white", borderColor="gray.100" with boxBg + borderClr */}
        {/* Replace text gray.500/gray.800 with subTextClr / headingClr */}
      </Grid>
    </Box>
  );
};

export default UserDashboard;
