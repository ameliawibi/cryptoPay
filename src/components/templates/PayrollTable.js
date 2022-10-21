import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import toMonthName from "../../utils/numberToMonth";

export default function PayrollTable({ data }) {
  return (
    <TableContainer
      w={"90%"}
      m={"auto"}
      mt={5}
      shadow={"md"}
      p="6"
      rounded="md"
      backgroundColor={"gray.100"}
    >
      <Table>
        <Thead>
          <Tr>
            <Th w={"15%"} textAlign={"center"} color={"#001a37"}>
              Employee Name
            </Th>
            <Th w={"15%"} textAlign={"center"} color={"#001a37"}>
              Month
            </Th>
            <Th w={"15%"} textAlign={"center"} color={"#001a37"}>
              Year
            </Th>
            <Th w={"15%"} textAlign={"center"} color={"#001a37"}>
              Total Pay
            </Th>
            <Th w={"15%"} textAlign={"center"} color={"#001a37"}>
              Tokens Paid
            </Th>
            <Th w={"15%"} textAlign={"center"} color={"#001a37"}>
              To be Paid
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((item, index) => (
              <Tr key={item.id}>
                <Td textTransform={"capitalize"} textAlign={"center"}>
                  {item.name}
                </Td>
                <Td textAlign={"center"}>{toMonthName(item.month)}</Td>
                <Td textAlign={"center"}>{item.year}</Td>
                <Td textAlign={"center"}>{item.totalPay}</Td>
                <Td textAlign={"center"}>{item.tokensPaid}</Td>
                <Td textAlign={"center"}>{item.toBePaid}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
