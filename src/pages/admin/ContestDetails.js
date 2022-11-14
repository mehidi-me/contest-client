import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import join from "../../api/join";
import useApi from "../../hook/useApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import contest from "../../api/contest";

function ContestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTable, setActiveTable] = useState("pending");
  const [winerDetails, setwinerDetails] = useState(null);

  const {
    request: joinAllGet,
    loading: joinLoading,
    data: joinAllData,
  } = useApi(join.getJoinAll);
  const { request: joinUpdate, loading: joinUpdateLoading } = useApi(
    join.updateJoin
  );

  const { request: contestUpdate, loading: contestUpdateLoading } = useApi(
    contest.updateContest
  );
  const { request: joinDelete, loading: joinDeleteLoading } = useApi(
    join.deleteJoin
  );

  const updateJoinFunc = async (joinId) => {
    if (!window.confirm("Are sure approved this")) return;
    const random = Math.floor(
      Math.random() * joinAllData?.contest?.other_prize_ids.length
    );
    const win_prize_id = joinAllData?.contest?.other_prize_ids[random];
    const data = {
      id: joinId,
      data: {
        status: "approved",
        prize_id: joinAllData?.prizes.find((v) => v.id == win_prize_id)?.name,
      },
    };
    await joinUpdate(data);
    toast.success("successfully approved");
    joinAllGet(id);
  };

  const deleteJoinFunc = async (joinId) => {
    if (!window.confirm("Are sure reject this")) return;
    await joinDelete(joinId);
    toast.success("successfully delete!");
    joinAllGet(id);
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

  const drawWiner = async () => {
    if (!window.confirm("Are you sure")) return;

    const approveUser = joinAllData?.joins.filter(
      (v) => v.status == "approved"
    );
    const random = Math.floor(Math.random() * approveUser.length);
    const contestWiner = approveUser[random];

    const winerUser = joinAllData?.users.find(
      (v) => v.id == contestWiner.site_user_id
    );
    if (!winerUser) return toast.warning("anyone not perticipent");

    const data = {
      id: joinAllData?.contest?.id,
      data: {
        winer_id: JSON.stringify({
          name: winerUser.name,
          email: winerUser.email,
          site_user_id: winerUser.id,
          code: contestWiner.code,
          user_id: contestWiner.user_id,
          ticket_id: contestWiner.ticket_id,
        }),
      },
    };

    await contestUpdate(data);
    toast.success("successfully draw contest");
    const res = await joinAllGet(id);

    setwinerDetails(JSON.parse(res.data?.contest?.winer_id));
  };

  useEffect(async () => {
    const res = await joinAllGet(id);

    setwinerDetails(JSON.parse(res.data?.contest?.winer_id));
  }, []);
  console.log(winerDetails);
  return (
    <>
      <Navbar />
      <Layout>
        {!compareDate(joinAllData?.contest?.end_date) &&
        winerDetails == null ? (
          <section className="sp" style={{ paddingBottom: 0 }}>
            <div className="container">
              <div className="admin contest-draw">
                <h1>Draw the contest and choose the winner</h1>
                <br />
                <br />
                <button type="button" onClick={drawWiner}>
                  {contestUpdateLoading ? (
                    <Loader />
                  ) : (
                    "Click to draw the winner!"
                  )}
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {!compareDate(joinAllData?.contest?.end_date) &&
        winerDetails != null ? (
          <section className="sp" style={{ paddingBottom: 0 }}>
            <div className="container">
              <div className="admin full-width contest-draw-winner">
                <h1>Here is the lucky winner. Please confirm the winner!</h1>
                <br />
                <br />
                <div className="table">
                  <table id="winner-details">
                    <tbody>
                      <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>User ID</th>
                        <th>Cuppon code</th>
                        <th>Ticket ID</th>
                      </tr>
                      <tr>
                        <td>{winerDetails.name}</td>
                        <td>{winerDetails.email}</td>
                        <td>{winerDetails.user_id}</td>
                        <td>{winerDetails.code}</td>
                        <td>{winerDetails.ticket_id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="sp">
          <div className="container">
            <div className="admin full-width view-contest">
              <button
                type="button"
                onClick={() => navigate("/admin/panel/contest-list")}
                style={{ width: "56px", padding: "7px" }}
              >
                Back
              </button>
              <div className="tabs">
                <div
                  onClick={() => setActiveTable("pending")}
                  className={activeTable == "pending" ? "tab active" : "tab"}
                >
                  Pending approval
                </div>
                <div
                  onClick={() => setActiveTable("perticipents")}
                  className={
                    activeTable == "perticipents" ? "tab active" : "tab"
                  }
                >
                  Contest perticipents
                </div>
                <div
                  onClick={() => setActiveTable("email")}
                  className={activeTable == "email" ? "tab active" : "tab"}
                >
                  Perticipents Email
                </div>
              </div>
              {joinLoading || joinUpdateLoading || joinDeleteLoading ? (
                <Loader />
              ) : null}
              {activeTable == "pending" ? (
                <div className="table">
                  <table id="pending-approval">
                    <tbody>
                      <tr>
                        <th>User ID</th>
                        <th>Cuppon code</th>
                        <th>Ticket ID</th>
                        <th>Approval</th>
                      </tr>
                      {joinAllData?.joins.map((v) => {
                        if (v.status == "pending") {
                          return (
                            <tr>
                              <td>{v.user_id}</td>
                              <td>{v.code}</td>
                              <td>{v.ticket_id}</td>
                              <td>
                                <div className="approval-buttons">
                                  <button
                                    type="button"
                                    onClick={() => updateJoinFunc(v.id)}
                                  >
                                    <i className="uil uil-check" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteJoinFunc(v.id)}
                                  >
                                    <i className="uil uil-times" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              ) : activeTable == "perticipents" ? (
                <div className="table">
                  <table id="approved-list">
                    <tbody>
                      <tr>
                        <th>User ID</th>
                        <th>Cuppon code</th>
                        <th>Ticket ID</th>
                        <th>Approval</th>
                        <th>Pirticipent bonus gift</th>
                      </tr>
                      {joinAllData?.joins.map((v) => {
                        if (v.status == "approved") {
                          return (
                            <tr>
                              <td>{v.user_id}</td>
                              <td>{v.code}</td>
                              <td>{v.ticket_id}</td>
                              <td>Approved</td>
                              <td>{v.prize_id}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="table">
                  <table id="email-list">
                    <tbody>
                      <tr>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Email</th>
                      </tr>
                      {joinAllData?.users?.map((v) => (
                        <tr>
                          <td>{v.name}</td>
                          <td>
                            {
                              joinAllData?.joins.find(
                                (d) => d.site_user_id == v.id
                              )?.user_id
                            }
                          </td>
                          <td>{v.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ContestDetails;
