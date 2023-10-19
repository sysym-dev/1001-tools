import { Entity } from './entity';

export interface ResourceCollection<T extends Entity> {
  meta: {
    page: {
      size: number;
      number: number;
    };
    total: number;
  };
  rows: T[];
}
