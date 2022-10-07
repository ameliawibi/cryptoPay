import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { userData } from "../components/userData";
import PageHeader from "../components/atoms/PageHeader";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
    <Box ml={20} mt={5}>
      <main style={{ padding: "1rem 0" }}>
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

        <TableContainer w={"92%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Designation</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employeeData.map((user) => (
                <Tr _hover={{ background: "orange.100" }}>
                  <Td textTransform={"capitalize"}>
                    <Link to={`/employees/${user.id}`} key={user.id}>
                      {user.id}
                    </Link>
                  </Td>
                  <Td textTransform={"capitalize"}>
                    <Link to={`/employees/${user.id}`} key={user.id}>
                      {user.name}
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/employees/${user.id}`} key={user.id}>
                      {user.email}
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/employees/${user.id}`} key={user.id}>
                      {user.designation}
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Outlet />
      </main>
    </Box>
  );
}
