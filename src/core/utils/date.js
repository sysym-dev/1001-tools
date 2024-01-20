import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import objectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(objectSupport);
dayjs.extend(relativeTime);

export function date(string) {
  return dayjs(string);
}
export function createDate(string) {
  return date(string);
}
