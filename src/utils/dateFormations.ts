export function formatDate(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export function formatTime(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  let hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert to 12-hour format, handle midnight (0)
  return `${hours} ${ampm}`;
}

export function formatDateTimeWithDay(
  dateString: string,
  locale: string
): string {
  const days = {
    en: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    ar: [
      "الأحد",
      "الأثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
  };

  const date = new Date(dateString);
  // Get day name
  const dayName = days[locale as keyof typeof days][date.getDay()];

  // Format date (DD/MM/YYYY)
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  // Format time (12-hour format with AM/PM)
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${dayName} ${formattedDate} at ${hours}:${minutes}${ampm}`;
}

export function formatDateWithLocale(
  dateString: string,
  locale: string
): string {
  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ar: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  };

  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getDate();
  const month = months[locale as keyof typeof months][date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
