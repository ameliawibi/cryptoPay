import { Link, Outlet } from "react-router-dom";
import { Flex, Spacer, Box, background } from "@chakra-ui/react";
import { useState } from "react";
import Tab from "../atoms/Tab";

export default function MainNav() {
  const [page, setPage] = useState("");

  return (
    <>
      <Flex
        w={"100%"}
        bg={"blue.800"}
        h={"100%"}
        boxShadow="md"
        alignContent={"center"}
      >
        <Flex ml={7} h={"100%"}>
          <Tab
            setPage={setPage}
            name="Employee"
            page={page}
            link="/employees"
          />
          <Tab
            setPage={setPage}
            name="Timesheet"
            page={page}
            link="timesheet"
          />
          <Tab setPage={setPage} name="Payroll" page={page} link="payroll" />
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
}
