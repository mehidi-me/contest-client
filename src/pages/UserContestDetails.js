import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import contest from "../api/contest";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import useApi from "../hook/useApi";

function UserContestDetails() {
  const { id } = useParams();
  const [winerDetails, setwinerDetails] = useState(null);
  const {
    request: contestGet,
    loading: contestLoading,
    data: contestData,
  } = useApi(contest.getContest);

  const dateShow = (date) => {
    if (!date) return;
    let day = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    return `${month}.${day}.${year}`;
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
    const res = await contestGet(id);

    setwinerDetails(JSON.parse(res.data?.winer_id));
  }, []);
  return (
    <>
      <Navbar />
      <Layout>
        <section className="sp">
          <div className="container">
            <div className="user-form contest">
              {contestLoading && <Loader />}

              {!compareDate(contestData?.end_date) && winerDetails == null ? (
                <h1>Contest is end wating for draw</h1>
              ) : null}

              {!compareDate(contestData?.end_date) && winerDetails != null ? (
                <h1>
                  Fin du concours ! <br /> Le gagnant est{" "}
                  <span>{winerDetails.name}</span>,{" "}
                  <span>{winerDetails.user_id}</span>
                </h1>
              ) : null}

              {compareDate(contestData?.end_date) ? (
                <h1>
                  Le concours se termine at{" "}
                  <span>{dateShow(contestData?.end_date)}</span>
                </h1>
              ) : null}

              {/* <h3 className="sub-title">History</h3>
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Contest name</th>
                      <th>Ticket id</th>
                      <th>Date</th>
                    </tr>
                    <tr>
                      <td>Contest name</td>
                      <td>12345678</td>
                      <td>30.03.2022</td>
                    </tr>
                    <tr>
                      <td>Contest name</td>
                      <td>12345678</td>
                      <td>30.03.2022</td>
                    </tr>
                    <tr>
                      <td>Contest name</td>
                      <td>12345678</td>
                      <td>30.03.2022</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default UserContestDetails;
