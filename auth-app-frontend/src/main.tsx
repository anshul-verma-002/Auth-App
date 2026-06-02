import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import RootLayout from "./Pages/RootLayout.tsx";
import App from "./App.tsx";
import Signup from "./Pages/Signup.tsx";
import Login from "./Pages/Login.tsx";
import UserHome from "./Pages/users/UserHome.tsx";
import UserLayout from "./Pages/users/UserLayout.tsx";
import UserProfile from "./Pages/users/UserProfile.tsx";
import OAuthSuccess from "./Pages/OAuthSuccess.tsx";
import OAuthFailure from "./Pages/OAuthFailure.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="oauth/success" element={<OAuthSuccess />} />
        <Route path="oauth/failure" element={<OAuthFailure />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
