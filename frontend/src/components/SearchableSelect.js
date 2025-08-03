// components/SearchableSelect.js
import { Input, Box, VStack, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function SearchableSelect({ placeholder, options, onChange }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <VStack spacing={1} align="start" w="200px">
            <Input
                placeholder={`Search ${placeholder}`}
                value={searchTerm}
                size="sm"
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="full"
            />
            <Select
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                borderRadius="full"
                size="sm"
            >
                {filteredOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </Select>
        </VStack>
    );
}
