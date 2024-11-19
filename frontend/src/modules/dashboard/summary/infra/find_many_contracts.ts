import { api, PaginatedRepository } from "@/modules/common";

export type FindManyContractsRepositoryAcceptableSortByValues = 'company' | 'effective_date' | 'signed_at' | 'fee' | 'department';

export type FindManyContractsRepositoryQuery = {
  sortBy?: FindManyContractsRepositoryAcceptableSortByValues;
  sortDirection?: 'asc' | 'desc';
};

export type FindManyContractsRepositoryContractData = {
  id: number;
  company: string;
  effectiveDate: Date;
  signedAt: Date;
  fee: number;
  department: string;
};

type FindManyContractsRepository = PaginatedRepository<FindManyContractsRepositoryContractData, FindManyContractsRepositoryQuery>;

export const findManyContracts: FindManyContractsRepository = async ({page, limit, sortBy, sortDirection}) => {
  const params = new URLSearchParams();
  if (page) params.append('page', `${page}`);
  if (limit) params.append('limit', `${limit}`);
  if (sortBy) params.append('sortBy', `${sortBy}`);
  if (sortDirection) params.append('sortDirection', `${sortDirection}`);

  /* for (const [key, value] of Object.entries(filters)) {
    if (!value || value.length === 0) continue;
    value.forEach((v) => {
      params.append(key, v);
    });
  } */

  return await api.get(`/contracts?${params.toString()}`);
}