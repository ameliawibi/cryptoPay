import { userData } from "./userData";

export default function EmployeeView({ userId }) {
  const user = userData.find((user) => user.id === Number(userId));
  return (
    <main style={{ padding: "1rem 0" }}>
      <h4>Name</h4>
      <p>{user.name}</p>
      <h4>Email</h4>
      <p>{user.email}</p>
      <h4>Designation</h4>
      <p>{user.designation}</p>
      <h4>Salary</h4>
      <p>{user.salary}</p>
      <h4>Wallet</h4>
      <p>{user.wallet}</p>
      <h4>isHR</h4>
      <p>{user.isHR.toString()}</p>
    </main>
  );
}
