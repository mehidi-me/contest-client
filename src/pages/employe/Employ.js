import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";

function Employ() {
  return (
    <>
      <Navbar />
      <Layout>
        <section className="sp" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="admin admin-login">
              <h1>Check ticket</h1>
              <form action="#">
                <input type="number" placeholder="Ticket number" />
                <input type="numer" placeholder="User ID" />
                <button>Test</button>
              </form>
            </div>
          </div>
        </section>
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
                    <tr>
                      <td>Mehidi Hasan</td>
                      <td>aentmh47@gmail.com</td>
                      <td>12</td>
                      <td>1234567890</td>
                      <td>12</td>
                      <td>Tea bag</td>
                      <td>
                        <button>Send gift</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mehidi Hasan</td>
                      <td>aentmh47@gmail.com</td>
                      <td>12</td>
                      <td>1234567890</td>
                      <td>12</td>
                      <td>Tea bag</td>
                      <td>Delivared</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Employ;
