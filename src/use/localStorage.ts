import { reactive } from "vue";

interface UserInterface {
  fisrtName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  avatar?: string;
  about?: string;
}

interface UndefinedObjInterface {
  [s: string]: undefined;
}

let storageData = reactive<UserInterface | UndefinedObjInterface>({});

function useReturnLocalStorageData(): UserInterface | UndefinedObjInterface {
  useUpdateStorageData("user");
  return storageData;
}

function useGetLocalStorage(
  localStorageName: string
): UserInterface | UndefinedObjInterface {
  return JSON.parse(localStorage.getItem(localStorageName) as string);
}

function useUpdateStorageData(localStorageName: string): void {
  storageData = useGetLocalStorage(localStorageName);
}

function useLocalStorageExists(localStorageName: string): boolean {
  return Boolean(localStorage.getItem(localStorageName));
}

function useSetLocalStorage(localStorageName: string, data: unknown): void {
  localStorage.setItem(localStorageName, JSON.stringify(data));
}

function useRemoveLocalStorage(localStorageName: string): void {
  localStorage.removeItem(localStorageName);
}

export {
  useReturnLocalStorageData,
  useGetLocalStorage,
  useLocalStorageExists,
  useUpdateStorageData,
  useSetLocalStorage,
  useRemoveLocalStorage,
};
