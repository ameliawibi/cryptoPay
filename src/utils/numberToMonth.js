export default function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString([], {
    month: "long",
  });
}
