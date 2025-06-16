import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  return (
    <>
      {mode === "login" ? (
        <LoginPage onSwitch={() => setMode("signup")} />
      ) : (
        <SignupPage onSwitch={() => setMode("login")} />
      )}
    </>
  );
};

export default AuthPage;
