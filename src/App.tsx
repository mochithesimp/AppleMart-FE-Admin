import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home-page/Home";
import LoginPage from "./pages/Login-page/Login";
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
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
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
