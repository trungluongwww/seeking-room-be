import {
  IOrderDetailQuery,
  IOrderQuerySearchByUser,
  IOrderUpdateStatusPayload,
} from "../../../interfaces/order";

import cstOrder from "../../../constants/order";
import dao from "../../dao";
import strings from "../../../ultilities/strings";
import cstAccount from "../../../constants/account";

const status = async (
  payload: IOrderUpdateStatusPayload
): Promise<Error | null> => {
  if (strings.array.include(cstAccount.role.all, payload.userType)) {
    if (payload.userType == cstAccount.role.customer) {
      return byCustomer(payload);
    }
    if (payload.userType == cstAccount.role.shop) {
      return bySeller(payload);
    }
  }
  return Error("No permission");
};

const byCustomer = async (
  payload: IOrderUpdateStatusPayload
): Promise<Error | null> => {
  const [order, err] = await dao.order.find.byId(
    payload.orderId,
    payload.userType
  );
  if (!order?.id) {
    return err;
  }

  if (
    order.customerId != payload.currentUserId &&
    order.shopId != payload.currentUserId
  ) {
    return Error("No permission");
  }

  if (!strings.array.include(cstOrder.permissions.customer, payload.status))
    return Error("Bad request");
  if (checkUpdateStatusAllowed(order.status, payload.status))
    return Error("Bad request");

  if (payload.status == cstOrder.status.cancelled) {
    const err = await dao.order.update.status(order.id, payload.status);
    if (err) return err;
  }

  return null;
};

const bySeller = async (
  payload: IOrderUpdateStatusPayload
): Promise<Error | null> => {
  const [order, err] = await dao.order.find.byId(
    payload.orderId,
    payload.userType
  );
  if (!order?.id) {
    return err;
  }

  if (
    order.customerId != payload.currentUserId &&
    order.shopId != payload.currentUserId
  ) {
    return Error("No permission");
  }

  if (!strings.array.include(cstOrder.permissions.seller, payload.status))
    return Error("Bad request");
  if (checkUpdateStatusAllowed(order.status, payload.status))
    return Error("Bad request");

  {
    const err = await dao.order.update.status(order.id, payload.status);
    if (err) return err;
  }

  return null;
};

const checkUpdateStatusAllowed = (
  oldStatus: string,
  status: string
): boolean => {
  if (
    status == cstOrder.status.cancelled &&
    strings.array.include(cstOrder.allowCancel, oldStatus)
  )
    return true;
  if (
    status == cstOrder.status.confirmed &&
    oldStatus == cstOrder.status.waitForConfirm
  )
    return true;
  if (
    status == cstOrder.status.delivering &&
    oldStatus == cstOrder.status.confirmed
  )
    return true;
  if (
    status == cstOrder.status.completed &&
    oldStatus == cstOrder.status.delivering
  )
    return true;
  return false;
};

export default {
  status,
};