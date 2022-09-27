import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
//import { useAuth } from "../hooks/useAuth";
import { Button } from "@chakra-ui/react";

export default function Login() {
  //const {user, signIn} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/employees";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onError = (err, e) => {
    console.log(err, e);
  };

  const onSubmit = (data) => {
    console.log(data);
    //signIn(email,password);
    navigate(origin);
  };

  return (
    <>
      <h1>Login page</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>Email</label>
        <input
          name="email"
          placeholder="Your email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && <p>This field is required</p>}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password && <p>This field is required</p>}
        <br />
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </form>
    </>
  );
}
