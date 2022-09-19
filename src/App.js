import { Routes, Route } from "react-router-dom";
import MainNav from "./pages/MainNav";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />

        <Route path="employees" element={<MainNav />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="payroll"
            element={
              <ProtectedRoute>
                <Payroll />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
