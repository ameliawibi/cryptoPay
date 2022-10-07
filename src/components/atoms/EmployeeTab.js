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
        bg: "orange.100",
        fontWeight: "bold",
        color: "orange",
      }}
      textAlign={"start"}
      onClick={handleClick}
      bg={tab === text ? "orange.100" : "white"}
      fontWeight={tab === text && "bold"}
      color={tab === text && "orange"}
    >
      {text}
    </Box>
  );
}
