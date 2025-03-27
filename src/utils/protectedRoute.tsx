import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    MySwal.fire({
      title: "Login Required",
      text: "Please log in to continue.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/login", { replace: true });
    });

    return null; // Không render children khi chưa đăng nhập
  }

  return children;
};


export default ProtectedRoute;
