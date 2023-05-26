export interface StatusCodeList {
  ok: number;
  wrongCredentials: number;
  endpointNotFound: number;
  generalError: number;
}

export interface MessageList {
  ok: OkStructure;
  wrongCredentials: string;
  endpointNotFound: string;
  generalError: string;
}

interface OkStructure {
  pong: string;
  ok: string;
}
