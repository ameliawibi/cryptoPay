import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Center,
} from "@chakra-ui/react";

export default function LoginForm() {
  const { signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/employees";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    let { email, password } = data;
    await signIn(email, password);

    navigate(origin);
  };

  return (
    <Center w={"100%"}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "90%" }}>
        <Box mb={3} w={"100%"}>
          <FormControl isInvalid={errors.email}>
            <FormLabel color={"white"}>Email</FormLabel>
            <Input
              name="email"
              focusBorderColor={"white"}
              colorScheme={"white"}
              color="white"
              {...register("email", {
                required: { value: true, message: "This is required" },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb={3} w={"100%"}>
          <FormControl isInvalid={errors.password}>
            <FormLabel color={"white"}>Password</FormLabel>
            <Input
              type="password"
              name="password"
              focusBorderColor={"white"}
              colorScheme={"white"}
              color="white"
              {...register("password", {
                required: { value: true, message: "This is required" },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box mt={6} w={"100%"}>
          <Button type="submit" colorScheme="yellow" variant={"solid"}>
            Login
          </Button>
        </Box>
      </form>
    </Center>
  );
}
