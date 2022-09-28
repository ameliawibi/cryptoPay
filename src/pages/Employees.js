import { Link, Outlet } from "react-router-dom";
import { userData } from "../components/userData";
import { Box, Heading, Flex, Image, HStack } from "@chakra-ui/react";

export default function Employees() {
  return (
    <Box ml={20} mt={5}>
      <main style={{ padding: "1rem 0" }}>
        <Heading as="h2" size="xl" color={"blue.800"} mb={6}>
          Employees
        </Heading>

        <Flex flexWrap={"wrap"}>
          {userData.map((user) => (
            <Flex boxShadow="md" p="6" rounded="md" bg="white" mr={6}>
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/employees/${user.id}`}
                key={user.id}
              >
                <Image
                  boxSize="200px"
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
                {user.name}
              </Link>
            </Flex>
          ))}

          <Outlet />
        </Flex>
      </main>
    </Box>
  );
}
