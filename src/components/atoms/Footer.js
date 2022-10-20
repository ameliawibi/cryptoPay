import { Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      position={"absolute"}
      bottom={0}
      w={"100%"}
      h={"auto"}
      bg={"#001a37"}
      color={"white"}
      p={3}
      textAlign={"center"}
      fontSize={"xs"}
    >
      © 2022 Amelia | Aqif | Bernice
    </Box>
  );
}
