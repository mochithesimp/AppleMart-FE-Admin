import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  //fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../components/Firebase";
import { setDoc, doc } from "firebase/firestore";
import GoogleLogin from "../GoogleLogin";
import { toast } from "react-toastify";
import "../Style.css";
import { register } from "../../../apiServices/AccountServices/accountServices";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { register } from "../../../apiServices/AccountServices/accountServices";
interface ResgiterFormProps {
  activeForm: "login" | "register" | "forget";
}
const MySwal = withReactContent(Swal);

const ResgiterForm: React.FC<ResgiterFormProps> = ({ activeForm }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra số điện thoại
    if (phoneNumber.charAt(0) !== "0" || phoneNumber.length !== 10) {
      MySwal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must start with 0 and be exactly 10 digits long.",
      });
      return;
    }

    // Kiểm tra email hợp lệ
    const email_pattern =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email_pattern.test(email)) {
      MySwal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (password !== confirmPassword) {
      MySwal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }
    setIsRegistering(true);
    try {
      const registerValues = {
        name,
        email,
        password,
        confirmPassword,
      };

      MySwal.fire({
        title: "Processing...",
        text: "Please wait a moment.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
          userName: name,
          phoneNumber: phoneNumber,
        });
      }

      const response = await register(registerValues);
      if (!response) {
        setIsRegistering(false);
        return;
      }

      MySwal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "Redirecting to login...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorCode = (error as any).code;
      if (errorCode === "auth/email-already-in-use") {
        MySwal.fire({
          icon: "warning",
          title: "Warning!",
          text: "Email has already been registered !!!",
        });
      } else {
        toast.error((error as Error).message, {
          position: "top-center",
        });
      }
    } finally {
      setIsRegistering(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div
          className="register-form"
          style={{
            left: activeForm === "register" ? "50%" : "-50%",
            opacity: activeForm === "register" ? 1 : 0,
          }}
        >
          <div className="form-title">
            <span>Create Account</span>
          </div>
          <div className="form-inputs">
            <div className="scroll-form-inputs">
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="bx bx-envelope icon"></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <i className="bx bx-user icon"></i>
              </div>
              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <i
                  className={`bx ${
                    showConfirmPassword ? "bx-hide" : "bx-show"
                  } icon`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <i className="bx bx-mobile icon"></i>
              </div>
            </div>
            <div className="forgot-pass">
              <Link to="/ForgetPass">Forgot Password?</Link>
            </div>
            <div className="input-box">
              <button
                className="input-submit"
                disabled={isRegistering}
                style={{
                  backgroundColor: isRegistering ? "#ccc" : "", // Đổi màu khi đang xử lý
                  cursor: isRegistering ? "not-allowed" : "pointer",
                  opacity: isRegistering ? 0.7 : 1,
                }}
              >
                <span>{isRegistering ? "Processing..." : "Sign Up"}</span>
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
          </div>
          <div className="social-login">
            <GoogleLogin />
            <i className="bx bxl-facebook"></i>
            <i className="bx bxl-github"></i>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ResgiterForm;
