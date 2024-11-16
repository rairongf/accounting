
export type BaseUsecase<T = void, A = unknown> = (args: A) => Promise<T>;
