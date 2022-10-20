import { Box, Avatar, HStack } from "@chakra-ui/react";

export default function PageHeader({ user }) {
  return (
    <Box
      boxShadow="md"
      rounded="md"
      display="flex"
      alignItems="center"
      alignContent="center"
      p={6}
      bg={"white"}
      _hover={{ bg: "blue.100" }}
      mb={5}
    >
      <HStack spacing={5}>
        <Avatar
          name={user.name}
          size="lg"
          p={3}
          bg={"gray.100"}
          color={"#034eff"}
        />
        <Box fontSize="sm" w={"10px"}>
          {user.id}
        </Box>
        <Box fontSize="sm" w={"100px"}>
          {user.name}
        </Box>
        <Box fontSize="sm" w={"150px"}>
          {user.designation}
        </Box>
        <Box fontSize="sm" w={"150px"}>
          {user.email}
        </Box>
      </HStack>
    </Box>
  );
}
