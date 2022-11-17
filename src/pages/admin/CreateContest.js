import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import useApi from "../../hook/useApi";
import prize from "../../api/prize";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import contest from "../../api/contest";
import { useNavigate } from "react-router-dom";

function CreateContest() {
  const navigate = useNavigate();
  const { request: prizeRequest, loading: prizeAddLoading } = useApi(
    prize.addPrize
  );
  const { request: contestRequest, loading: contestAddLoading } = useApi(
    contest.createContest
  );

  const {
    request: contestAllGet,
    loading: contestLoading,
    data: contestAllData,
  } = useApi(contest.getAllContests);

  const { request: prizeRequestDelete, loading: prizeDLoading } = useApi(
    prize.prizeDelete
  );

  const {
    request: prizeRequestGet,
    data: prizeData,
    loading: prizeLoading,
  } = useApi(prize.getPrizes);

  const [data, setData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    main_prize_id: "",
    code_list: "",
  });

  const [prizeName, setPrizeName] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    for (let i = 0; i < Object.values(data).length; i++) {
      if (!Object.values(data)[i]) return toast.warning(`input is not empty!`);
    }
    if (!prizeData || prizeData.results.length < 2) {
      return toast.warning("Please add more prize!");
    }

    const other_prize_ids = [];
    prizeData.results.map((v) => {
      if (data.main_prize_id != v.id) other_prize_ids.push(v.id);
    });
    await contestRequest({ ...data, other_prize_ids });
    navigate("/admin/panel/contest-list");
  };
  const compareDate = (date) => {
    const currentDate = new Date().getTime();
    const endDate = new Date(date).getTime();
    if (endDate < currentDate) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(async () => {
    const res = await contestAllGet();

    const activeContest = res?.data.find((v) => compareDate(v.end_date));
    if (activeContest) {
      toast.warning("Contest is already runing!");
      navigate("/admin/panel/contest-list");
    } else {
      prizeRequestGet();
    }
    // prizeRequestGet();
    console.log(activeContest);

    //
  }, []);

  return (
    <Layout>
      <section className="sp">
        <div className="container">
          <div className="admin contest-list">
            <button
              type="button"
              onClick={() => navigate("/admin/panel/contest-list")}
              style={{ width: "56px", padding: "7px" }}
            >
              Retour
            </button>
            <h1>Créer un concours</h1>
            <br />
            <div>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Nom du concours"
              />
              <input
                type="text"
                name="code_list"
                onChange={handleChange}
                placeholder="Quantité de code promo"
              />
              <div className="fild">
                <label htmlFor="start-date">Date de début</label>
                <input
                  id="start-date"
                  name="start_date"
                  onChange={handleChange}
                  type="datetime-local"
                />
              </div>
              <div className="fild">
                <label htmlFor="end-date">Date de fin</label>
                <input
                  id="end-date"
                  name="end_date"
                  onChange={handleChange}
                  type="datetime-local"
                />
              </div>
              <div className="fild">
                <label htmlFor="add-prize">Ajouter des prix</label>
                <div className="add-prize">
                  <input
                    type="text"
                    placeholder="Mettre le nom du prix"
                    onChange={(e) => setPrizeName(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!prizeName)
                        return toast.warning("Prize name not empty!");
                      await prizeRequest({ name: prizeName });
                      prizeRequestGet();
                    }}
                  >
                    {prizeAddLoading ? (
                      <Loader size="20" />
                    ) : (
                      "Ajouter des prix"
                    )}
                  </button>
                </div>
              </div>
              <div className="select-prizes">
                {prizeLoading && <Loader />}
                {prizeData?.results?.map((v) => (
                  <div className="item">
                    <button
                      onClick={async () => {
                        await prizeRequestDelete(v.id);
                        prizeRequestGet();
                      }}
                      id={v.id}
                      type="button"
                      style={{ padding: "5px", margin: 0 }}
                    >
                      <i className="uil uil-times" />
                    </button>
                    <label htmlFor={v.id}>{v.name}</label>
                  </div>
                ))}
              </div>
              <select
                name="main_prize_id"
                onChange={handleChange}
                id="main-prize"
              >
                <option value="null">Sélectionnez le prix principal</option>
                {prizeData?.results?.map((v) => (
                  <option value={v.id}>{v.name}</option>
                ))}
              </select>
              <button type="button" onClick={handleSubmit}>
                {contestAddLoading ? <Loader size="20" /> : "Créer un concours"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default CreateContest;
