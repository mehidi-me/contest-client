import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Participer.css";
import axios from "axios";
import useAuth from "../hook/useAuth";
const user = localStorage.getItem("token");

const Signup = () => {
  const [data, setData] = useState({
    number: "",
  });

  const [error, setError] = useState("");

  const [gift, setGift] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    console.log(data);
    setData({ number: input.value });
    setError("");
  };

  const { logOut } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const handleParticipate = async (e) => {
    try {
      setData(data);
      console.log(data);
      setGift("");
      const url = "http://localhost:5000/api/tickets";
      const { data: res } = await axios.post(url, data, {
        headers: { authorization: `${user}` },
      });
      console.log(data.number);
      setGift(res.gift);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
    // setData("");
  };
  return (
    <>
      <Navbar />
      <div className="main">
        <button className="logout" onClick={logOut}>
          logout
        </button>
        <div className="content">
          <h2>Participez</h2>
          <div className="card">
            <center>
              <p>Veuillez saisir votre numéro de ticket</p>
            </center>
            <input
              type="text"
              name="number"
              className="input2"
              required
              maxLength={"10"}
              onChange={handleChange}
              value={data.number}
            />
            <br />
            <button
              type="button"
              className="button"
              onClick={handleParticipate}
            >
              Jouer
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {gift && <div style={{ color: "green" }}>{gift}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
