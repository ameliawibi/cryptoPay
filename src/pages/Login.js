import { useNavigate, useLocation } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";

export default function Login() {
  //const {user, signIn} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/employees";

  const onSubmit = () => {
    //signIn(email,password);
    navigate(origin);
  };

  return (
    <>
      <h1>Login page</h1>
      <button onClick={onSubmit}>Login</button>
    </>
  );
}
