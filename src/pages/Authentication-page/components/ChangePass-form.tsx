import { useState } from "react";
import "../Style.css";

interface ChangePassForm {
  activeForm: "login" | "register" | "forget" | "changePass";
  setActiveForm: (form: "login" | "register" | "forget" | "changePass") => void;
}
const ChangePassForm: React.FC<ChangePassForm> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="forget-form">
      <div className="form-title">
        <span>Change Password</span>
      </div>
      <div className="form-inputs">
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            className="input-field"
            placeholder="New Password"
            required
          />
          <i
            className={`bx ${
              showPassword ? "bx-lock-open" : "bx-lock-alt"
            } icon`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <div className="input-box">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="input-field"
            placeholder="Comfirm Password"
            required
          />
          <i
            className={`bx ${showConfirmPassword ? "bx-hide" : "bx-show"} icon`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>
        <div className="input-box">
          <button className="input-submit">
            <span>Confirm</span>
            <i className="bx bx-right-arrow-alt"></i>
          </button>
        </div>
      </div>
      <div className="social-login">
        <i className="bx bxl-google"></i>
        <i className="bx bxl-facebook"></i>
        <i className="bx bxl-github"></i>
      </div>
    </div>
  );
};
export default ChangePassForm;
