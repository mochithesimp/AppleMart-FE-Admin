import LoginForm from "../Authentication-page/components/Login-form";
import SidebarForm from "./components/Sidebar-form";
import { useEffect, useState } from "react";
import "./Style.css";
const LoginPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const initialForm = queryParams.get("form") as "login" | "register" | "forget" || "login";
  const [activeForm, setActiveForm] = useState<"login" | "register" | "forget">(initialForm);

  useEffect(() => {
    setActiveForm(initialForm);
  }, [initialForm]);

  return (
    <div className="backgroundContainers">
      <div className="form-container">
        <SidebarForm activeForm={activeForm} />
        <div className="col col-2">
          <div className="btn-box">
            <button
              className={`btn ${activeForm === "login" ? "active-btn" : ""}`}
              onClick={() => setActiveForm("login")}
            >
              Sign In
            </button>
            <button
              className={`btn ${activeForm === "register" ? "active-btn" : ""}`}
              onClick={() => setActiveForm("register")}
            >
              Sign Up
            </button>
          </div>
          <LoginForm activeForm={activeForm} setActiveForm={setActiveForm} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
