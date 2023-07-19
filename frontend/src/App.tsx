
import Login from "./pages/auth/login/Login";
import { Routes, Route } from 'react-router-dom';
import Register from "./pages/auth/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./config/RequireAuth";
import Layout from "./components/layouts/Layout";
import Unauthorized from "./pages/public/Unauthorized";
import NotFound from "./pages/public/NotFound";

const Roles = {
  'User': 2001,
  'Admin': 2002
}

function App() {
  // Unlocking Innovation: Where Ideas Meet Code!
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  )
}

export default App