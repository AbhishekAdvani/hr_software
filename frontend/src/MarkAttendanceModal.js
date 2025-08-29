import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Select,
  Input,
  useToast,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const MarkAttendanceModal = ({
  isOpen,
  onClose,
  employees,
  clients,
  selectedId,
  setSelectedId,
  location,
  setLocation,
  client,
  setClient,
  project,
  setProject,
  entries,
  setEntries,
}) => {
  const toast = useToast();

  const modalBg = useColorModeValue("white", "gray.800");
  const headerColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const inputBg = useColorModeValue("white", "gray.700");
  const selectBg = useColorModeValue("white", "gray.700");

  const markPresent = () => {
    if (!selectedId || !location || !client || !project) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const employee = employees.find((e) => e.id === selectedId);
    const today = new Date().toISOString().split("T")[0];

    const alreadyMarked = entries.some(
      (entry) => entry.name === employee.name && entry.date === today
    );
    if (alreadyMarked) {
      toast({
        title: "Already Marked",
        description: `${employee.name} has already marked attendance today.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const now = new Date();
        const clockInTime = now.toLocaleTimeString();

        // Generate fingerprint
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const deviceId = result.visitorId;

        const entry = {
          id: employee.id,
          name: employee.name,
          date: today,
          time: clockInTime,
          clockIn: clockInTime,
          clockOut: "",
          location,
          client,
          project,
          geoLocation: `${latitude},${longitude}`,
          deviceId, // ✅ captured device fingerprint
        };

        setEntries([...entries, entry]);
        setSelectedId("");
        setLocation("");
        setClient("");
        setProject("");
        onClose();

        toast({
          title: "Attendance Marked",
          description: `${employee.name}'s attendance has been recorded.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: "Location Access Denied",
          description: "Enable location access to mark attendance.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="md" p={1} bg={modalBg}>
        <ModalHeader fontWeight="semibold" color={headerColor}>
          Mark Attendance
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5} w="100%">
            <FormControl isRequired>
              <FormLabel fontSize="sm" mb={1} color={labelColor}>
                Employee
              </FormLabel>
              <ReactSelect
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "36px",
                    fontSize: "0.9rem",
                    backgroundColor: selectBg,
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: selectBg,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: headerColor,
                  }),
                }}
                options={employees.map((e) => ({
                  value: e.id,
                  label: `${e.name} (${e.id})`,
                }))}
                placeholder="Select employee"
                onChange={(option) => setSelectedId(option.value)}
                value={
                  selectedId
                    ? {
                        value: selectedId,
                        label:
                          employees.find((e) => e.id === selectedId)?.name +
                          ` (${selectedId})`,
                      }
                    : null
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" mb={1} color={labelColor}>
                Location
              </FormLabel>
              <Select
                placeholder="Select location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                size="sm"
                bg={selectBg}
              >
                <option value="Office">🏢 Office</option>
                <option value="Offsite">🌐 Offsite</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" mb={1} color={labelColor}>
                Client
              </FormLabel>
              <ReactSelect
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "36px",
                    fontSize: "0.9rem",
                    backgroundColor: selectBg,
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: selectBg,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: headerColor,
                  }),
                }}
                options={clients.map((c) => ({
                  value: c.name,
                  label: `${c.name} (${c.id})`,
                }))}
                placeholder="Select client"
                onChange={(option) => setClient(option.value)}
                value={
                  client
                    ? {
                        value: client,
                        label:
                          clients.find((c) => c.name === client)?.name +
                          ` (${clients.find((c) => c.name === client)?.id})`,
                      }
                    : null
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" mb={1} color={labelColor}>
                Project
              </FormLabel>
              <Input
                placeholder="Enter project name"
                value={project || ""}
                onChange={(e) => setProject(e.target.value)}
                size="sm"
                bg={inputBg}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={markPresent}
            px={6}
            borderRadius="md"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MarkAttendanceModal;
