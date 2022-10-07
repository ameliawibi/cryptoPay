import { Heading, Box, Text } from "@chakra-ui/react";
import TextGroup from "../atoms/TextGroup";

export default function EmpOverview({ name, email, designation }) {
  return (
    <Box>
      <Heading as="h4" size="md" mt={5} color={"blue.800"} mb={6}>
        Your Information
      </Heading>
      <TextGroup head={"name"} text={name} />
      <TextGroup head={"email"} text={email} />
      <TextGroup head={"designation"} text={designation} />
    </Box>
  );
}
