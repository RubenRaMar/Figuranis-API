import { type MessageList, type StatusCodeList } from "./types.js";

export const statusCodeList: StatusCodeList = {
  ok: 200,
  wrongCredentials: 401,
  endpointNotFound: 404,
  generalError: 500,
};

export const publicMessageList: MessageList = {
  ok: {
    ok: "OK",
    pong: "The server responds correctly",
  },
  wrongCredentials: "User name and password do not match",
  endpointNotFound: "You have not established a correct route",
  generalError: "The server has failed, please try again in a few minutes",
};

export const privateMessageList: MessageList = {
  ok: {
    ok: "OK",
    pong: "🏓 Pong",
  },
  wrongCredentials: "Wrong credentials",
  endpointNotFound: "Endpoint not found",
  generalError: "Internal Server Error",
};
