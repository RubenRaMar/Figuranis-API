import { type UserCredentials } from "../../types";

export const userCredentialsMock: UserCredentials = {
  username: "Gines",
  password: "Gines123",
};

export const userCredientialsHashMock = {
  ...userCredentialsMock,
  password: "$2y$10$D65bZwWfxmMyif9KFITP6./83OwYCwS4claM4rGXtcG0ZW43xlamy",
};

export const userErrorCredientialsMock = {
  ...userCredentialsMock,
  password: "",
};

export const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYzUwOTEwYzhlOGM1YjE3ZDU0YTciLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODY0MTM0OTZ9.5XoNWHoBShVwzueW00XYZZarJb5m7hKRunZLPp9v9n0";
