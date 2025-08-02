import React, { useState } from "react";
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, Input, Select, Button, VStack, Textarea, Box, Heading
} from "@chakra-ui/react";
import axios from "axios";

const CreateTicketModal = ({ isOpen, onClose, employees, clients, toast }) => {
    const [newTicket, setNewTicket] = useState({
        title: "",
        description: "",
        status: "Open",
        priority: "Medium",
        category: "",
        client: "",
        requestedBy: "",
        assignedTo: "",
        slaDueDate: ""
    });

    const handleCreate = async () => {
        try {
            await axios.post("http://localhost:5000/api/tickets/createTicket", newTicket);
            toast({ title: "Ticket created successfully", status: "success" });
            onClose();
            setNewTicket({
                title: "", description: "", status: "Open", priority: "Medium", category: "",
                client: "", requestedBy: "", assignedTo: "", slaDueDate: ""
            });
        } catch (error) {
            toast({ title: "Failed to create ticket", status: "error" });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="2xl" boxShadow="xl" py={4} px={2}>
                <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" pb={0}>
                    Create New Ticket
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack spacing={5} align="stretch">
                        {/* Basic Info */}
                        <Box bg="gray.50" p={5} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.700">Basic Details</Heading>
                            <VStack spacing={3}>
                                <Input
                                    placeholder="Title"
                                    value={newTicket.title}
                                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                                    borderRadius="full"
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={newTicket.description}
                                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                    borderRadius="xl"
                                />
                            </VStack>
                        </Box>

                        {/* Metadata */}
                        <Box bg="gray.50" p={5} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.700">Ticket Metadata</Heading>
                            <VStack spacing={3}>
                                <Select
                                    placeholder="Status"
                                    value={newTicket.status}
                                    onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
                                    borderRadius="full"
                                >
                                    <option>Open</option><option>In Progress</option><option>Closed</option>
                                </Select>

                                <Select
                                    placeholder="Priority"
                                    value={newTicket.priority}
                                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                    borderRadius="full"
                                >
                                    <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
                                </Select>

                                <Select
                                    placeholder="Category"
                                    value={newTicket.category}
                                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                                    borderRadius="full"
                                >
                                    <option>Access</option><option>Hardware</option><option>Software</option><option>Network</option>
                                </Select>
                            </VStack>
                        </Box>

                        {/* Assignment */}
                        <Box bg="gray.50" p={5} borderRadius="xl" shadow="sm">
                            <Heading size="sm" mb={4} color="gray.700">Assignment</Heading>
                            <VStack spacing={3}>
                                <Select
                                    placeholder="Client"
                                    value={newTicket.client}
                                    onChange={(e) => setNewTicket({ ...newTicket, client: e.target.value })}
                                    borderRadius="full"
                                >
                                    {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </Select>

                                <Select
                                    placeholder="Requested By"
                                    value={newTicket.requestedBy}
                                    onChange={(e) => setNewTicket({ ...newTicket, requestedBy: e.target.value })}
                                    borderRadius="full"
                                >
                                    {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                                </Select>

                                <Select
                                    placeholder="Assigned To"
                                    value={newTicket.assignedTo}
                                    onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                                    borderRadius="full"
                                >
                                    {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                                </Select>

                                <Input
                                    type="datetime-local"
                                    value={newTicket.slaDueDate}
                                    onChange={(e) => setNewTicket({ ...newTicket, slaDueDate: e.target.value })}
                                    borderRadius="full"
                                />
                            </VStack>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter mt={4}>
                    <Button onClick={handleCreate} colorScheme="blue" borderRadius="full">
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateTicketModal;
