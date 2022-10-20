import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export default function NavTab({ link, page, setPage, name }) {
  const change = () => {
    setPage(name);
  };

  return (
    <Box
      p={3}
      _hover={{ background: "#034eff" }}
      onClick={change}
      bg={page === name ? "#034eff" : "#001a37"}
      w={"100px"}
      textAlign={"center"}
      color={"white"}
      fontSize="sm"
    >
      <Link to={link}>{name}</Link>
    </Box>
  );
}
