import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import join from "../api/join";
import useApi from "../hook/useApi";
import Loader from "../components/Loader";

function ContestJoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState({
    user_id: "",
    code: "",
    ticket_id: "",
  });

  const { request: contestJoin, loading: contestJoinLoading } = useApi(
    join.contestJoin
  );

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async () => {
    for (let i = 0; i < Object.values(data).length; i++) {
      if (!Object.values(data)[i]) return toast.warning(`input is not empty!`);
    }
    if (data.code.length != 10) {
      return toast.warning(`Code à 10 chiffres length is 10!`);
    }

    await contestJoin({ ...data, contest_id: id, site_user_id: userInfo.id });
    navigate("/participer");
    //console.log({ ...data, contest_id: id, site_user_id: userInfo.id });
  };
  return (
    <>
      <Navbar />
      <Layout>
        <section className="sp">
          <div className="container">
            <div className="user-form ticket-verify active">
              <h1>
                Bienvenue <span>{userInfo.name}</span>
              </h1>
              <div>
                <input
                  type="number"
                  name="user_id"
                  onChange={handleChange}
                  placeholder="Identifiant d'utilisateur"
                />
                <input
                  type="number"
                  name="code"
                  onChange={handleChange}
                  placeholder="Code à 10 chiffres"
                />
                <input
                  type="number"
                  name="ticket_id"
                  onChange={handleChange}
                  placeholder="ID de billets"
                />
                <button type="button" onClick={handleSubmit}>
                  {contestJoinLoading ? <Loader /> : "Vérifier"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ContestJoin;
