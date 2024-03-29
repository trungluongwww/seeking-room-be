import { Response } from "express";
import { Request } from "express-jwt";
import {
  IForgotPasswordPayload,
  IResetPasswordPayload,
  IUserAddFavouriteRoomPayload,
  IUserChangeAvatarPayload,
  IUserChangePasswordPayload,
  IUserCreatePayload,
  IUserLoginPayload,
  IUserUpdatePayload,
} from "../../internal/interfaces/user";
import services from "../services";
import response from "../../external_node/ultils/response";
import { IRoomAllByUserQuery } from "../../internal/interfaces/room";

const register = async (req: Request, res: Response) => {
  const payload = req.body as IUserCreatePayload;

  const [rs, err] = await services.user.create.register(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const update = async (req: Request, res: Response) => {
  const payload = req.body as IUserUpdatePayload;
  const userId = req.auth?.id as string;

  const err = await services.user.update.fromClient(userId, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const login = async (req: Request, res: Response) => {
  const payload = req.body as IUserLoginPayload;

  const [rs, err] = await services.user.find.login(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const profile = async (req: Request, res: Response) => {
  const { userId } = req.query;

  const [rs, err] = await services.user.find.profile(userId as string);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const me = async (req: Request, res: Response) => {
  const id = req.auth?.id;

  const [rs, err] = await services.user.find.profile(id);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const allRoom = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const query: IRoomAllByUserQuery = req.query as never;

  const [rs, err] = await services.room.find.allByUserId(id, query);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const addFavouriteRoom = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const payload: IUserAddFavouriteRoomPayload = req.body as IUserAddFavouriteRoomPayload;

  const err = await services.user.create.addFavouriteRoom(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const removeFavouriteRoom = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const payload: IUserAddFavouriteRoomPayload = req.body as IUserAddFavouriteRoomPayload;

  const err = await services.user.del.removeFavouriteRoom(id, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const changeAvatar = async (req: Request, res: Response) => {
  const payload = req.body as IUserChangeAvatarPayload;
  const userId = req.auth?.id as string;

  const err = await services.user.update.changeAvatar(userId, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const changePassword = async (req: Request, res: Response) => {
  const payload = req.body as IUserChangePasswordPayload;
  const userId = req.auth?.id as string;

  const err = await services.user.update.changePassword(userId, payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const allFavouriteRoom = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const { pageToken } = req.query;

  const rs = await services.room.find.allFavouritesByUserId(id, pageToken as string);

  return response.r200(res, rs);
};

const forgotPassword = async (req: Request, res: Response) => {
  const payload = req.body as IForgotPasswordPayload;

  const [rs, err] = await services.user.find.forgotPassword(payload);

  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

const resetPassword = async (req: Request, res: Response) => {
  const payload = req.body as IResetPasswordPayload;

  const [rs, err] = await services.user.find.resetPassword(payload);

  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};
export default {
  register,
  update,
  login,
  profile,
  me,
  allRoom,
  addFavouriteRoom,
  changeAvatar,
  changePassword,
  removeFavouriteRoom,
  allFavouriteRoom,
  forgotPassword,
  resetPassword,
};
