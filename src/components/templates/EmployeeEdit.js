import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  Heading,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { url } from "../../utils/url";

export default function EmployeeEdit({ userId }) {
  //const user = userData.find((user) => user.id === Number(userId));

  const [user, setUser] = useState(null);

  const initialize = async () => {
    try {
      const response = await axios.get(`${url}/employees`);
      if (response) {
        const allEmployees = response.data.allEmployees;

        setUser(allEmployees.find((user) => user.id === Number(userId)));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onError = (err, e) => {
    console.log(err, e);
  };

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${url}/update-employee/${userId}`, data);
      if (response.status === 200) {
        initialize();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user && (
        <main style={{ padding: "1rem 0" }}>
          <Heading as="h4" size="md" color={"blue.800"} mb={6}>
            Edit Account Information
          </Heading>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Box mb={3} w={"100%"}>
              <FormControl isInvalid={errors.name}>
                <FormLabel
                  htmlFor="name"
                  id="name"
                  color={"blue.800"}
                  fontWeight="bold"
                >
                  Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  w={"75%"}
                  defaultValue={user.name}
                  {...register("name", {
                    required: { value: true, message: "This is required" },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mb={3} w={"100%"}>
              <FormControl isInvalid={errors.email}>
                <FormLabel
                  htmlFor="email"
                  id="email"
                  color={"blue.800"}
                  fontWeight="bold"
                >
                  Email
                </FormLabel>
                <Input
                  type="text"
                  name="email"
                  w={"75%"}
                  defaultValue={user.email}
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
              <FormControl isInvalid={errors.designation}>
                <FormLabel
                  htmlFor="designation"
                  id="designation"
                  color={"blue.800"}
                  fontWeight="bold"
                >
                  Designation
                </FormLabel>
                <Input
                  type="text"
                  name="designation"
                  w={"75%"}
                  defaultValue={user.designation}
                  {...register("designation", {
                    required: { value: true, message: "This is required" },
                  })}
                />
                <FormErrorMessage>
                  {errors.designation && errors.designation.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mb={3} w={"100%"}>
              <FormControl isInvalid={errors.salary}>
                <FormLabel
                  htmlFor="salary"
                  id="salary"
                  color={"blue.800"}
                  fontWeight="bold"
                  w={"75%"}
                >
                  Salary
                </FormLabel>
                <Input
                  type="number"
                  name="salary"
                  defaultValue={user.salary}
                  w={"75%"}
                  {...register("salary", {
                    required: { value: true, message: "This is required" },
                  })}
                />
                <FormErrorMessage>
                  {errors.salary && errors.salary.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box mb={3} w={"100%"}>
              <FormControl isInvalid={errors.wallet}>
                <FormLabel
                  htmlFor="walletAddress"
                  id="walletAddress"
                  color={"blue.800"}
                  fontWeight="bold"
                >
                  Wallet
                </FormLabel>
                <Input
                  type="text"
                  name="walletAddress"
                  defaultValue={user.walletAddress}
                  w={"75%"}
                  {...register("walletAddress", {
                    required: { value: true, message: "This is required" },
                  })}
                />
                <FormErrorMessage>
                  {errors.walletAddress && errors.walletAddress.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Button type="submit" mt={8} w={"150px"}>
              Save
            </Button>
          </form>
        </main>
      )}
    </div>
  );
}
