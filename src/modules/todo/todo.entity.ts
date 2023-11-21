import { Entity } from 'src/common/resource/entity';

export interface Todo extends Entity {
  name: string;
  done_at: string | null;
  due_at: string;
}
