import React from "react";
import Login from "./pages/auth/login/Login";
import { Routes, Route } from 'react-router-dom';
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./config/RequireAuth";
import Layout from "./components/layouts/Layout";
import Unauthorized from "./pages/public/Unauthorized";
import NotFound from "./pages/public/NotFound";
import PersistLogin from "./config/PersistLogin";
import { ROLES } from "./constants";
import Settings from "./pages/settings/Settings";
import Admin from "./pages/admin/Admin";
import ToastLayout from "./components/layouts/ToastLayout";
import Users from "./pages/admin/Users";

function App() {
  // Unlocking Innovation: Where Ideas Meet Code!
  return (
    <Routes>
        <Route element={<ToastLayout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/update-users" element={<Users />} />
            </Route>
          </Route>
        </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App