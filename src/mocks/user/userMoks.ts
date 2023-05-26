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
