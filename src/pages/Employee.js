import { useState } from "react";
import { useParams } from "react-router-dom";
import { userData } from "../components/userData";
import EmployeeTab from "../components/atoms/EmployeeTab";
import EmployeeEdit from "../components/templates/EmployeeEdit";
import PageHeader from "../components/atoms/PageHeader";
import EmpOverview from "../components/templates/EmpOverview";
import WalletInformation from "../components/templates/WalletInformation";
import { Avatar, Box, Flex, Divider, Center } from "@chakra-ui/react";

export default function Employee() {
  // const [editForm, renderEditForm] = useState(false);
  const [tab, setTab] = useState("Overview");
  let params = useParams();
  const user = userData.find((user) => user.id === Number(params.employeeId));

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
          boxShadow="md"
          p="6"
          w={"90%"}
          margin={"auto"}
          mt={"10"}
          rounded="md"
          bg="white"
          minH={"75vh"}
          h={"100%"}
        >
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
        </Box>
      </main>
    </Box>
  );
}
