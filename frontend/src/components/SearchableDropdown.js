import {
    Box, Input, VStack, List, ListItem, useOutsideClick
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const SearchableDropdown = ({ placeholder, options, onSelect }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useOutsideClick({
        ref,
        handler: () => setIsOpen(false),
    });

    const filteredOptions = options.filter((opt) =>
        opt?.label?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box position="relative" w="full" ref={ref}>
            <Input
                placeholder={placeholder}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setIsOpen(true);
                }}
                onClick={() => setIsOpen(true)}
                borderRadius="full"
            />
            {isOpen && (
                <Box
                    position="absolute"
                    zIndex={10}
                    bg="white"
                    mt={2}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    maxH="200px"
                    overflowY="auto"
                    shadow="md"
                >
                    <List spacing={1}>
                        {filteredOptions.length === 0 && (
                            <ListItem px={3} py={2} color="gray.400">
                                No matches
                            </ListItem>
                        )}
                        {filteredOptions.map((opt, idx) => (
                            <ListItem
                                key={idx}
                                px={3}
                                py={2}
                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                onClick={() => {
                                    onSelect(opt.value);
                                    setSearch(opt.label);
                                    setIsOpen(false);
                                }}
                            >
                                {opt.label}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default SearchableDropdown;
