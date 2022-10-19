import { useState } from "react";
import { useParams } from "react-router-dom";
import { userData } from "../components/userData";
import EmployeeTab from "../components/atoms/EmployeeTab";
import EmployeeEdit from "../components/templates/EmployeeEdit";
import EmpOverview from "../components/templates/EmpOverview";
import WalletInformation from "../components/templates/WalletInformation";
import { Avatar, Box, Flex, Divider, Center } from "@chakra-ui/react";
import Background from "../components/atoms/Background";

export default function Employee() {
  // const [editForm, renderEditForm] = useState(false);
  const [tab, setTab] = useState("Overview");
  let params = useParams();
  const user = userData.find((user) => user.id === Number(params.employeeId));

  return (
    <Background>
      <Flex gap={8}>
        <Box alignContent={"center"} minWidth={"200px"}>
          <Center>
            <Avatar name={user.name} size="2xl" mb={6} />
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
            <WalletInformation salary={user.salary} wallet={user.wallet} />
          )}
          {tab === "Edit Account" && (
            <EmployeeEdit userId={params.employeeId} />
          )}
        </Box>
      </Flex>
    </Background>
  );
}
