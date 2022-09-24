import { Routes, Route } from "react-router-dom";
import MainNav from "./pages/MainNav";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import Payroll from "./pages/Payroll";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <AuthProvider>
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
            ></Route>
            <Route path=":employeeId" element={<Employee />} />
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
    </AuthProvider>
  );
}

export default App;
