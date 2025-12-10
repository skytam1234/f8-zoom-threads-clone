import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light",
};
export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeDark(state) {
            state.theme = "dark";
            localStorage.setItem("theme", "dark");
        },
        setThemeLight(state) {
            state.theme = "light";
            localStorage.setItem("theme", "light");
        },
    },
});
export const { setThemeDark, setThemeLight } = themeSlice.actions;
