import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import App from "./App";
import StickyNavbar from "./components/StickyNavbar";
import NotFound from "./NotFound";
import AuthPage from "./pages/AuthPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/AuthPage" element={<AuthPage />} />
        {/* Add other routes here if needed */}
        <Route path="/" element={<AdminPanel />}>
          <Route index element={<App />} />
          {/* More routes can go here */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>
);
