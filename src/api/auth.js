import client from "./client";

const login = async (userInfo) => {
  return await client.post("auth/login", userInfo);
};

const signup = async (info) => {
  return await client.post("auth/register", info);
};

export default { login, signup };
