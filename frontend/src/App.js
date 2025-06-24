import React, { useState } from "react";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

import ClockInClockOut from "./pages/ClockInClockOut";
import UserDashboard from "./pages/Dashboard";

const fpPromise = FingerprintJS.load();

const App = () => {
  return (
    <>
      <UserDashboard />
    </>
  );
};

export default App;
