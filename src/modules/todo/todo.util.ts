import { parseDate } from 'src/utils/date';
import { Todo } from './todo.entity';

export function isLate(todo: Todo): boolean {
  return !todo.done_at && parseDate(todo.due_at).isBefore(new Date());
}
