import "../Style.css";

interface ForgetFormProps {
  activeForm: "login" | "register" | "forget";
  setActiveForm: (form: "login" | "register" | "forget") => void;
}
const ForgetForm: React.FC<ForgetFormProps> = () => {
  return (
    <div className="forget-form">
      <div className="form-title">
        <span>Forget Password</span>
      </div>
      <div className="form-inputs">
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            placeholder="Email"
            required
          />
          <i className="bx bx-envelope icon"></i>
        </div>
        <div className="input-box">
          <button className="input-submit">
            <span>Continue</span>
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
export default ForgetForm;
