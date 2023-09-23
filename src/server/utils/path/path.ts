import { type PathStructure } from "./types.js";

const pathList: PathStructure = {
  root: "/",
  user: "/user",
  register: "/register",
  login: "/login",
  figures: "/figures",
  delete: "/delete/:id",
  add: "/add-figure",
};

export default pathList;
