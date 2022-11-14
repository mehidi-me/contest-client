import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../api/auth";

const useAuth = () => {
  //   const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = (path) => {
    document.location.href = path;
  };

  const signup = async (data) => {
    setLoading(true);
    const res = await auth.signup(data);
    setLoading(false);
    if (res.status == 400) {
      return { code: 400, message: res.data?.message };
    }
    if (res.status == 201) {
      localStorage.setItem("token", res.data?.tokens.access.token);
      localStorage.setItem("refreshToken", res.data?.tokens.refresh.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data?.user));

      toast.success("Sucssefully Signup");
      if (res.data?.user.role == "user") {
        navigate("/participer");
      }
      if (res.data?.user.role == "admin") {
        navigate("/admin/panel/contest-list");
      }
      //return { code: 200, data: res.data };
    }

    console.log(res);
  };

  const login = async (data) => {
    setLoading(true);
    const res = await auth.login(data);
    setLoading(false);
    console.log(res);
    if (res.status == 401) {
      return { code: 400, message: res.data?.message };
    }
    if (res.status == 400) {
      return { code: 400, message: res.data?.message };
    }
    if (res.status == 200) {
      localStorage.setItem("token", res.data?.tokens.access.token);
      localStorage.setItem("refreshToken", res.data?.tokens.refresh.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data?.user));

      toast.success("Sucssefully Login");
      if (res.data?.user.role == "user") {
        navigate("/participer");
      }
      if (res.data?.user.role == "admin") {
        navigate("/admin/panel/contest-list");
      }
      if (res.data?.user.role == "employe") {
        navigate("/employe");
      }
      //navigate("/participer");
      //return { code: 200, data: res.data };
    }
    // if (res.ok && res.data) {
    //   localStorage.setItem("token", res.data);
    //   localStorage.setItem("userInfo", JSON.stringify(data));

    //   toast.success("sucssefully login");
    //   return true;
    // }

    // if (res.status === 401 || res.status === 403) {
    //   //unauthorize

    //   toast.warning("unauthorize");
    //   return false;
    // }

    // toast.error("something was wrong try again!");
    // return false;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    toast.success("sucssefully logout");
    navigate("/");
  };

  return { login, logOut, loading, signup };
};

export default useAuth;
