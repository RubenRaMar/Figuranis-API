import { type MessageList, type StatusCodeList } from "./types.js";

export const statusCodeList: StatusCodeList = {
  ok: 200,
  add: 201,
  badRequest: 400,
  wrongCredentials: 401,
  notFound: 404,
  generalError: 500,
};

export const publicMessageList: MessageList = {
  ok: {
    ok: "OK",
    pong: "The server responds correctly",
  },
  badRequest: "User name and password do not match",
  wrongCredentials: "User name and password do not match",
  endpointNotFound: "You have not established a correct route",
  registerError: "User could not be added",
  generalError: "The server has failed, please try again in a few minutes",
  delete: "The figure has been removed",
  deleteError: "No figure found",
  add: "Figure added correctly",
  addError: "Figure could not be added",
  update: "Correctly updated figure",
  updateError: "The figure could not be updated",
};

export const privateMessageList: MessageList = {
  ok: {
    ok: "OK",
    pong: "🏓 Pong",
  },
  badRequest: "Validation Failed",
  wrongCredentials: "Wrong credentials",
  endpointNotFound: "Endpoint not found",
  registerError: "User could not be added",
  generalError: "Internal Server Error",
  delete: "The figure has been removed",
  deleteError: "No figure found",
  add: "Figure added correctly",
  addError: "Figure could not be added",
  update: "Correctly updated figure",
  updateError: "The figure could not be updated",
};
