import { Routes, Route } from "react-router-dom";
import MainNav from "./components/templates/MainNav";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import Payroll from "./pages/Payroll";
import Timesheet from "./pages/Timesheet";
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
            />
            <Route
              path=":employeeId"
              element={
                <ProtectedRoute>
                  <Employee />
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
            <Route
              path="timesheet"
              element={
                <ProtectedRoute>
                  <Timesheet />
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
