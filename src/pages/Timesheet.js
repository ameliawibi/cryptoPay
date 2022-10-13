import { DateTime } from "luxon";
import { useForm, useWatch } from "react-hook-form";
import { Navigate } from "react-big-calendar";
import { background, Box, Flex } from "@chakra-ui/react";
import PageHeader from "../components/atoms/PageHeader";
import TimesheetDetails from "../components/templates/TimesheetDetails";
import createDurationLabel from "../components/atoms/TimeDuration";
import { NavigationButton } from "../components/atoms/NavigationButton";

const dateFormat = "dd/MM/yyyy";
const TimesheetDateRange = {
  monthly: "month",
};

const actionsMap = {
  changeDuration: undefined,
  [Navigate.PREVIOUS]: -1,
  [Navigate.NEXT]: 1,
};

export default function Timesheet() {
  const { control, setValue } = useForm({
    defaultValues: {
      dateRange: {
        start_date: DateTime.now()
          .startOf("month")
          .toFormat(dateFormat),
        end_date: DateTime.now()
          .endOf("month")
          .toFormat(dateFormat),
      },
    },
  });

  const dateRange = useWatch({
    control: control,
    name: "dateRange",
  });

  const navigate = (dateRange, timeFrame, setValue, action) => {
    if (!dateRange) return;
    const duration = TimesheetDateRange[timeFrame];
    const initialDate = DateTime.fromFormat(dateRange.start_date, dateFormat);
    const today = DateTime.now();
    const shouldNavigateOnCurrentMonth =
      actionsMap[action] === "undefined" && initialDate.month === today.month;

    const newDate = shouldNavigateOnCurrentMonth
      ? today
      : initialDate.plus({ [`${duration}s`]: actionsMap[action] });

    const startDate = newDate.startOf(duration);
    const endDate = newDate.endOf(duration);

    setValue("dateRange", {
      start_date: startDate.toFormat(dateFormat),
      end_date: endDate.toFormat(dateFormat),
    });
  };

  function onNavigatePrev() {
    return navigate(dateRange, "monthly", setValue, Navigate.PREVIOUS);
  }

  function onNavigateNext() {
    return navigate(dateRange, "monthly", setValue, Navigate.NEXT);
  }

  return (
    <Box
      mh={"95vh"}
      h={"100%"}
      w={"100%"}
      bgGradient="linear(to-l, purple.800, blue.700)"
      overflow={"hidden"}
    >
      <main style={{ padding: "1rem 0" }}>
        <Box
          bg={"white"}
          p={7}
          w={"90%"}
          margin={"auto"}
          mt={"10"}
          boxShadow="md"
          rounded="md"
          h={"87vh"}
          minH={"100%"}
        >
          <PageHeader text={"Timesheet"} />
          <Flex alignContent={"stretch"}>
            <NavigationButton onClick={onNavigatePrev} direction="left" />
            <Box
              color={"blue.800"}
              w={"380px"}
              my={"auto"}
              textAlign={"center"}
            >
              {dateRange && createDurationLabel(dateRange)}
            </Box>
            <NavigationButton onClick={onNavigateNext} direction="right" />
          </Flex>
          <input hidden type="text" control={control} name="dateRange" />
          <TimesheetDetails dateRange={dateRange} />
        </Box>
      </main>
    </Box>
  );
}
