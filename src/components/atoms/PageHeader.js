import { Heading } from "@chakra-ui/react";

export default function PageHeader({ text }) {
  return (
    <Heading as="h2" size="lg" color={"white"} mb={6} fontWeight={"light"}>
      {text}
    </Heading>
  );
}
