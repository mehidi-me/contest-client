import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://localhost:3005/v1/",
  //baseURL: "https://contest-backend-app.herokuapp.com/v1/",
});

apiClient.addAsyncRequestTransform(async (req) => {
  const authToken = localStorage.getItem("token");

  if (!authToken) return;

  req.headers["Authorization"] = `Bearer ${authToken}`;
});

// apiClient.addAsyncResponseTransform(async (response) => {
//   if (response.data.code === 401 || response.data.code === 403) {
//     const refreshToken = localStorage.getItem("refreshToken");
//     const data = await apiClient.post(`/auth/refresh-tokens`, {
//       refreshToken: refreshToken,
//     });
//     // console.log(data);
//     if (!data.ok) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userInfo");
//       document.location.href = "/login";
//     } else {
//       localStorage.setItem("token", data.data?.tokens.access.token);
//       localStorage.setItem("refreshToken", data.data?.tokens.refresh.token);
//       const authToken = data.data?.tokens.access.token;
//       apiClient.setHeader("Authorization", `Bearer ${authToken}`);
//       // retry
//       // const data = await apiClient.any(response.config);
//       // // replace data
//       // response.data = data.data;
//     }
//   }
// });

export default apiClient;
