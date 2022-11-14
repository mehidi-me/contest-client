import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../appContext";
import useAuth from "../hook/useAuth";

function RequireAuth({ children }) {
  const navigate = useNavigate();
  //   const { login } = useAuth();
  const token = localStorage.getItem("token");
  //   const { initData, setInitData, setInfo, info } = useContext(AppContext);

  //   useEffect(() => {
  //     if (!token) {
  //       navigate("/login");
  //       return;
  //     }

  //     // else {
  //     //   if (!initData) {
  //     //     (async () => {
  //     //       const res = await content.getContent();

  //     //       if (res.ok) {
  //     //         setInitData(res.data);
  //     //       }
  //     //       if (!info) {
  //     //         const res2 = await siteInfo.getInfo();
  //     //         if (res2.ok) {
  //     //           setInfo(res2.data);
  //     //         }
  //     //       }
  //     //       if (res.status === 401 || res.status === 403) {
  //     //         const userInfo = localStorage.getItem("userInfo");
  //     //         if (userInfo) {
  //     //           const res = await login(JSON.parse(userInfo));
  //     //           if (res) {
  //     //             navigate("/");
  //     //           }
  //     //         } else {
  //     //           navigate("/login");
  //     //         }
  //     //       }
  //     //     })();
  //     //   }
  //     // }
  //   }, [token]);
  if (token) {
    return <>{children}</>;
  } else {
    return navigate("/login");
  }
}

export default RequireAuth;
