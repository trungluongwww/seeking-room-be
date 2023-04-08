import { IResponseCode } from "../../external_node/interfaces/response";

const USER_INVALID_USERNAME = "USER_INVALID_USERNAME";
const USER_INVALID_PASSWORD = "USER_INVALID_PASSWORD";
const USER_INVALID_PHONE = "USER_INVALID_PHONE";
const USER_INVALID_NAME = "USER_INVALID_NAME";
const USER_INVALID_ADDRESS = "USER_INVALID_ADDRESS";
const USER_ALREADY_EXITS = "USER_ALREADY_EXITS";
const USER_NOT_FOUND = "USER_NOT_FOUND";
const list: Array<IResponseCode> = [
  {
    message: "tài khoản người dùng không hợp lệ",
    key: USER_INVALID_USERNAME,
  },
  {
    message: "mật khẩu không hợp lệ",
    key: USER_INVALID_PASSWORD,
  },
  {
    message: "số điện thoại không hợp lệ",
    key: USER_INVALID_PHONE,
  },
  {
    message: "tên người dùng không hợp lệ",
    key: USER_INVALID_NAME,
  },
  {
    message: "địa chỉ người dùng không hợp lệ",
    key: USER_INVALID_ADDRESS,
  },
  {
    message: " người dùng đã tồn tại",
    key: USER_ALREADY_EXITS,
  },
  {
    message: " người dùng không tìm thấy",
    key: USER_NOT_FOUND,
  },
];

export default {
  list,
  USER_INVALID_USERNAME,
  USER_INVALID_PASSWORD,
  USER_INVALID_PHONE,
  USER_INVALID_NAME,
  USER_INVALID_ADDRESS,
  USER_ALREADY_EXITS,
  USER_NOT_FOUND,
};