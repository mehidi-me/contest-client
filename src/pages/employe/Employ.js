import React, { useState } from "react";
import join from "../../api/join";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import useApi from "../../hook/useApi";

function Employ() {
  const {
    request: getJoin,
    loading: joinLoading,
    data: joinData,
  } = useApi(join.getOneJoin2);
  const { request: updateJoin, loading: ujoinLoading } = useApi(
    join.updateJoin
  );

  const [data, setData] = useState({
    cid: "",
    uid: "",
  });
  return (
    <>
      <Navbar />
      <Layout>
        <section className="sp" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="admin admin-login">
              <h1>Check ticket</h1>
              <form action="#">
                <input
                  type="number"
                  onChange={(e) => setData({ ...data, cid: e.target.value })}
                  placeholder="Ticket number"
                />
                <input
                  type="numer"
                  onChange={(e) => setData({ ...data, uid: e.target.value })}
                  placeholder="User ID"
                />
                <button onClick={() => getJoin(data)}>
                  {joinLoading ? <Loader size={20} /> : "Test"}
                </button>
              </form>
            </div>
          </div>
        </section>
        {joinData ? (
          <section className="sp">
            <div className="container">
              <div className="admin full-width contest-draw-winner">
                <h1>Ticket details</h1>
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
                        <th>Prize name</th>
                        <th>Status</th>
                      </tr>
                      {/* <tr>
                        <td>Mehidi Hasan</td>
                        <td>aentmh47@gmail.com</td>
                        <td>12</td>
                        <td>1234567890</td>
                        <td>12</td>
                        <td>Tea bag</td>
                        <td>
                          <button>Send gift</button>
                        </td>
                      </tr> */}
                      <tr>
                        <td>{joinData?.user?.name}</td>
                        <td>{joinData?.user?.email}</td>
                        <td>{joinData?.join?.user_id}</td>
                        <td>{joinData?.join?.code}</td>
                        <td>{joinData?.join?.ticket_id}</td>
                        <td>{joinData?.join?.prize_id}</td>
                        {joinData?.join?.status == "approved" ? (
                          <td>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateJoin({
                                  id: joinData?.join?.id,
                                  data: { status: "delivared" },
                                });
                                getJoin(data);
                              }}
                            >
                              {ujoinLoading ? (
                                <Loader size="20" />
                              ) : (
                                "Send gift"
                              )}
                            </button>
                          </td>
                        ) : (
                          <td>{joinData?.join?.status}</td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </Layout>
    </>
  );
}

export default Employ;
