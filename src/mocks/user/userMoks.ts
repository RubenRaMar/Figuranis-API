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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYzUwOTEwYzhlOGM1YjE3ZDU0YTciLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODYwMDM1NjQsImV4cCI6MTY4NjE3NjM2NH0.buKj9g11PeR6LwlPlkT3UXiTGJ-DDEHFaV5dPKKMu2o";
