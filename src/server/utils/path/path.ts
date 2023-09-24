import { type PathStructure } from "./types.js";

const pathList: PathStructure = {
  root: "/",
  register: "/register",
  user: "/user",
  login: "/login",
  figures: "/figures",
  delete: "/delete/:id",
  add: "/add-figure",
};

export default pathList;
