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

        <Box ml="200px" p={6} w="full">
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default AdminPanel;
