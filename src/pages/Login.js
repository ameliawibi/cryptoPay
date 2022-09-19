import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/employees";

  const onSubmit = () => {
    navigate(origin);
  };

  return (
    <>
      <h1>Login page</h1>
      <button onClick={onSubmit}>Login</button>
    </>
  );
}
