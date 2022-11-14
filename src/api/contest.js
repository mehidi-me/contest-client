import client from "./client";

const createContest = async (data) => {
  return await client.post("contest", data);
};
const getContests = async (data) => {
  return await client.get("contest");
};
const getAllContests = async (data) => {
  return await client.get("contest/all");
};

const updateContest = async (v) => {
  return await client.patch("/contest/" + v.id, v.data);
};

const getContest = async (id) => {
  return await client.get("/contest/" + id);
};

export default {
  createContest,
  getContests,
  getAllContests,
  updateContest,
  getContest,
};
