import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function formatDate(date: string | Date): string {
  return dayjs(date).format('LLL');
}

export function getTimestamp(date: string | Date): number {
  return dayjs(date).valueOf();
}

export function fromTimestamp(number: number): Dayjs {
  return dayjs(number);
}
