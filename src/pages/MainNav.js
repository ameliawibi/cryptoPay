import { Link, Outlet } from "react-router-dom";

export default function MainNav() {
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/employees">Employees</Link>
        <Link to="payroll">Payroll</Link>
      </nav>
      <Outlet />
    </>
  );
}
