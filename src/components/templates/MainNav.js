import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import NavTab from "../atoms/NavTab";

export default function MainNav() {
  const [page, setPage] = useState("");

  return (
    <>
      <Flex
        w={"100%"}
        bg={"blue.700"}
        h={"100%"}
        boxShadow="md"
        alignContent={"center"}
      >
        <Flex ml={7} h={"100%"}>
          <NavTab
            setPage={setPage}
            name="Employee"
            page={page}
            link="/employees"
          />
          <NavTab
            setPage={setPage}
            name="Timesheet"
            page={page}
            link="timesheet"
          />
          <NavTab setPage={setPage} name="Payroll" page={page} link="payroll" />
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}
