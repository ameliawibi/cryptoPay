import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import PageHeader from "../components/atoms/PageHeader";
import {
  Box,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { url } from "../utils/url";

export default function Employees() {
  const [employeeData, setEmployeeData] = useState(null);
  //     set search query to empty string
  const [searchEmployee, setEmployeeSearch] = useState("");
  //     set search parameters
  //     this list can be longer if you want
  //     just add it to this array
  const [searchParam] = useState(["name", "email", "designation"]);

  const initialize = async () => {
    try {
      const response = await axios.get(`${url}/employees`);
      if (response) {
        const allEmployees = response.data.allEmployees;

        setEmployeeData(allEmployees);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Box
      minH={"95vh"}
      h={"100%"}
      w={"100%"}
      bgGradient="linear(to-l, purple.800, blue.700)"
      overflow={"hidden"}
    >
      <main style={{ padding: "1rem 0" }}>
        <Box
          bg={"white"}
          p={7}
          w={"90%"}
          margin={"auto"}
          mt={"10"}
          boxShadow="md"
          rounded="md"
          h={"100%"}
          minH={"85vh"}
        >
          <PageHeader text={"Employees"} />
          <InputGroup mb={5} w={"25%"} size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search"
              focusBorderColor="blue.800"
              color={"gray"}
              value={searchEmployee}
              onChange={(e) => setEmployeeSearch(e.target.value)}
            />
          </InputGroup>

          {employeeData &&
            employeeData
              .filter((user) => {
                return searchParam.some((newItem) => {
                  return (
                    user[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(searchEmployee.toLowerCase()) > -1
                  );
                });
              })
              .map((user) => (
                <Box key={user.id}>
                  <Link to={`/employees/${user.id}`} key={user.id}>
                    <Box
                      boxShadow="md"
                      rounded="md"
                      display="flex"
                      alignItems="center"
                      alignContent="center"
                      p={6}
                    >
                      <HStack spacing={10}>
                        <Avatar name={user.name} size="lg" p={3} />
                        <Text fontSize="sm">{user.id}</Text>
                        <Text fontSize="sm">{user.name}</Text>
                        <Text fontSize="sm">{user.designation}</Text>
                        <Text fontSize="sm">{user.email}</Text>
                      </HStack>
                    </Box>
                  </Link>
                </Box>
              ))}

          <Outlet />
        </Box>
      </main>
    </Box>
  );
}
