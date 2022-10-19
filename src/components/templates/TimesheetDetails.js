import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import axios from "axios";
import { url } from "../../utils/url";

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

  let dateRangeStr = JSON.stringify(dateRange);

  const initialize = async () => {
    try {
      let response = await axios.get(
        `${url}/timesheet?dateRange=${dateRangeStr}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        let timesheet_items = response.data.users
          .map((Item) => ({
            ...Item,
            ...Item.UserTimesheets[0],
          }))
          .map((Item) => {
            Item.id = Item.UserTimesheets[0]?.id;
            delete Item.Timesheet;
            delete Item.UserTimesheets;
            return Item;
          });

        setDefaultValues({ timesheet_items });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onSubmit = async (data) => {
    //later add the month and year using dateRange to the request body so that back end know which timesheet period should be saved
    try {
      let response = await axios.post(`${url}/update-timesheet/`, data);
      if (response.status === 200) {
        initialize();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p="6">
          <TableContainer
            w={"100%"}
            shadow={"md"}
            p="6"
            rounded="md"
            backgroundColor={"gray.100"}
          >

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
                      <Td textTransform={"capitalize"}>{item.designation}</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          maxW={"150px"}
                          backgroundColor={"gray.200"}
                          name={`timesheet_items[${index}].workingHours`}

                          {...register(
                            `timesheet_items[${index}].workingHours`,
                            {
                              required: true,
                            }
                          )}
                          defaultValue={item.workingHours}
                        />
                      </Td>
                      <Td>{item.totalPay}</Td>
                      <Td>{item.tokensPaid}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
