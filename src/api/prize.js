import client from "./client";

const addPrize = async (data) => {
  return await client.post("prizes", data);
};

const getPrizes = async () => {
  return await client.get("prizes");
};

const prizeDelete = async (id) => {
  return await client.delete("prizes/" + id);
};

export default { addPrize, getPrizes, prizeDelete };
