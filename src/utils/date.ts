import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export function formatDate(date: string | Date): string {
  return dayjs(date).format('LLL');
}

export function getTimestamp(date: string | Date): number {
  return dayjs(date).valueOf();
}

export function fromTimestamp(number: number): Dayjs {
  return dayjs(number);
}

export function isGreaterThan(
  firstDate: string | Date,
  secondDate: string | Date,
): boolean {
  return dayjs(firstDate).isAfter(dayjs(secondDate));
}

export function fromDate(date: string | Date, compare?: string | Date): string {
  const dateObj = dayjs(date);

  if (!compare) {
    return dateObj.fromNow();
  }

  return dayjs(date).from(dayjs(compare));
}
