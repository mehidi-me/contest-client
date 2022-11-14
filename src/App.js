import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Participer from "./pages/Participer";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./appContext";
import CreateContest from "./pages/admin/CreateContest";
import { ToastContainer } from "react-toastify";
import ContestList from "./pages/admin/ContestList";
import ContestDetails from "./pages/admin/ContestDetails";
import UserContest from "./pages/UserContest";
import ContestJoin from "./pages/ContestJoin";
import UserContestDetails from "./pages/UserContestDetails";
import Employ from "./pages/employe/Employ";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Demo />
      <Footer />
    </>
  );
}

function App() {
  const user = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <AppContext.Provider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {user && userInfo ? (
            userInfo.role == "employe" ? (
              <>
                <Route path="/employe" element={<Employ />} />
              </>
            ) : null
          ) : null}
          {user && userInfo ? (
            userInfo.role == "user" ? (
              <>
                <Route path="/participer" element={<UserContest />} />
                <Route path="/participer/join/:id" element={<ContestJoin />} />
                <Route
                  path="/participer/contest/:id"
                  element={<UserContestDetails />}
                />
              </>
            ) : null
          ) : null}
          {user && userInfo ? (
            userInfo.role == "admin" ? (
              <>
                <Route
                  path="admin/panel/contest-create"
                  element={<CreateContest />}
                />
                <Route
                  path="admin/panel/contest-list"
                  element={<ContestList />}
                />
                <Route
                  path="admin/panel/contest/:id"
                  element={<ContestDetails />}
                />
              </>
            ) : null
          ) : null}
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
