import { userData } from "./userData";
import { useForm } from "react-hook-form";

export default function EmployeeEdit({ onClose, userId }) {
  const user = userData.find((user) => user.id === Number(userId));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onError = (err, e) => {
    console.log(err, e);
  };

  const onSubmit = (data) => {
    onClose();
    console.log(data);
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label htmlFor="name" id="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <p>This field is required</p>}
        <br />
        <label htmlFor="email" id="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          defaultValue={user.email}
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <p>This field is required</p>}
        <br />
        <label htmlFor="designation" id="designation">
          Designation
        </label>
        <input
          type="text"
          name="designation"
          defaultValue={user.designation}
          {...register("designation", {
            required: true,
          })}
        />
        {errors.designation && <p>This field is required</p>}
        <br />
        <label htmlFor="salary" id="salary">
          Salary
        </label>
        <input
          type="number"
          name="salary"
          defaultValue={user.salary}
          {...register("salary", {
            required: true,
          })}
        />
        {errors.salary && <p>This field is required</p>}
        <br />
        <label htmlFor="wallet" id="wallet">
          Wallet
        </label>
        <input
          type="text"
          name="wallet"
          defaultValue={user.wallet}
          {...register("wallet", {
            required: true,
          })}
        />
        {errors.wallet && <p>This field is required</p>}
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
