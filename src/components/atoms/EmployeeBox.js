import { Box, Avatar, Flex, HStack } from "@chakra-ui/react";

export default function PageHeader({ user }) {
  return (
    <Flex
      bg={"gray.100"}
      boxShadow="md"
      rounded="md"
      p={6}
      mb={6}
      alignItems={"center"}
    >
      <Avatar name={user.name} size="lg" />
      <HStack ml={5} spacing={"24px"}>
        <Box w={"10px"}>{user.id}</Box>
        <Box w={"130px"}>{user.name}</Box>
        <Box w={"80px"}>{user.designation}</Box>
      </HStack>
    </Flex>
  );
}
