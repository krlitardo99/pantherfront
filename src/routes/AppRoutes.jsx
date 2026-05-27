import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import SalesPage from "../features/sales/pages/SalesPage";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ProductsPage from "../features/products/pages/ProductsPage";
import ClientsPage from "../features/clients/pages/ClientsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>

              <SalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>

              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsPage/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/home"
          element={
            <ProtectedRoute>
              
              <DashboardPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;