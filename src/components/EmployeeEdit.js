import { userData } from "./userData";

export default function EmployeeEdit({ onClose, userId }) {
  const user = userData.find((user) => user.id === Number(userId));

  return (
    <main style={{ padding: "1rem 0" }}>
      <label htmlFor="name" id="name">
        Name
      </label>
      <input type="text" name="name" value={user.name} />
      <br />
      <label htmlFor="email" id="email">
        Email
      </label>
      <input type="text" name="email" value={user.email} />
      <br />
      <label htmlFor="designation" id="designation">
        Designation
      </label>
      <input type="text" name="designation" value={user.designation} />
      <br />
      <label htmlFor="salary" id="salary">
        Salary
      </label>
      <input type="number" name="salary" value={user.salary} />
      <br />
      <label htmlFor="wallet" id="wallet">
        Wallet
      </label>
      <input type="text" name="wallet" value={user.wallet} />
      <button onClick={onClose}>Save</button>
    </main>
  );
}
