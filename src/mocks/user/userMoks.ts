import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserCredentials } from "../../types";

export const userCredentialsMock: UserCredentials = {
  username: "Gines",
  password: "Gines123",
};

export const userCredientialsHashMock: UserCredentials = {
  ...userCredentialsMock,
  password: "$2y$10$D65bZwWfxmMyif9KFITP6./83OwYCwS4claM4rGXtcG0ZW43xlamy",
};

export const userErrorCredientialsMock: UserCredentials = {
  ...userCredentialsMock,
  password: "",
};

export const userIdMock = "6494430a47f8ed0069ec52ac";

const tokenPayload: JwtPayload = {
  sub: userIdMock,
  name: userCredentialsMock.username,
};

export const tokenMock = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
  expiresIn: "30d",
});
