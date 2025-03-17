import { useState } from "react";
import SidebarForm from "./components/Sidebar-form";
import ChangePassForm from "../Authentication-page/components/ChangePass-form";
import { NavLink } from "react-router-dom";
import "./Style.css";
const ChangePassPage = () => {
  const [activeForm, setActiveForm] = useState<"login" | "register" | "forget" | "changePass">("changePass");
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
          <ChangePassForm activeForm={activeForm} setActiveForm={setActiveForm} />
        </div>
      </div>
    </div>
  );
};
export default ChangePassPage;
