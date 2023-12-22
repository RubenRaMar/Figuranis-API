export interface CustomValidResponse {
  body: { token: string };
  statusCode: number;
}

export interface CustomErrorResponse {
  body: { message: string };
  statusCode: number;
}
