import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export default function Tab({ link, page, setPage, name }) {
  const change = () => {
    setPage(name);
  };

  return (
    <Box
      p={3}
      _hover={{ background: "orange.400" }}
      onClick={change}
      bg={page === name ? "orange.400" : "blue.800"}
      w={"100px"}
      textAlign={"center"}
      color={"white"}
    >
      <Link to={link}>{name}</Link>
    </Box>
  );
}
