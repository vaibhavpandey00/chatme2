import { userSocketIDs } from "../index.js";

export const getOtherMember = (members, userId) => {
    return members.find((member) => member._id !== userId);
}

export const getSockets = (users=[]) => {
    const sockets = users.map((user) => userSocketIDs.get(user._id.toString()));

    return sockets;
}