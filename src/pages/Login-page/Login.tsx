import Project from "../../assets/Untitled Project.png";
import mail from "../../assets/mail.png";
import coin from "../../assets/coin.png";
import stars from "../../assets/stars.png";
import mess from "../../assets/mess.png";
import setting from "../../assets/setting.png";
import store from "../../assets/store.png";
import safari from "../../assets/safari.png";
import call from "../../assets/call.png";
import "./Login.css";
const LoginPage = () => {
  return (
    <div className="all">
      <div className="loginContainers">
        <div className="form-container">
          <div className="col col-1">
            <div className="image-layer">
              <img src={coin} className="form-image coin" alt="coin" />
              <img src={Project} className="form-image-main" alt="main" />
              <img src={mail} className="form-image mail" alt="mail" />
              <img src={stars} className="form-image starts" alt="stars" />
              <img src={mess} className="form-image mess" alt="mess" />
              <img src={setting} className="form-image setting" alt="setting" />
              <img src={store} className="form-image store" alt="store" />
              <img src={call} className="form-image call" alt="call" />
              <img src={safari} className="form-image safari" alt="safari" />
            </div>
          </div>
          <div className="col col-2">
            <div className="btn-box">
              <button className="btn btn-1" id="login">
                Sign In
              </button>
              <button className="btn btn-2" id="register">
                Sign Up
              </button>
            </div>

            {/* Login Form Container */}
            <div className="login-form">
              <div className="form-title">
                <span>Sign In</span>
              </div>
              <div className="form-inputs">
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    required
                  />
                  <i className="bx bx-user icon"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    required
                  />
                  <i className="bx bx-lock-alt icon"></i>
                </div>
                <div className="forgot-pass">
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="input-box">
                  <button className="input-submit">
                    <span>Sign In</span>
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

            {/* Register Form Container */}
            <div className="register-form">
              <div className="form-title">
                <span>Create Account</span>
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
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    required
                  />
                  <i className="bx bx-user icon"></i>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    required
                  />
                  <i className="bx bx-lock-alt icon"></i>
                </div>
                <div className="forgot-pass">
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="input-box">
                  <button className="input-submit">
                    <span>Sign Up</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
