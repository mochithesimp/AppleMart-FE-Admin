import {Project, mail, coin, stars, mess, setting, store, call, safari} from "../../../import/Import-assets";
import "../Style.css";
interface Col1Props {
  activeForm: "login" | "register" | "forget" | "changePass";
}
const Col1: React.FC<Col1Props> = ({ activeForm }) => {
  return (
    <div
      className="col col-1"
      style={{
        borderRadius: activeForm === "login" ? "0 30% 20% 0" : "0 20% 30% 0",
      }}
    >
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
  );
};
export default Col1;
