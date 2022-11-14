import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";
import axios from "axios";
import useAuth from "../hook/useAuth";

const Signup = () => {
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    // try {
    //     const url="http://localhost:5000/api/auth/signin";
    //     const {data:res} = await axios.post(url, data);
    //     localStorage.setItem("token", res.token);
    //     console.log(res.token)
    //     window.location = "/participer";

    //     }catch(error) {
    //         if(error.response){
    //             setError(error.response.data.message)
    //         }
    //     }

    console.log(data);

    const res = await login(data);
    if (res?.code == 400) setError(res.message);
  };
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (user && userInfo) {
      if (userInfo.role == "user") {
        navigate("/participer");
      }
      if (userInfo.role == "admin") {
        navigate("/admin/panel/contest-list");
      }
      if (userInfo.role == "employe") {
        navigate("/employe");
      }
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="content">
          <h2>Identifiez-vous</h2>
          <div className="card">
            <p>email</p>
            <input
              type="text"
              name="email"
              required
              onChange={handleChange}
              value={data.email}
            />
            <p>password</p>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={data.password}
            />
            <br />
            <button type="submit" className="button" onClick={handleSubmit}>
              Login
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
