import { Outlet } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import NavTab from "../atoms/NavTab";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function MainNav() {
  const [page, setPage] = useState("");
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    return <Navigate to="/login" replace state={{ from: location }} />;
  };
  return (
    <>
      <Flex
        w={"100%"}
        bg={"blue.700"}
        h={"100%"}
        boxShadow="md"
        alignContent={"center"}
        justify={"space-between"}
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
        <Button mt={1.5} mr={7} size="sm" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Flex>

      <Outlet />
    </>
  );
}
