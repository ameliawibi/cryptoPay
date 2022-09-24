import { Link, Outlet } from "react-router-dom";
import { userData } from "../components/userData";

export default function Employees() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          {userData.map((user) => (
            <Link
              style={{ display: "block", margin: "1rem 0" }}
              to={`/employees/${user.id}`}
              key={user.id}
            >
              {user.name}
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    </main>
  );
}
