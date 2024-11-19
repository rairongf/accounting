import { api, PaginatedRepository } from "@/modules/common";

export type FindManyCompaniesRepositoryQuery = {
  name?: string;
  taxId?: string;
};

export type FindManyCompaniesRepositoryCompanyData = {
  id: number,
  name: string,
  taxId: string,
  deletedAt?: Date,
};

type FindManyCompaniesRepository = PaginatedRepository<FindManyCompaniesRepositoryCompanyData, FindManyCompaniesRepositoryQuery>;

export const findManyCompanies: FindManyCompaniesRepository = async ({page, limit, name, taxId}) => {
  const params = new URLSearchParams();
  if (page) params.append('page', `${page}`);
  if (limit) params.append('limit', `${limit}`);
  if (name) params.append('name', `${name}`);
  if (taxId) params.append('taxId', `${taxId}`);

  return await api.get(`/companies?${params.toString()}`);
}