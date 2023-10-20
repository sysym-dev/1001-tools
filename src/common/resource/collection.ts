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

export interface LoadResourceCollectionParams {
  page?: {
    size?: number;
    number?: number;
  };
  filter?: Record<string, any>;
  sort?: string;
}
