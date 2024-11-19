import { BaseRepository } from '.';
import { PaginatedData } from '../../domain';

export type PaginatedRepositoryArguments<A = object> = A & {
  /**
   * The requested page number.
   * 
   * Default: 1
   */
  page?: number;

  /**
   * The maximum amount of items to return per page.
   * 
   * Default: 10
   * Min: 10
   * Max: 50
   */
  limit?: number;
};

export type PaginatedRepository<T, A = unknown> = BaseRepository<
  PaginatedData<T>,
  PaginatedRepositoryArguments<A>
>;