import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function formatDate(date: string | Date): string {
  return dayjs(date).format('LLL');
}
