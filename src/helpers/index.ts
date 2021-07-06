import { UserInterface } from "@/types";

export const isEmpty = (
  obj: { [s: string]: unknown } | ArrayLike<unknown>
): boolean => !Object.entries(obj).length;

export const compareObjects = (
  object1: { [s: string]: unknown },
  object2: { [s: string]: unknown }
): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

export const hasEmptyValues = (obj: { [s: string]: unknown; } | UserInterface): boolean =>
  Object.values(obj).every((x) => x === null || x === "");
