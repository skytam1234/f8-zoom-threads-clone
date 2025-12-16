import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

import HomePage from "@/pages/HomePage";

import SearchPage from "@/pages/SearchPage";

import { Route, HashRouter as Router, Routes } from "react-router";
import PrivateRoute from "../PrivateRoute";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Activity from "@/pages/Activity";
import Profile from "@/pages/Profile";
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword";
import NotFound from "@/pages/NotFound";
import VerifyEmail from "@/pages/Auth/VerifyEmail/VerifyEmail";

function AppRoute() {
    return (
        <Router>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
export default AppRoute;
