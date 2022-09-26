import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FieldArray from "../components/FieldArray";
import { userTimesheet } from "../components/userData";

export default function TimesheetDetails({ dateRange }) {
  console.log(dateRange.start_date);
  console.log(dateRange.end_date);
  const [defaultValues, setDefaultValues] = useState(null);

  const { control, register, handleSubmit, errors, reset } = useForm({
    defaultValues,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldArray {...{ control, register, defaultValues, errors }} />
      <button type="submit">Submit</button>
    </form>
  );
}
