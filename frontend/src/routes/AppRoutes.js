import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ClockInClockOut from "../pages/ClockInClockOut";
import NotFound from "../components/NotFound";
import { useUser } from "../context/UserContext";
import AdminPanel from "../components/AdminPanel";
import { Flex, Spinner } from "@chakra-ui/react";
import MyProfile from "../pages/MyProfile";
import Ticketing from "../pages/Ticketing.js";
import ComingSoon from "../pages/ComingSoon.jsx";

// const ProtectedRoute = ({ children }) => {
//   const { loggedInUser, isLoading } = useUser();

//   if (isLoading) {
//     return (
//       <Flex justify="center" align="center" height="100vh">
//         <Spinner size="xl" color="teal.500" />
//       </Flex>
//     );
//   }
//   console.log("loggedInUser", loggedInUser);

//   // return loggedInUser ? children : <Navigate to="/login" />;
//   return loggedInUser ? children : null;
// };

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/MyProfile" element={<MyProfile />} />

    {/* ✅ Admin layout wrapper */}
    <Route
      path="/"
      element={
        // <ProtectedRoute>
        <AdminPanel />
        // </ProtectedRoute>
      }
    >
      {/* ✅ These go inside <Outlet /> */}
      <Route index element={<Dashboard />} />
      <Route path="Ticketing" element={<Ticketing />} />
      <Route path="clockin" element={<ClockInClockOut />} />
      <Route path="ComingSoon" element={<ComingSoon />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
