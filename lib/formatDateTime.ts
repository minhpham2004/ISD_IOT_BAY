export function formatDateTime(dateTime: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Australia/Sydney",
  };

  return new Intl.DateTimeFormat("en-US", options).format(dateTime);
}
