import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SearchPage from "@/pages/SearchPage";

import { Route, BrowserRouter as Router, Routes } from "react-router";
import PrivateRoute from "../PrivateRoute";

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default AppRoute;
