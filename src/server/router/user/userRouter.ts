import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../../controllers/user/userController.js";
import pathList from "../../utils/path/path.js";
import { loginValidation } from "../../../schema/loginSchema.js";

const userRouter = Router();

userRouter.post(pathList.login, loginValidation, loginUser);
userRouter.post(pathList.register, loginValidation, registerUser);

export default userRouter;
