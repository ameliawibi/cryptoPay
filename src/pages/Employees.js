import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { userData } from "../components/userData";
import PageHeader from "../components/atoms/PageHeader";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import EmployeeBox from "../components/atoms/EmployeeBox";
import { SearchIcon } from "@chakra-ui/icons";
import Background from "../components/atoms/Background";

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
    <Background>
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
        <Stack direction={["row", "column"]} align="stretch">
          <Link to={`/employees/${user.id}`} key={user.id}>
            <EmployeeBox user={user} />
          </Link>
        </Stack>
      ))}

      <Outlet />
    </Background>
  );
}
