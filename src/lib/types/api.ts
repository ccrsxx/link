export type APIResponse<T = void> = {
  data?: T;
  message: string;
};
