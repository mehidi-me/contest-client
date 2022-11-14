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
              <h1>Contest list</h1>
              <br />
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Contest name</th>
                      <th>Contest Start</th>
                      <th>Contest End</th>
                      <th>Contest Winning Prize</th>
                      <th>View</th>
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
                            View Contest
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
                              runing
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
                  Create new contest
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
