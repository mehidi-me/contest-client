import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import contest from "../api/contest";
import join from "../api/join";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import useApi from "../hook/useApi";

function UserContest() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [participer, setparticiper] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const {
    request: contestAllGet,
    loading: contestLoading,
    data: contestAllData,
  } = useApi(contest.getAllContests);
  const {
    request: joinGet,
    loading: joinLoading,
    data: joinData,
  } = useApi(join.getOneJoin);

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
      setHeading("");
      const res2 = await joinGet({ cid: activeContest.id, uid: userInfo.id });
      if (!res2.data) return navigate("/participer/join/" + activeContest.id);

      if (res2.data.status == "pending")
        return setHeading(
          `Salut ${userInfo.name} votre demande est en attente`
        );
      if (res2.data.status == "approved") {
        setparticiper(res2.data);
      }
    } else {
      setHeading("Le concours n'est pas en cours");
    }
    // console.log(activeContest);

    //
  }, []);
  return (
    <>
      <Navbar />
      <Layout>
        <section className="sp">
          <div className="container">
            <div className="user-form pending">
              {contestLoading || joinLoading ? <Loader /> : null}

              {/* <h1>
                Salut <span>Mehidi</span> votre demande est en attente
              </h1> */}
              {participer ? (
                <>
                  <h1>
                    Salut <span>{userInfo.name}</span> Vous avez gagné
                    <span className="entry-prize">"{participer.prize_id}"</span>
                  </h1>
                  <br />
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/participer/contest/" + participer.contest_id)
                    }
                  >
                    Suivre le résultat du concours
                  </button>
                </>
              ) : (
                <h1>{heading}</h1>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default UserContest;
