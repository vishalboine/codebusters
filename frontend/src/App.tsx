import Login from "./pages/auth/login/Login";
import { Routes, Route } from 'react-router-dom';
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./config/RequireAuth";
import Layout from "./components/layouts/Layout";
import Unauthorized from "./pages/public/Unauthorized";
import NotFound from "./pages/public/NotFound";
import PersistLogin from "./config/PersistLogin";
import Admin from "./pages/admin/Admin";
import ToastLayout from "./components/layouts/ToastLayout";
import Users from "./pages/admin/Users";
import Profile from "./pages/profile/Profile";
import { ThemeContext } from '../src/context/theme-context';
import { useState } from "react";

function App() {
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('default-theme');
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
        <Routes>
            <Route element={<ToastLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={['User', 'Admin']} />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/update-users" element={<Users />} />
                </Route>
              </Route>
            </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  )
}

export default App