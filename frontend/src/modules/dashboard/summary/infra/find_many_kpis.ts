import { api, BaseRepository } from "@/modules/common";

type FindManyKpisRepositoryQuery = {
  types?: string[];
};

export type FindManyKpisRepositoryKpiData = {
  name: string;
  sort: number;
  value?: number;
};

type FindManyKpisRepository = BaseRepository<FindManyKpisRepositoryKpiData[], FindManyKpisRepositoryQuery>;

export const findManyKpis: FindManyKpisRepository = async (query) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (!value || value.length === 0) continue;
    value.forEach((v) => {
      params.append(key, v);
    });
  }

  return await api.get(`/kpis?${params.toString()}`);
}