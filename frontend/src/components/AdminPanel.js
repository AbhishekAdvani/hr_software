import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import StickyNavbar from "./StickyNavbar";

const AdminPanel = () => {
  return (
    <>
      <StickyNavbar />

      <Flex>
        <Sidebar />

        <Box ml="150px" w="calc(100% - 150px)" p={3} zIndex={998}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default AdminPanel;
