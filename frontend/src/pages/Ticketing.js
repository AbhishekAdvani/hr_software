import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  useDisclosure,
  useToast,
  Spinner,
  IconButton,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  FiPlus,
  FiBarChart2,
  FiRefreshCw,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import { saveAs } from "file-saver";
import axios from "axios";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CreateTicketModal from "../components/CreateTicketModal.js";
import TicketFilters from "../components/TicketFilters.jsx";

export default function Ticketing() {
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");
  const [requestedByFilter, setRequestedByFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [assignedByFilter, setAssignedByFilter] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const createModal = useDisclosure();
  const [allEmployees, setAllEmployees] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [editForm, setEditForm] = useState({
    title: "",
    status: "",
    priority: "",
    assignedTo: "",
  });

  // Colors for dark/light
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.700");
  const tableText = useColorModeValue("gray.800", "gray.200");
  const subText = useColorModeValue("gray.600", "gray.400");
  const noTicketBg = useColorModeValue("gray.50", "gray.700");
  const kpiText = useColorModeValue("gray.600", "gray.300");
  const kpiValue = useColorModeValue("gray.800", "white");

  useEffect(() => {
    if (selectedTicket) {
      setEditForm({
        title: selectedTicket.title || "",
        status: selectedTicket.status || "",
        priority: selectedTicket.priority || "",
        assignedTo: selectedTicket.assignedTo?._id || "",
      });
    }
  }, [selectedTicket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketRes, empRes, clientRes] = await Promise.all([
          axios.get("http://localhost:5000/api/tickets/getAllTickets"),
          axios.get("http://localhost:5000/api/employees/getAllEmployees"),
          axios.get("http://localhost:5000/clients/getAllClients"),
        ]);

        if (ticketRes.data.success) setAllTickets(ticketRes.data.data);
        if (empRes.data?.data) setAllEmployees(empRes.data.data);
        if (clientRes.data) setAllClients(clientRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({ title: "Failed to fetch initial data", status: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const exportToCSV = (tickets) => {
    const headers = [
      "Ticket ID",
      "Title",
      "Status",
      "Priority",
      "SLA Due",
      "Assigned To",
      "Requested By",
    ];
    const rows = tickets.map((t) => [
      t.ticketCode,
      t.title,
      t.status,
      t.priority,
      t.slaDueDate || "",
      t.assignedTo?.name || "",
      t.requestedBy?.name || "",
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "tickets.csv");
  };

  const filteredTickets = allTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? ticket.priority === priorityFilter
      : true;
    const matchesAssignedTo = assignedToFilter
      ? ticket.assignedTo?.name === assignedToFilter
      : true;
    const matchesRequestedBy = assignedByFilter
      ? ticket.requestedBy?.name === assignedByFilter
      : true;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesAssignedTo &&
      matchesRequestedBy
    );
  });

  const summary = {
    total: allTickets.length,
    open: allTickets.filter((t) => t.status === "Open").length,
    inProgress: allTickets.filter((t) => t.status === "In Progress").length,
    closed: allTickets.filter((t) => t.status === "Closed").length,
  };

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/tickets/updateTicket/${selectedTicket._id}`,
        editForm
      );

      if (res.data.success) {
        toast({ title: "Ticket updated successfully", status: "success" });
        onClose();
        setSelectedTicket(null);

        const refreshed = await axios.get(
          "http://localhost:5000/api/tickets/getAllTickets"
        );
        if (refreshed.data.success) setAllTickets(refreshed.data.data);
      }
    } catch (error) {
      console.error("Update failed", error);
      toast({ title: "Failed to update ticket", status: "error" });
    }
  };

  const getPaginatedTickets = (status) => {
    const list = filteredTickets.filter((t) => !status || t.status === status);
    const start = (currentPage - 1) * itemsPerPage;
    return list.slice(start, start + itemsPerPage);
  };

  const getPageCount = (status) => {
    return Math.ceil(
      filteredTickets.filter((t) => !status || t.status === status).length /
        itemsPerPage
    );
  };

  if (loading)
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <>
      <Box w="100%" p={3}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color={tableText}>
            Ticketing
          </Text>
          <Button
            leftIcon={<DownloadIcon />}
            onClick={() => exportToCSV(filteredTickets)}
          >
            Export CSV
          </Button>
        </Flex>

        {/* KPIs */}
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={6} mb={6}>
          {[
            {
              label: "Total Tickets",
              value: summary.total,
              percent: 100,
              icon: FiBarChart2,
              color: "#4C51BF",
            },
            {
              label: "Open Tickets",
              value: summary.open,
              percent: Math.round((summary.open / summary.total) * 100),
              icon: FiCheckCircle,
              color: "#38A169",
            },
            {
              label: "In Progress",
              value: summary.inProgress,
              percent: Math.round((summary.inProgress / summary.total) * 100),
              icon: FiRefreshCw,
              color: "#DD6B20",
            },
            {
              label: "Closed Tickets",
              value: summary.closed,
              percent: Math.round((summary.closed / summary.total) * 100),
              icon: FiX,
              color: "#718096",
            },
          ].map((kpi, index) => (
            <Box
              key={index}
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              p={5}
              borderRadius="xl"
              boxShadow="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.03)", boxShadow: "2xl" }}
            >
              <Box w="80px" mx="auto" mb={4}>
                <CircularProgressbarWithChildren
                  value={kpi.percent}
                  styles={buildStyles({
                    pathColor: kpi.color,
                    trailColor: useColorModeValue("#EDF2F7", "#2D3748"),
                    strokeLinecap: "round",
                  })}
                >
                  <Text fontSize="lg" fontWeight="bold" color={kpiText}>
                    {kpi.percent}%
                  </Text>
                </CircularProgressbarWithChildren>
              </Box>
              <Flex align="center" justify="center" gap={2}>
                <kpi.icon color={kpi.color} />
                <Text fontSize="md" fontWeight="medium" color={kpiText}>
                  {kpi.label}
                </Text>
              </Flex>
              <Text fontSize="xl" fontWeight="bold" color={kpiValue} mt={1}>
                {kpi.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Filters */}
        <Flex gap={4} flexWrap="wrap" mb={4} align="center">
          <TicketFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            assignedToFilter={assignedToFilter}
            setAssignedToFilter={setAssignedToFilter}
            requestedByFilter={requestedByFilter}
            setRequestedByFilter={setRequestedByFilter}
            clientFilter={clientFilter}
            setClientFilter={setClientFilter}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            onNewTicket={createModal.onOpen}
            allTickets={allTickets}
            allClients={allClients}
          />
        </Flex>

        {/* Tabs + Tables */}
        <Tabs
          variant="enclosed"
          colorScheme="blue"
          onChange={() => setCurrentPage(1)}
        >
          <TabList>
            <Tab>All</Tab>
            <Tab>Open</Tab>
            <Tab>In Progress</Tab>
            <Tab>Closed</Tab>
          </TabList>

          <TabPanels>
            {["", "Open", "In Progress", "Closed"].map((status, idx) => (
              <TabPanel key={idx} px={0}>
                <Box overflowX="auto">
                  <Table
                    variant="simple"
                    bg={cardBg}
                    rounded="md"
                    shadow="sm"
                    size="sm"
                    width="100%"
                  >
                    <Thead bg={tableHeaderBg}>
                      <Tr>
                        <Th>Ticket Code</Th>
                        <Th>Title</Th>
                        <Th>Status</Th>
                        <Th>Priority</Th>
                        <Th>Category</Th>
                        <Th>Client</Th>
                        <Th>Creation Date</Th>
                        <Th>SLA Due</Th>
                        <Th>Requested By</Th>
                        <Th>Assigned To</Th>
                        <Th>Attachment</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {getPaginatedTickets(status).map((ticket) => (
                        <Tr key={ticket._id}>
                          <Td color={tableText}>{ticket.ticketCode}</Td>
                          <Td color={tableText}>{ticket.title}</Td>
                          <Td>
                            <Badge
                              colorScheme={
                                ticket.status === "Open"
                                  ? "blue"
                                  : ticket.status === "In Progress"
                                  ? "yellow"
                                  : "gray"
                              }
                            >
                              {ticket.status}
                            </Badge>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                ticket.priority === "High"
                                  ? "red"
                                  : ticket.priority === "Medium"
                                  ? "orange"
                                  : ticket.priority === "Low"
                                  ? "gray"
                                  : "purple"
                              }
                            >
                              {ticket.priority}
                            </Badge>
                          </Td>
                          <Td color={subText}>{ticket.category || "-"}</Td>
                          <Td color={subText}>{ticket.client?.name || "-"}</Td>
                          <Td color={subText}>
                            {ticket.createdAt
                              ? new Date(ticket.createdAt).toLocaleDateString()
                              : "-"}
                          </Td>
                          <Td color={subText}>
                            {ticket.slaDueDate
                              ? new Date(ticket.slaDueDate).toLocaleDateString()
                              : "-"}
                          </Td>
                          <Td color={subText}>
                            {ticket.requestedBy?.name || "-"}
                          </Td>
                          <Td color={subText}>
                            {ticket.assignedTo?.name || "-"}
                          </Td>
                          <Td>
                            {ticket.attachments?.length > 0 ? (
                              <a
                                href={ticket.attachments[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                📎 View
                              </a>
                            ) : (
                              "-"
                            )}
                          </Td>
                          <Td>
                            <IconButton
                              icon={<EditIcon />}
                              size="sm"
                              onClick={() => handleEdit(ticket)}
                              aria-label="Edit"
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>

                {/* Pagination */}
                <Flex justify="center" mt={4} gap={2}>
                  {Array.from({ length: getPageCount(status) }).map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      colorScheme={i + 1 === currentPage ? "blue" : "gray"}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </Flex>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <Flex
            mt={12}
            direction="column"
            align="center"
            justify="center"
            p={{ base: 6, md: 12 }}
            bg={noTicketBg}
            rounded="xl"
            border="2px dashed"
            borderColor={cardBorder}
            textAlign="center"
            w="100%"
            maxW="container.md"
            mx="auto"
          >
            <Image
              src="/flow.png"
              alt="No tickets"
              boxSize={{ base: "160px", md: "200px" }}
              mb={6}
            />
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color={tableText}
              mb={2}
            >
              No tickets yet
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color={subText} mb={6}>
              Need help? Create your first ticket and start managing support
              efficiently.
            </Text>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              size="lg"
              onClick={createModal.onOpen}
              px={8}
            >
              Create Ticket
            </Button>
          </Flex>
        )}

        {/* Edit Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg={cardBg}>
            <ModalHeader color={tableText}>View/Edit Ticket</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedTicket && (
                <VStack align="start" spacing={4} w="100%">
                  <Text color={tableText}>
                    <b>Ticket Code:</b> {selectedTicket.ticketCode}
                  </Text>
                  <Input
                    placeholder="Title"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <Select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </Select>
                  <Select
                    value={editForm.priority}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Select>
                  <Select
                    placeholder="Assign to"
                    value={editForm.assignedTo}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        assignedTo: e.target.value,
                      }))
                    }
                  >
                    {allEmployees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                  </Select>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleSave} colorScheme="blue">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        employees={allEmployees}
        clients={allClients}
        toast={toast}
      />
    </>
  );
}
