import { Box } from "@chakra-ui/react";

export default function EmployeeTab({ text, setTab, tab }) {
  const handleClick = () => {
    setTab(text);
  };

  return (
    <Box
      as="button"
      p={1}
      _hover={{
        bg: "blue.100",
        fontWeight: "bold",
        color: "blue.700",
      }}
      textAlign={"start"}
      onClick={handleClick}
      bg={tab === text ? "blue.100" : "white"}
      fontWeight={tab === text && "bold"}
      color={tab === text && "blue.700"}
    >
      {text}
    </Box>
  );
}
