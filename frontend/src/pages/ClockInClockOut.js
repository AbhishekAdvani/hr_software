import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Text,
  Divider,
  HStack,
  Stack,
  Container,
  Heading,
  Badge,
  Tooltip,
  InputGroup,
  InputLeftElement,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import ReactSelect from "react-select";
import { saveAs } from "file-saver";
import { FiFileText } from "react-icons/fi";
import { BsPersonCheck, BsPlus, BsSearch } from "react-icons/bs";
import MarkAttendanceModal from "../MarkAttendanceModal";
import StickyNavbar from "../components/StickyNavbar";
import ClockPunchSection from "../components/ClockPunchSection";

const employees = [
  { id: "EMP001", name: "John Doe" },
  { id: "EMP002", name: "Priya Sharma" },
  { id: "EMP003", name: "Amit Verma" },
  { id: "EMP004", name: "Sana Sheikh" },
  { id: "EMP005", name: "Rahul Kapoor" },
];

const clients = [
  { id: "CL001", name: "Infosys" },
  { id: "CL002", name: "TCS" },
  { id: "CL003", name: "Reliance" },
  { id: "CL004", name: "HDFC Bank" },
  { id: "CL005", name: "Tata Steel" },
];

const fpPromise = FingerprintJS.load();

const ClockInClockOut = () => {
  const [selectedId, setSelectedId] = useState("");
  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const [filterDate, setFilterDate] = useState("");

  console.log("entries:", entries);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredEntries = entries
    .filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((entry) => (filterClient ? entry.client === filterClient : true))
    .filter((entry) => (filterDate ? entry.date === filterDate : true));

  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const exportCSV = () => {
    const header =
      "EmployeeID,Name,Date,MarkedTime,ClockIn,ClockOut,Location,Client,Project\n";
    const rows = entries
      .map(
        (e) =>
          `${e.id},${e.name},${e.date},${e.time},${e.clockIn},${e.clockOut},${e.location},${e.client},${e.project}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "attendance.csv");
  };

  return (
    <>
      {" "}
      <Box minH="100%" py={0} px={0}>
        <Container maxW="full">
          <Box
            p={0}
            // bg="white"
            // rounded="lg"
            // shadow="md"
            // border="1px solid"
            borderColor="gray.200"
          >
            {/* <Heading size="md" mb={4}>
              Clock Punch{" "}
            </Heading> */}

            {/* <Divider mb={4} /> */}
            <ClockPunchSection
              onPunch={(type) => {
                if (type === "In") onOpen(); // Opens modal
              }}
              entries={entries}
              setEntries={setEntries}
              selectedId={selectedId}
            />

            <Divider mb={4} />

            <Box mb={4}>
              <HStack spacing={3} align="center">
                {/* Search Input */}
                <InputGroup size="sm" w="250px">
                  <InputLeftElement pointerEvents="none">
                    <BsSearch />
                  </InputLeftElement>
                  <Input
                    placeholder="Search by Name or ID"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    borderRadius="md"
                  />
                </InputGroup>

                {/* Add New Entry */}
                <IconButton
                  icon={<BsPlus fontSize="18px" />}
                  colorScheme="teal"
                  aria-label="Mark Attendance"
                  size="sm"
                  onClick={onOpen}
                  borderRadius="md"
                  title="Mark Attendance"
                />

                {/* Export Button */}
                <IconButton
                  icon={<FiFileText fontSize="16px" />}
                  colorScheme="gray"
                  aria-label="Export CSV"
                  size="sm"
                  onClick={exportCSV}
                  borderRadius="md"
                  title="Export to CSV"
                />

                {/* Page Size Selector */}
                <Select
                  size="sm"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  width="120px"
                  borderRadius="md"
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Box>

            {/* table */}
            <Box
              overflowX="auto"
              border="1px solid"
              borderColor="gray.200"
              rounded="md"
            >
              {filteredEntries.length > 0 ? (
                <Table size="sm" variant="solid">
                  <Thead bg="gray.100" position="sticky" top="0" zIndex="auto">
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>
                        <VStack spacing={0} align="start">
                          <Text>Date</Text>
                          <Input
                            type="date"
                            size="xs"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                          />
                        </VStack>
                      </Th>
                      <Th>Clock In</Th>
                      <Th>Clock Out</Th>
                      <Th>
                        <VStack spacing={0} align="start">
                          <Text>Client</Text>
                          <Select
                            size="xs"
                            placeholder="All"
                            value={filterClient}
                            onChange={(e) => setFilterClient(e.target.value)}
                          >
                            {clients.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </Select>
                        </VStack>
                      </Th>
                      <Th>Location</Th>
                      <Th>Project</Th>
                      <Th>MACID</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {paginatedEntries.map((entry, idx) => (
                      <Tr key={idx}>
                        <Td>
                          <Badge colorScheme="purple">{entry.id}</Badge>
                        </Td>
                        <Td>{entry.name}</Td>
                        <Td>{entry.date}</Td>
                        <Td>{entry.clockIn}</Td>
                        <Td>
                          <Input
                            type="time"
                            size="xs"
                            value={entry.clockOut || ""}
                            onChange={(e) => {
                              const updated = [...entries];
                              updated[idx].clockOut = e.target.value;
                              setEntries(updated);
                            }}
                          />
                        </Td>
                        <Td>{entry?.client}</Td>
                        <Td>{entry.location}</Td>
                        <Td>{entry.project}</Td>
                        <Td>{entry.deviceId}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Box py={12} textAlign="center">
                  <Image
                    src="https://cdn.vectorstock.com/i/500p/72/89/no-data-concept-man-near-empty-folder-lost-vector-54557289.jpg"
                    alt="No Data"
                    boxSize="auto"
                    mx="auto"
                    mb={4}
                    opacity={0.7}
                  />
                  <Text fontSize="lg" fontWeight="medium" color="gray.600">
                    No Records Found
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Try adjusting filters or add a new entry
                  </Text>
                </Box>
              )}
            </Box>

            {/* pagination */}

            <HStack justify="space-between" mt={4}>
              <Text fontSize="sm">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * pageSize + 1,
                  filteredEntries.length
                )}
                –{Math.min(currentPage * pageSize, filteredEntries.length)} of{" "}
                {filteredEntries.length}
              </Text>
              <HStack>
                <Button
                  size="xs"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  isDisabled={currentPage === 1}
                >
                  Prev
                </Button>
                <Button
                  size="xs"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredEntries.length / pageSize)
                      )
                    )
                  }
                  isDisabled={
                    currentPage >= Math.ceil(filteredEntries.length / pageSize)
                  }
                >
                  Next
                </Button>
              </HStack>
            </HStack>
          </Box>
        </Container>
        <MarkAttendanceModal
          isOpen={isOpen}
          onClose={onClose}
          employees={employees}
          clients={clients}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          location={location}
          setLocation={setLocation}
          client={client}
          setClient={setClient}
          project={project}
          setProject={setProject}
          entries={entries}
          setEntries={setEntries}
        />
      </Box>
    </>
  );
};

export default ClockInClockOut;
