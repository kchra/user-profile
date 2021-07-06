import { reactive } from "vue";
import { UserInterface } from "@/types";

let storageData = reactive<UserInterface>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthday: "",
  avatar: "",
  about: "",
});

function useReturnLocalStorageData(): UserInterface {
  useUpdateStorageData("user");
  return storageData;
}

function useGetLocalStorage(localStorageName: string): UserInterface {
  if (!useLocalStorageExists(localStorageName)) {
    try {
      useSetLocalStorage(localStorageName, storageData);
    } catch {
      useRemoveLocalStorage(localStorageName);
    }
  }
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
