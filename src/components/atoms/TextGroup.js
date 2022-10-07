import { Heading, Text } from "@chakra-ui/react";

export default function TextGroup({ text, head }) {
  return (
    <>
      <Heading
        as="h5"
        size="sm"
        color="blue.800"
        mt={4}
        textTransform="capitalize"
      >
        {head}
      </Heading>
      <Text>{text}</Text>
    </>
  );
}
