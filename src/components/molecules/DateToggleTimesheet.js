import { Box, Flex } from "@chakra-ui/react";
import createDurationLabel from "../atoms/TimeDuration";
import { NavigationButton } from "../atoms/NavigationButton";

export default function DateToggleTimesheet({
  onNavigateNext,
  onNavigatePrev,
  control,
  dateRange,
}) {
  return (
    <>
      <Flex alignContent={"stretch"}>
        <NavigationButton onClick={onNavigatePrev} direction="left" />
        <Box color={"blue.800"} w={"380px"} my={"auto"} textAlign={"center"}>
          {dateRange && createDurationLabel(dateRange)}
        </Box>
        <NavigationButton onClick={onNavigateNext} direction="right" />
      </Flex>
      <input hidden type="text" control={control} name="dateRange" />
    </>
  );
}
