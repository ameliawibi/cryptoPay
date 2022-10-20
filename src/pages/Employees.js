import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import PageHeader from "../components/atoms/PageHeader";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import pageBackground from "../pageBg.jpg";
import { url } from "../utils/url";
import EmployeeBox from "../components/atoms/EmployeeBox";
import Footer from "../components/atoms/Footer";

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
      minH={"94.3vh"}
      h={"100%"}
      w={"100%"}
      bgImage={pageBackground}
      bgSize={"cover"}
      overflow={"hidden"}
    >
      <main style={{ padding: "1rem 0" }}>
        <Box w={"90%"} margin={"auto"} mt={"10"}>
          <PageHeader text={"Employees"} />
        </Box>
        <Box
          w={"90%"}
          margin={"auto"}
          mt={"5"}
          rounded="md"
          minH={"75vh"}
          h={"100%"}
        >
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
                    <EmployeeBox user={user} />
                  </Link>
                </Box>
              ))}
          <Outlet />
        </Box>
        <Footer />
      </main>
    </Box>
  );
}
