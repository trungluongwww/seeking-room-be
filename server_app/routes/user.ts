import express, { Request, Response, Router } from "express";
import controllers from "../controllers";
import required from "./required";
import validations from "./validations";

export default (g: Router) => {
  let r = express.Router();
  g.use("/users", r);

  // get
  r.get("/profile", required.login, ...validations.user.profile, controllers.user.profile);
  r.get("/me", required.login, controllers.user.me);
  r.get("/rooms", required.login, ...validations.user.allRoom, controllers.user.allRoom);

  // post
  r.post("/register", ...validations.user.create, controllers.user.register);
  r.post("/login", ...validations.user.login, controllers.user.login);
  r.post("/forgot-password", ...validations.user.forgotPassword, controllers.user.forgotPassword);
  r.post("/reset-password", ...validations.user.resetPassword, controllers.user.resetPassword);

  // put
  r.put("/", required.login, ...validations.user.update, controllers.user.update);
  r.patch("/avatar", required.login, ...validations.user.changeAvatar, controllers.user.changeAvatar);
  r.patch("/password", required.login, ...validations.user.changePassword, controllers.user.changePassword);

  // favourite room
  r.get("/favourite-room", required.login, controllers.user.allFavouriteRoom);
  r.post("/favourite-room", required.login, controllers.user.addFavouriteRoom);
  r.delete("/favourite-room", required.login, controllers.user.removeFavouriteRoom);
};
