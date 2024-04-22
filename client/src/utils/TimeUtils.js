export const findJobPostedDuration = ({ job }) => {
  const jobPostedDate = new Date(job.job_posted_at_timestamp * 1000);
  const now = new Date();

  const diffInMilliseconds = now - jobPostedDate;

  const millisecondsPerSecond = 1000;
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const daysPerMonth = 30;
  const daysPerYear = 365;

  const diffInSeconds = diffInMilliseconds / millisecondsPerSecond;
  const diffInMinutes = diffInSeconds / secondsPerMinute;
  const diffInHours = diffInMinutes / minutesPerHour;
  const diffInDays = diffInHours / hoursPerDay;

  if (diffInDays >= daysPerYear) {
    const years = Math.floor(diffInDays / daysPerYear);
    return `${years} year(s) ago`;
  } else if (diffInDays >= daysPerMonth) {
    const months = Math.floor(diffInDays / daysPerMonth);
    return `${months} month(s) ago`;
  } else if (diffInDays >= 1) {
    const days = Math.floor(diffInDays);
    return `${days} day(s) ago`;
  } else if (diffInHours >= 1) {
    const hours = Math.floor(diffInHours);
    return `${hours} hour(s) ago`;
  } else if (diffInMinutes >= 1) {
    const minutes = Math.floor(diffInMinutes);
    return `${minutes} minute(s) ago`;
  } else {
    const seconds = Math.floor(diffInSeconds);
    return `${seconds} second(s) ago`;
  }
};

export const convertTo12Hour = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":");

  let hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  const period = hour >= 12 ? "PM" : "AM";

  hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  const formattedTime = `${hour}${period}`;
  return formattedTime;
};

export const convertToDateFormat = (dateString) => {
  const expirationDate = new Date(dateString);

  const day = expirationDate.getDate();
  const year = expirationDate.getFullYear();

  const monthNames = [
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
  ];
  const month = monthNames[expirationDate.getMonth()];
  const formattedDate = `${month} ${day} ${year}`;
  return formattedDate;
};

export const convertMonthsToYears = (months) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return remainingMonths > 0
    ? `${years}.${remainingMonths} year(s)`
    : `${years} year(s)`;
};
