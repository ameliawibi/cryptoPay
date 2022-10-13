import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { userData } from "../components/userData";
import PageHeader from "../components/atoms/PageHeader";
import {
  Box,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Employees() {
  const [searchEmployee, setEmployeeSearch] = useState("");
  const [employeeData, setEmployeeData] = useState(userData);

  const changeInput = (event) => {
    const searched = event.target.value;
    setEmployeeSearch(searched);
    if (event.target.value === "") {
      setEmployeeData(userData);
    } else {
      const filterName = userData.filter(
        (data) => data.name.toLowerCase() === searched.toLowerCase()
      );
      const filterEmail = userData.filter(
        (data) => data.email.toLowerCase() === searched.toLowerCase()
      );
      setEmployeeData([...filterEmail, ...filterName]);
    }
  };

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
              onChange={changeInput}
            />
          </InputGroup>

          {employeeData.map((user) => (
            <Box>
              <Link to={`/employees/${user.id}`} key={user.id}>
                <Box boxShadow="md" rounded="md">
                  <Avatar name={user.name} size="lg" mb={6} p={3} />
                  {user.id}
                  {user.name}
                  {user.designation}
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
