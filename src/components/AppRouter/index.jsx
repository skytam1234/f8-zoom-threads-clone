import DefaultLayout from "@/layouts/DefaultLayout";
import Login from "@/pages/Auth/Login";

import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";

import { Route, BrowserRouter as Router, Routes } from "react-router";

function AppRoute() {
    return (
        <Router>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
export default AppRoute;
