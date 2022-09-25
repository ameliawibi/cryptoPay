import { DateTime } from "luxon";
import { useForm, useWatch } from "react-hook-form";
import { Navigate } from "react-big-calendar";

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
        start_date: DateTime.now().startOf("month").toFormat(dateFormat),
        end_date: DateTime.now().endOf("month").toFormat(dateFormat),
      },
    },
  });

  const dateRange = useWatch({
    control: control,
    name: "dateRange",
  });

  const navigate = (dateRange, timeFrame, setValue, action) => {
    console.log(dateRange);
    if (!dateRange) return;
    const duration = TimesheetDateRange[timeFrame];
    const initialDate = DateTime.fromFormat(dateRange.start_date, dateFormat);
    const today = DateTime.now();
    const shouldNavigateOnCurrentMonth =
      actionsMap[action] === "undefined" && initialDate.month === today.month;

    const newDate = shouldNavigateOnCurrentMonth
      ? today
      : initialDate.plus({ [`${duration}s`]: actionsMap[action] });

    console.log(actionsMap[action]);

    const startDate = newDate.startOf(duration);
    const endDate = newDate.endOf(duration);

    setValue("dateRange", {
      start_date: startDate.toFormat(dateFormat),
      end_date: endDate.toFormat(dateFormat),
    });

    console.log(dateRange);
  };

  const createDurationLabel = ({ start_date, end_date }) =>
    `${DateTime.fromFormat(start_date, dateFormat).toFormat(
      "dd MMM y"
    )} - ${DateTime.fromFormat(end_date, dateFormat).toFormat("dd MMM y")}`;

  function NavigationButtons({ dateRange, onNavigatePrev, onNavigateNext }) {
    return (
      <main>
        <button type="button" onClick={onNavigatePrev}>
          Prev
        </button>
        <button type="button" onClick={onNavigateNext}>
          Next
        </button>
        <p>{dateRange && createDurationLabel(dateRange)}</p>
      </main>
    );
  }

  function onNavigatePrev() {
    return navigate(dateRange, "monthly", setValue, Navigate.PREVIOUS);
  }

  function onNavigateNext() {
    return navigate(dateRange, "monthly", setValue, Navigate.NEXT);
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <p>
        Timesheet for {dateRange.start_date} to {dateRange.end_date}
      </p>
      <input hidden type="text" control={control} name="dateRange" />
      <NavigationButtons
        dateRange={dateRange}
        onNavigatePrev={() => onNavigatePrev()}
        onNavigateNext={() => onNavigateNext()}
      />
    </main>
  );
}
