import { Heading } from "@chakra-ui/react";

export default function PageHeader({ text }) {
  return (
    <Heading as="h2" size="xl" color={"blue.800"} mb={6}>
      {text}
    </Heading>
  );
}
