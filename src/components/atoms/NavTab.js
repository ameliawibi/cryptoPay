import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export default function NavTab({ link, page, setPage, name }) {
  const change = () => {
    setPage(name);
  };

  return (
    <Box
      p={3}
      _hover={{ background: "purple.600" }}
      onClick={change}
      bg={page === name ? "purple.600" : "blue.700"}
      w={"100px"}
      textAlign={"center"}
      color={"white"}
      fontSize="sm"
    >
      <Link to={link}>{name}</Link>
    </Box>
  );
}
