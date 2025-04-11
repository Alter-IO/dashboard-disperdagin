export interface IFetchGeneralResponse<T> {
  success: boolean;
  data: T;
}

export interface IFetchGeneralSuccessResponse<T> {
  message: string;
  data: T;
}
