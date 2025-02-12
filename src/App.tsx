// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home-page/Home";
import LoginPage from "./pages/Login-page/Login";
import AdminPage from "./pages/Admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/Admin',
    element: <AdminPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
