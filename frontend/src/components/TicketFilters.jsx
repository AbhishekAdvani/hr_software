// src/components/TicketFilters.jsx
import React, { useMemo } from "react";
import { Flex, Input, Select, Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const TicketFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    assignedToFilter,
    setAssignedToFilter,
    requestedByFilter,
    setRequestedByFilter,
    clientFilter,
    setClientFilter,
    itemsPerPage,
    setItemsPerPage,
    onNewTicket,
    allTickets = [],
    allClients = [],
}) => {
    const assignedToOptions = useMemo(
        () =>
            [...new Set(allTickets.map(t => t.assignedTo?.name || ""))]
                .filter(Boolean)
                .sort(),
        [allTickets]
    );

    const requestedByOptions = useMemo(
        () =>
            [...new Set(allTickets.map(t => t.requestedBy?.name || ""))]
                .filter(Boolean)
                .sort(),
        [allTickets]
    );

    const clientOptions = useMemo(
        () =>
            [...new Set(allTickets.map(t => t.client?.name || ""))]
                .filter(Boolean)
                .sort(),
        [allTickets]
    );

    return (
        <Flex gap={4} flexWrap="wrap" mb={4} align="center" w="full">
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                flex={1}
            />
            <Select placeholder="Status" w="200px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Closed</option>
            </Select>
            <Select placeholder="Priority" w="200px" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
            </Select>
            <Select placeholder="Assigned To" w="200px" value={assignedToFilter} onChange={(e) => setAssignedToFilter(e.target.value)}>
                {assignedToOptions.map((name, i) => (
                    <option key={i}>{name}</option>
                ))}
            </Select>
            <Select placeholder="Requested By" w="200px" value={requestedByFilter} onChange={(e) => setRequestedByFilter(e.target.value)}>
                {requestedByOptions.map((name, i) => (
                    <option key={i}>{name}</option>
                ))}
            </Select>
            <Select placeholder="Client" w="200px" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
                {clientOptions.map((name, i) => (
                    <option key={i}>{name}</option>
                ))}
            </Select>
            <Select w="100px" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={7}>7</option>
                <option value={14}>14</option>
                <option value={31}>31</option>
            </Select>
            <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onNewTicket}>
                New Ticket
            </Button>
        </Flex>
    );
};

export default TicketFilters;
