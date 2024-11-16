import { ServerApiResponse } from "../../domain";

export type BaseRepository<T, A = unknown> = (args: A) => Promise<ServerApiResponse<T>>;