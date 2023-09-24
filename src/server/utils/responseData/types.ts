export interface StatusCodeList {
  ok: number;
  add: number;
  wrongCredentials: number;
  notFound: number;
  generalError: number;
  badRequest: number;
}

export interface MessageList {
  ok: OkStructure;
  wrongCredentials: string;
  endpointNotFound: string;
  registerError: string;
  generalError: string;
  badRequest: string;
  delete: string;
  deleteError: string;
  add: string;
  addError: string;
  update: string;
  updateError: string;
}

interface OkStructure {
  pong: string;
  ok: string;
}
