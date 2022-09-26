import { useFieldArray } from "react-hook-form";

export default function FieldArray({
  control,
  register,
  defaultValues,
  errors,
}) {
  const { fields } = useFieldArray({
    control,
    shouldUnregister: true,
    name: "timesheet_items",
  });

  console.log(fields);

  return (
    <>
      <p>Timesheet Details</p>
      {fields &&
        fields.map((item, index) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>Hours worked</p>
            <input
              type="number"
              name={`timesheet_items[${index}].hoursWorked`}
              {...register(`timesheet_items[${index}].hoursWorked`, {
                required: true,
              })}
              defaultValue={item.hoursWorked}
            />
          </div>
        ))}
    </>
  );
}
