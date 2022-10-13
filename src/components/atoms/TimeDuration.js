import { DateTime } from "luxon";
import { HStack, Box, Center, Spacer, Heading } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

const dateFormat = "dd/MM/yyyy";

export default function createDurationLabel({ start_date, end_date }) {
  return (
    <HStack spacing="24px" alignContent={"center"} justifyContent="center">
      <Center>
        <CalendarIcon color="gray.500" />
      </Center>
      <Center>
        <Heading as={"h6"} size="xs" color={"gray.500"}>
          {DateTime.fromFormat(start_date, dateFormat).toFormat("dd MMM y")}
        </Heading>
      </Center>
      <Center>-</Center>
      <Center>
        <CalendarIcon color="gray.500" />
      </Center>
      <Center>
        <Heading as={"h6"} size="xs" color={"gray.500"}>
          {DateTime.fromFormat(end_date, dateFormat).toFormat("dd MMM y")}
        </Heading>
      </Center>
    </HStack>
  );
}
