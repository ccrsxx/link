export type APIResponse<T = void> = T extends void ? { message: string } : T;
