import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Authentication-page/UserAuth";
import AdminPage from "./pages/Admin-page/Admin";
import DashboardPage from "./pages/Admin-page/Overview-page/DashboardPage";
import ProductsPage from "./pages/Admin-page/Products-page/ProductsPage";
import UsersPage from "./pages/Admin-page/Users-page/UsersPage";
import SalesPage from "./pages/Admin-page/Sales-page/SalesPage";
import OrdersPage from "./pages/Admin-page/Orders-page/OrdersPage";
import SettingsPage from "./pages/Admin-page/Settings-page/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />, // Chuyển hướng về trang login
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Admin",
    element: <AdminPage />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> }, 
      { path: "users", element: <UsersPage /> },
      { path: "sales", element: <SalesPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
