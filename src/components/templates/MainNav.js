import { Outlet } from "react-router-dom";
import { Flex, Center, Image, Box } from "@chakra-ui/react";
import { useState } from "react";
import NavTab from "../atoms/NavTab";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import logo from "../../logo.png";
import { Link } from "react-router-dom";

export default function MainNav() {
  const [page, setPage] = useState("Employee");
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
        bg={"#001a37"}
        p={1}
        h={"100%"}
        boxShadow="xl"
        alignContent={"center"}
        justify={"space-between"}
      >
        <Flex h={"100%"}>
          <Center
            justifyContent={"center"}
            as="button"
            variant={"unstyled"}
            h={"90%"}
          >
            <Link to={"/employees"}>
              <Image src={logo} w={"55px"} h={"40px"} />
            </Link>
          </Center>
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
        <Box
          p={3}
          _hover={{ background: "#034eff" }}
          onClick={handleLogout}
          w={"100px"}
          textAlign={"center"}
          color={"white"}
          fontSize="sm"
        >
          Logout
        </Box>
      </Flex>

      <Outlet />
    </>
  );
}
