import client from "./client";

const contestJoin = async (data) => {
  return await client.post("join", data);
};

const getOneJoin = async (v) => {
  return await client.get(`join/${v.cid}/${v.uid}`);
};

const getJoinAll = async (id) => {
  return await client.get(`join/${id}`);
};

const updateJoin = async (v) => {
  return await client.patch(`join/${v.id}`, v.data);
};
const deleteJoin = async (id) => {
  return await client.delete(`join/${id}`);
};

export default { contestJoin, getOneJoin, getJoinAll, updateJoin, deleteJoin };
