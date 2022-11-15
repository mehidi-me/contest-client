import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import join from "../../api/join";
import useApi from "../../hook/useApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import contest from "../../api/contest";
import { DonutChart } from "react-circle-chart";

function ContestDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTable, setActiveTable] = useState("pending");
  const [winerDetails, setwinerDetails] = useState(null);
  const [pendingList, setPendingList] = useState(null);
  const [perticipentList, setPerticipentList] = useState(null);
  const [emailList, setEmailList] = useState(null);
  const [chartArgs, setchartArgs] = useState([]);

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

  useEffect(() => {
    setchartArgs([]);
    if (joinAllData) {
      let perticipents = joinAllData?.joins?.filter(
        (v) => v.status == "approved"
      );
      let pendingper = joinAllData?.joins?.filter((v) => v.status == "pending");
      setEmailList(joinAllData?.users);
      setPerticipentList(perticipents);
      setPendingList(pendingper);

      function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => v === value && count++);
        return count;
      }
      function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
      }

      const useGivePrizes = [];
      const allPrizes = [];
      joinAllData?.joins?.map((v) => {
        if (v.status == "approved") {
          useGivePrizes.push(v.prize_id);
        }
      });
      joinAllData?.prizes?.map((v) => allPrizes.push(v.name));
      allPrizes.map((d) => {
        // console.log(percentage(getOccurrence(allPrizes, v), allPrizes.length));
        console.log(getOccurrence(allPrizes, d));
        setchartArgs((v) => [
          ...v,
          {
            label: d,
            value: percentage(
              getOccurrence(useGivePrizes, d),
              allPrizes.length
            ),
          },
        ]);
      });
      //console.log(useGivePrizes, allPrizes);
    }
  }, [joinAllData]);
  //console.log(chartArgs);
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
                  <div
                    style={{
                      width: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{ margin: 0 }}
                      name="search"
                      type="search"
                      placeholder="Search"
                      onChange={(e) => {
                        if (!e.target.value)
                          return setPerticipentList(joinAllData?.joins);
                        setPerticipentList((v) =>
                          joinAllData?.joins?.filter((d) =>
                            Object.values(d).includes(e.target.value)
                          )
                        );
                      }}
                    />
                    {/* <button style={{ width: "auto" }}>Search</button> */}
                  </div>
                  <table id="pending-approval">
                    <tbody>
                      <tr>
                        <th>User ID</th>
                        <th>Cuppon code</th>
                        <th>Ticket ID</th>
                        <th>Approval</th>
                      </tr>
                      {pendingList?.map((v) => {
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <DonutChart items={chartArgs} size="sm" />
                    <ul>
                      {chartArgs?.map((v) => (
                        <li style={{ fontSize: "18px", margin: "5px" }}>
                          {v.label}{" "}
                          <span
                            style={{
                              color: "var(--primary-color)",
                              fontWeight: "bold",
                              fontSize: "22px",
                            }}
                          >
                            {v.value}
                            {"%"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    style={{
                      width: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{ margin: 0 }}
                      name="search"
                      type="search"
                      placeholder="Search"
                      onChange={(e) => {
                        if (!e.target.value)
                          return setPerticipentList(joinAllData?.joins);
                        setPerticipentList((v) =>
                          joinAllData?.joins?.filter((d) =>
                            Object.values(d).includes(e.target.value)
                          )
                        );
                      }}
                    />
                    {/* <button style={{ width: "auto" }}>Search</button> */}
                  </div>
                  <table id="approved-list">
                    <tbody>
                      <tr>
                        <th>User ID</th>
                        <th>Cuppon code</th>
                        <th>Ticket ID</th>
                        <th>Approval</th>
                        <th>Pirticipent bonus gift</th>
                      </tr>
                      {perticipentList?.map((v) => {
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
                  <div
                    style={{
                      width: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{ margin: 0 }}
                      name="search"
                      type="search"
                      placeholder="Search"
                      onChange={(e) => {
                        if (!e.target.value)
                          return setEmailList(joinAllData?.users);
                        setEmailList((v) =>
                          joinAllData?.users?.filter((d) =>
                            Object.values(d).includes(e.target.value)
                          )
                        );
                      }}
                    />
                    {/* <button style={{ width: "auto" }}>Search</button> */}
                  </div>
                  <table id="email-list">
                    <tbody>
                      <tr>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Email</th>
                      </tr>
                      {emailList?.map((v) => (
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
