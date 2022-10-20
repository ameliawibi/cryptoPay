import { DateTime } from "luxon";
import { useForm, useWatch } from "react-hook-form";
import { Navigate } from "react-big-calendar";

import TimesheetDetails from "../components/templates/TimesheetDetails";
import Background from "../components/atoms/Background";
import DateToggleTimesheet from "../components/molecules/DateToggleTimesheet";

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
    <Background title={"Timesheet"}>
      <DateToggleTimesheet
        onNavigateNext={onNavigateNext}
        onNavigatePrev={onNavigatePrev}
        control={control}
        dateRange={dateRange}
      />

      <input hidden type="text" control={control} name="dateRange" />
      <TimesheetDetails dateRange={dateRange} />
    </Background>
  );
}
