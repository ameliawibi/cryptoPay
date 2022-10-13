import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export function NavigationButton({ onClick, direction }) {
  return (
    <main>
      <IconButton
        type="button"
        variant="unstyled"
        _hover={{ color: "orange", fontWeight: "bold" }}
        onClick={onClick}
        fontSize="20px"
        icon={direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      />
    </main>
  );
}
