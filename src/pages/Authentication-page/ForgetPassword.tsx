import ForgetForm from "../Authentication-page/components/Forget-form";
import SidebarForm from "./components/Sidebar-form";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
const ForPassPage = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register" | "forget">(
    "forget"
  );

  return (
    <div className="backgroundContainers">
      <div className="form-container">
        <SidebarForm activeForm={activeForm} />
        <div className="col col-2">
          <div className="btn-box">
            <NavLink to="/login">
              <button
                className={`btn ${activeForm === "login" ? "active-btn" : ""}`}
                onClick={() => setActiveForm("login")}
              >
                Sign In
              </button>
            </NavLink>
            <NavLink to="/login?form=register">
              <button
                className={`btn ${
                  activeForm === "register" ? "active-btn" : ""
                }`}
                onClick={() => setActiveForm("register")}
              >
                Sign Up
              </button>
            </NavLink>
          </div>
          <ForgetForm activeForm={activeForm} setActiveForm={setActiveForm} />
        </div>
      </div>
    </div>
  );
};
export default ForPassPage;
