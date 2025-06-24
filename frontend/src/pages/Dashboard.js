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
  Stack,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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

const KPIBox = ({ icon, label, value, helpText, color }) => {
  const cardBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const glassBg = useColorModeValue(`${color}.50`, `${color}.900`);

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      p={5}
      shadow="lg"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={useColorModeValue(`${color}.100`, `${color}.700`)}
      transition="all 0.3s ease"
      _hover={{
        // transform: "scale(1.03)",
        boxShadow: `0 6px 20px rgba(0, 0, 0, 0.1)`,
        cursor: "pointer",
        borderColor: useColorModeValue(`${color}.200`, `${color}.600`),
      }}
    >
      <Flex align="center" gap={4}>
        <Box bg={glassBg} color={`${color}.600`} p={3} borderRadius="full">
          <Icon as={icon} boxSize={6} />
        </Box>
        <Stat>
          <StatLabel fontSize="sm" color="gray.500">
            {label}
          </StatLabel>
          <StatNumber fontSize="xl" color="gray.700">
            {value}
          </StatNumber>
          <StatHelpText color="gray.400">{helpText}</StatHelpText>
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
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

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
          <Text fontSize="xl" color="teal.600" fontWeight="medium">
            {getGreeting()},
          </Text>
          <Heading size="lg" color="gray.800">
            Welcome back, Abhishek 👋
          </Heading>
          <Text fontSize="sm" color="gray.500" mt={1}>
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
          <Avatar name="Abhishek Advani" size="lg" src="/profile.png" />
        </Flex>
      </Flex>

      {/* KPIs */}

      {/* Expanded KPIs */}
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

      {/* Shortcuts + Events + Announcements */}
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gap={8}
        alignItems="start"
      >
        {/* Shortcuts */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            My Shortcuts
          </Heading>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
            <ShortcutButton
              label="Apply Leave"
              icon={FaCalendarPlus}
              colorScheme="orange"
            />
            <ShortcutButton
              label="Download Payslip"
              icon={FaFileInvoiceDollar}
              colorScheme="purple"
            />
            <ShortcutButton
              label="Check Attendance"
              icon={FaUserCheck}
              colorScheme="teal"
            />
            <ShortcutButton
              label="HR Announcements"
              icon={FaEnvelopeOpenText}
              colorScheme="blue"
            />
          </Grid>
        </Box>

        {/* Today's Events Timeline */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            Today’s Events
          </Heading>
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaRegClock} color="teal.500" />
              <Text fontSize="sm">Team Sync @ 11:00 AM</Text>
            </HStack>
            <HStack>
              <Icon as={FaRegClock} color="teal.500" />
              <Text fontSize="sm">1-on-1 @ 4:00 PM</Text>
            </HStack>
            <HStack>
              <Icon as={FaRegClock} color="teal.500" />
              <Text fontSize="sm">Tech Talk @ 6:30 PM</Text>
            </HStack>
          </VStack>
        </Box>

        {/* HR Announcements */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            HR Announcements
          </Heading>
          <VStack align="start" spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="semibold">
                📢 Office Closed on Jul 17
              </Text>
              <Text fontSize="xs" color="gray.500">
                Due to Bakrid festival.
              </Text>
            </Box>
            <Divider />
            <Box>
              <Text fontSize="sm" fontWeight="semibold">
                📌 Leave Policy Updated
              </Text>
              <Text fontSize="xs" color="gray.500">
                3 additional casual leaves for Q3
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Employee Directory */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            Employee Directory
          </Heading>
          <Text fontSize="sm" color="gray.500">
            View contact & reporting structure
          </Text>
          <Button mt={4} colorScheme="teal" size="sm">
            Open Directory
          </Button>
        </Box>

        {/* Leave Summary Chart (Placeholder) */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            Leave Summary
          </Heading>
          <Box
            h="150px"
            borderRadius="lg"
            bg="gray.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="xs" color="gray.400">
              [ Leave Pie Chart Placeholder ]
            </Text>
          </Box>
        </Box>

        {/* Task Timeline */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            Task Timeline
          </Heading>
          <VStack align="start" spacing={3}>
            <Text fontSize="sm">✅ 9:30 AM - Submit Expense Sheet</Text>
            <Text fontSize="sm">🟡 1:00 PM - Team Review Call</Text>
            <Text fontSize="sm">🔴 5:00 PM - Submit Feedback Form</Text>
          </VStack>
        </Box>

        {/* Payroll Summary */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            Payroll Summary
          </Heading>
          <Text fontSize="sm">Net Pay: ₹56,700</Text>
          <Text fontSize="sm" color="gray.500">
            Deductions: ₹3,200 | Bonus: ₹1,000
          </Text>
        </Box>

        {/* Team Birthdays */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            🎂 Birthdays This Week
          </Heading>
          <Text fontSize="sm">Riya Sharma - Jun 26</Text>
          <Text fontSize="sm">Kunal Verma - Jun 28</Text>
          <Text fontSize="sm" color="gray.400">
            Don't forget to wish!
          </Text>
        </Box>

        {/* Policy Updates */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            📚 Policies Updated
          </Heading>
          <Text fontSize="sm">Work-from-home policy updated on June 20</Text>
          <Text fontSize="xs" color="gray.500">
            New clauses on hybrid attendance
          </Text>
        </Box>

        {/* Quick Contacts */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="base"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={4}>
            📞 Quick Contacts
          </Heading>
          <Text fontSize="sm">
            <strong>HR:</strong> +91-9876543210
          </Text>
          <Text fontSize="sm">
            <strong>Admin:</strong> +91-9123456780
          </Text>
          <Text fontSize="sm">
            <strong>IT Support:</strong> it@company.com
          </Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
