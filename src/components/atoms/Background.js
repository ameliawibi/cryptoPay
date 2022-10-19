import { Box } from "@chakra-ui/react";

export default function Background(props) {
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
          {props.children}
        </Box>
      </main>
    </Box>
  );
}
