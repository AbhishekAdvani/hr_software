import React, { useState, useEffect } from "react";
import {
    Box, Flex, Text, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td,
    Avatar, IconButton, VStack, HStack, Badge, Image, Tabs, TabList,
    TabPanels, Tab, TabPanel, SimpleGrid, Stat, StatLabel, StatNumber,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, useDisclosure, useToast, Spinner
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DownloadIcon } from "@chakra-ui/icons";
import { FiPlus } from "react-icons/fi";
import { saveAs } from 'file-saver';
import axios from "axios";
import { FiBarChart2, FiRefreshCw, FiX } from "react-icons/fi";
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiCheckCircle } from "react-icons/fi";
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
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const createModal = useDisclosure();
    const [allEmployees, setAllEmployees] = useState([]);
    const [allClients, setAllClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ticketRes, empRes, clientRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/tickets/getAllTickets"),
                    axios.get("http://localhost:5000/api/employees/getAllEmployees"),
                    axios.get("http://localhost:5000/clients/getAllClients")
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




    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/tickets/getAllTickets");
                if (res.data.success) {
                    setAllTickets(res.data.data);
                }
            } catch (error) {
                toast({ title: "Error fetching tickets", status: "error" });
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const exportToCSV = (tickets) => {
        const headers = ["Ticket ID", "Title", "Status", "Priority", "SLA Due", "Assigned To", "Requested By"];
        const rows = tickets.map(t => [
            t.ticketCode,
            t.title,
            t.status,
            t.priority,
            t.slaDueDate || "",
            t.assignedTo?.name || "",
            t.requestedBy?.name || ""
        ]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "tickets.csv");
    };

    const filteredTickets = allTickets.filter((ticket) => {
        const matchesSearch = ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) || ticket.ticketCode?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
        const matchesPriority = priorityFilter ? ticket.priority === priorityFilter : true;
        const matchesAssignedTo = assignedToFilter ? ticket.assignedTo?.name === assignedToFilter : true;
        const matchesRequestedBy = assignedByFilter ? ticket.requestedBy?.name === assignedByFilter : true;
        return matchesSearch && matchesStatus && matchesPriority && matchesAssignedTo && matchesRequestedBy;
    });

    const summary = {
        total: allTickets.length,
        open: allTickets.filter(t => t.status === "Open").length,
        inProgress: allTickets.filter(t => t.status === "In Progress").length,
        closed: allTickets.filter(t => t.status === "Closed").length,
    };

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket);
        onOpen();
    };

    const handleSave = () => {
        toast({ title: "Ticket updated.", status: "success", duration: 2000, isClosable: true });
        onClose();
    };

    const getPaginatedTickets = (status) => {
        const list = filteredTickets.filter(t => !status || t.status === status);
        const start = (currentPage - 1) * itemsPerPage;
        return list.slice(start, start + itemsPerPage);
    };

    const getPageCount = (status) => {
        return Math.ceil(filteredTickets.filter(t => !status || t.status === status).length / itemsPerPage);
    };

    if (loading) return <Flex justify="center" align="center" minH="60vh"><Spinner size="xl" /></Flex>;

    return (
        <>
            <Box w="100%" p={6}>
                <Flex justify="space-between" align="center" mb={4}>
                    <Text fontSize="2xl" fontWeight="bold">Expound Ticket</Text>
                    <HStack>
                        <Button leftIcon={<DownloadIcon />} onClick={() => exportToCSV(filteredTickets)}>Export CSV</Button>
                    </HStack>
                </Flex>


                <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={6} mb={6}>
                    {[
                        {
                            label: "Total Tickets",
                            value: summary.total,
                            percent: 100,
                            icon: FiBarChart2,
                            color: "#4C51BF", // blue.600
                        },
                        {
                            label: "Open Tickets",
                            value: summary.open,
                            percent: Math.round((summary.open / summary.total) * 100),
                            icon: FiCheckCircle,
                            color: "#38A169", // green.400
                        },
                        {
                            label: "In Progress",
                            value: summary.inProgress,
                            percent: Math.round((summary.inProgress / summary.total) * 100),
                            icon: FiRefreshCw,
                            color: "#DD6B20", // orange.400
                        },
                        {
                            label: "Closed Tickets",
                            value: summary.closed,
                            percent: Math.round((summary.closed / summary.total) * 100),
                            icon: FiX,
                            color: "#718096", // gray.500
                        },
                    ].map((kpi, index) => (
                        <Box
                            key={index}
                            bg="white"
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
                                        trailColor: "#EDF2F7",
                                        strokeLinecap: "round",
                                    })}
                                >
                                    <Text fontSize="lg" fontWeight="bold">
                                        {kpi.percent}%
                                    </Text>
                                </CircularProgressbarWithChildren>
                            </Box>
                            <Flex align="center" justify="center" gap={2}>
                                <kpi.icon color={kpi.color} />
                                <Text fontSize="md" fontWeight="medium" color="gray.600">
                                    {kpi.label}
                                </Text>
                            </Flex>
                            <Text fontSize="xl" fontWeight="bold" color="gray.800" mt={1}>
                                {kpi.value}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>



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


                <Tabs variant="enclosed" colorScheme="blue" onChange={() => setCurrentPage(1)}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Open</Tab>
                        <Tab>In Progress</Tab>
                        <Tab>Closed</Tab>
                    </TabList>

                    <TabPanels>
                        {["", "Open", "In Progress", "Closed"].map((status, idx) => (
                            <TabPanel key={idx} px={0}>
                                <Table variant="simple" bg="white" rounded="md" shadow="sm" size="sm">
                                    <Thead bg="gray.100">
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
                                        {getPaginatedTickets(status).map((ticket, i) => (
                                            <Tr key={ticket._id}>
                                                <Td>{ticket.ticketCode}</Td>
                                                <Td>{ticket.title}</Td>
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
                                                <Td>{ticket.category || "-"}</Td>
                                                <Td>{ticket.client?.name || "-"}</Td>
                                                <Td>
                                                    {ticket.slaDueDate
                                                        ? new Date(ticket.slaDueDate).toLocaleDateString()
                                                        : "-"}
                                                </Td>
                                                <Td>
                                                    {ticket.createdAt
                                                        ? new Date(ticket.slaDueDate).toLocaleDateString()
                                                        : "-"}
                                                </Td>
                                                <Td>{ticket.requestedBy?.name || "-"}</Td>
                                                <Td>{ticket.assignedTo?.name || "-"}</Td>
                                                <Td>
                                                    {ticket.attachments && ticket.attachments.length > 0 ? (
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
                <Flex
                    mt={12}
                    direction="column"
                    align="center"
                    justify="center"
                    p={{ base: 6, md: 12 }}
                    rounded="xl"
                    borderColor="gray.200"
                    textAlign="center"
                    w="100%"
                    maxW="container.md"
                    mx="auto"
                >
                    <Image
                        src="/flow.png" // Ensure this image is placed in `public/flow.png`
                        alt="No tickets illustration"
                        boxSize={{ base: "160px", md: "full" }}
                        mb={6}
                    />
                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="gray.800" mb={2}>
                        No tickets yet
                    </Text>
                    <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
                        Need help? Create your first ticket and start managing support efficiently.
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

                {filteredTickets.length === 0 && (
                    <Flex
                        mt={12}
                        direction="column"
                        align="center"
                        justify="center"
                        p={{ base: 6, md: 12 }}
                        bg="gray.50"
                        rounded="xl"
                        border="2px dashed"
                        borderColor="gray.200"
                        textAlign="center"
                        w="100%"
                        maxW="container.md"
                        mx="auto"
                    >
                        <Image
                            src="/flow.png" // Ensure this image is placed in `public/flow.png`
                            alt="No tickets illustration"
                            boxSize={{ base: "160px", md: "full" }}
                            mb={6}
                        />
                        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="gray.800" mb={2}>
                            No tickets yet
                        </Text>
                        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={6}>
                            Need help? Create your first ticket and start managing support efficiently.
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


                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>View/Edit Ticket</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedTicket && (
                                <VStack align="start" spacing={3}>
                                    <Text><b>Ticket Code:</b> {selectedTicket.ticketCode}</Text>
                                    <Text><b>Title:</b> {selectedTicket.title}</Text>
                                    <Text><b>Status:</b> {selectedTicket.status}</Text>
                                    <Text><b>Priority:</b> {selectedTicket.priority}</Text>
                                    <Text><b>Assigned To:</b> {selectedTicket.assignedTo?.name}</Text>
                                    <Text><b>Requested By:</b> {selectedTicket.requestedBy?.name}</Text>
                                    <Text><b>SLA Due:</b> {selectedTicket.slaDueDate ? new Date(selectedTicket.slaDueDate).toLocaleString() : "-"}</Text>
                                </VStack>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleSave} colorScheme="blue">Save</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
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
