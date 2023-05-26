export interface StatusCodeList {
  ok: number;
  wrongCredentials: number;
  endpointNotFound: number;
  generalError: number;
  badRequest: number;
}

export interface MessageList {
  ok: OkStructure;
  wrongCredentials: string;
  endpointNotFound: string;
  generalError: string;
  badRequest: string;
}

interface OkStructure {
  pong: string;
  ok: string;
}
