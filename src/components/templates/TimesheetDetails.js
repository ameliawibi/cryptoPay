import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { userTimesheet } from "../userData";
import {
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";

export default function TimesheetDetails({ dateRange }) {
  const [defaultValues, setDefaultValues] = useState(null);

  const { control, register, handleSubmit, errors, reset } = useForm({
    defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    shouldUnregister: true,
    name: "timesheet_items",
  });

  useEffect(() => {
    //later change to use dateRange
    setDefaultValues({ timesheet_items: userTimesheet.timesheet_items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onSubmit = async (data) => {
    //later add the month and year using dateRange to the request body so that back end know which timesheet period should be saved
    console.log(data);
  };

  return (
    <>
      <Box p="6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TableContainer w={"90%"}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th w={"15%"}>Id</Th>
                  <Th w={"15%"}>Name</Th>
                  <Th w={"15%"}>Designation</Th>
                  <Th w={"15%"}>Working Hours</Th>
                  <Th w={"15%"}>Monthly Pay</Th>
                  <Th w={"15%"}>Tokens Paid</Th>
                </Tr>
              </Thead>
              <Tbody>
                {fields &&
                  fields.map((item, index) => (
                    <Tr key={item.id}>
                      <Td>{index + 1}</Td>
                      <Td textTransform={"capitalize"}>{item.name}</Td>
                      <Td>Designation</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          maxW={"150px"}
                          name={`timesheet_items[${index}].hoursWorked`}
                          {...register(
                            `timesheet_items[${index}].hoursWorked`,
                            {
                              required: true,
                            }
                          )}
                          defaultValue={item.hoursWorked}
                        />
                      </Td>
                      <Td>30.48</Td>
                      <Td>30.48</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </form>
      </Box>
      <Button type="submit">Submit</Button>
    </>
  );
}
