import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Icon from "./icon";
import useAuth from "../hook/useAuth";
import Loader from "../components/Loader";

const Signup = () => {
  const { signup, googleLogin, loading } = useAuth();
  const clientId =
    "1092050659820-ft2ujq2jnjncdkklma6fua555rcuc6l4.apps.googleusercontent.com";
  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       plugin_name: "thétiptop",
  //       scope: "",
  //     });
  //   };
  //   gapi.load("client:auth2", initClient);
  // }, []);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    passportnumber: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError("");
  };

  const googleSuccess = async (res) => {
    console.log("google success");
    //  console.log(res);

    const accessToken = res.tokenId;
    const email = res.profileObj.email;

    googleLogin({ accessToken, email });
  };

  const googleFailure = (error) => {
    setError("Google sign in was unsuccessful");
    console.log(error);
  };

  const handleSubmit = async (e) => {
    console.log(data);
    let regData = {
      name: data.firstname + " " + data.lastname,
      passport_number: data.passportnumber,
      email: data.email,
      password: data.password,
    };
    const res = await signup(regData);
    if (res?.code == 400) setError(res.message);

    try {
    } catch (error) {}

    // try {
    //   const url = "http://localhost:5000/api/auth/signup";
    //   const { data: res } = await axios.post(url, data);
    //   navigate("/login");
    //   console.log(res.message);
    // } catch (error) {
    //   if (error.response) {
    //     setError(error.response.data.message);
    //   }
    // }
  };
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
          <h2>Inscrivez-vous</h2>
          <div className="card">
            <p>First Name</p>
            <input
              type="text"
              name="firstname"
              required
              onChange={handleChange}
              value={data.firstname}
            />
            <p>Last Name</p>
            <input
              type="text"
              name="lastname"
              required
              onChange={handleChange}
              value={data.lastname}
            />
            <p>Passport Number</p>
            <input
              type="text"
              name="passportnumber"
              required
              onChange={handleChange}
              value={data.passportnumber}
            />
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
              Inscrivez-vous
            </button>
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />
            {loading && <Loader />}
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
