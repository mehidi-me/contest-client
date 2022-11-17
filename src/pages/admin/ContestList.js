import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contest from "../../api/contest";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import useApi from "../../hook/useApi";

function ContestList() {
  const navigate = useNavigate();
  const {
    request: contestRequestGet,
    data: contestData,
    loading: contestLoading,
  } = useApi(contest.getContests);

  useState(() => {
    contestRequestGet();
  }, []);

  const compareDate = (date) => {
    const currentDate = new Date().getTime();
    const endDate = new Date(date).getTime();
    if (endDate < currentDate) {
      return false;
    } else {
      return true;
    }
  };
  // console.log(contestData);
  return (
    <>
      <Navbar />

      <Layout>
        <section className="sp">
          <div className="container">
            <div className="admin full-width contest-list">
              <h1>Liste des concours</h1>
              <br />
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Nom du concours</th>
                      <th>Début du concours</th>
                      <th>Fin du concours</th>
                      <th>Prix gagnant du concours</th>
                      <th>Voir</th>
                    </tr>
                    {contestData?.contests?.results.map((v) => (
                      <tr>
                        <td>{v.name}</td>
                        <td>{v.start_date}</td>
                        <td>{v.end_date}</td>
                        <td>
                          {
                            contestData?.prizes?.find(
                              (d) => d.id == v.main_prize_id
                            )?.name
                          }
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/admin/panel/contest/" + v.id)
                            }
                          >
                            Voir le concours
                          </button>

                          {compareDate(v.end_date) ? (
                            <p
                              style={{
                                textAlign: "center",
                                background: "#ffff8b",
                                borderRadius: "6px",
                                color: "#000",
                                padding: "2px 0",
                              }}
                            >
                              courir
                            </p>
                          ) : null}
                        </td>
                      </tr>
                    ))}

                    {contestLoading && <Loader />}
                  </tbody>
                </table>
              </div>
              <br />
              <center>
                <button
                  type="button"
                  onClick={() => navigate("/admin/panel/contest-create")}
                >
                  Créer un nouveau concours
                </button>
              </center>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ContestList;
