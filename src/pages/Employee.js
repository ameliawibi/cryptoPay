import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeTab from "../components/atoms/EmployeeTab";
import EmployeeEdit from "../components/templates/EmployeeEdit";
import EmpOverview from "../components/templates/EmpOverview";
import WalletInformation from "../components/templates/WalletInformation";
import { Avatar, Box, Flex, Divider, Center } from "@chakra-ui/react";
import axios from "axios";
import Background from "../components/atoms/Background";
import { url } from "../utils/url";

export default function Employee() {
  let params = useParams();
  const [tab, setTab] = useState("Overview");
  const [user, setUser] = useState(null);

  const initialize = async () => {
    try {
      const response = await axios.get(`${url}/employees`);
      if (response) {
        const allEmployees = response.data.allEmployees;

        setUser(
          allEmployees.find((user) => user.id === Number(params.employeeId))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Box>
      {user && (
        <Background>
          <Flex gap={8}>
            <Box alignContent={"center"} minWidth={"200px"}>
              <Center>
                <Avatar
                  name={user.name}
                  size="2xl"
                  mb={6}
                  bg={"gray.100"}
                  color={"#034eff"}
                />
              </Center>
              <Flex flexDirection={"column"}>
                <EmployeeTab text={"Overview"} setTab={setTab} tab={tab} />
                <EmployeeTab
                  text={"Wallet Information"}
                  setTab={setTab}
                  tab={tab}
                />
                <EmployeeTab text={"Edit Account"} setTab={setTab} tab={tab} />
              </Flex>
            </Box>
            <Divider orientation="vertical" h={"100%"} minH={"70vh"} />
            <Box w={"100%"}>
              {tab === "Overview" && (
                <EmpOverview
                  name={user.name}
                  designation={user.designation}
                  email={user.email}
                />
              )}
              {tab === "Wallet Information" && (
                <WalletInformation
                  salary={user.salary}
                  wallet={user.walletAddress}
                />
              )}
              {tab === "Edit Account" && (
                <EmployeeEdit userId={params.employeeId} />
              )}
            </Box>
          </Flex>
        </Background>
      )}
    </Box>
  );
}
