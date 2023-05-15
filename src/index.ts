import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const TOKEN_KEY = "test_token_key";

export const setToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const decodeToken = (token: string | null) => {
  try {
    if (!!token) {
      return jwtDecode(token);
    }
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = async () => {
  const token: string | null = await getToken();
  return !!token && !!decodeToken(token);
};

export const useAuthenticated = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    isAuthenticated().then((res: boolean) => setIsLoggedIn(res));
  }, []);

  return { isLoggedIn };
};
