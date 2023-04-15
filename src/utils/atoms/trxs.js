import { atom } from "recoil";

export const receiveTrxHashState = atom({
  key: "receiveTrxHashState",
  default: false,
});

export const hashState = atom({
  key: "hashState",
  default: false,
});

export const isWrappedState = atom({
  key: "isWrappedState",
  default: true,
});
