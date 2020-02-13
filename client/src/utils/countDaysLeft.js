export default function countDaysLeft(startDate, term) {
  if (startDate !== null) {
    let start = new Date(startDate);
    let today = new Date();
    let daysFromStart = Math.floor((today - start) / 86400000);
    let calculatedDays = term - daysFromStart;
    // calculatedDays === 0 ? '0' : `${calculatedDays}`;
    return isNaN(calculatedDays) ? term : calculatedDays;
  } else {
    return term;
  }
}
