import { themeSlice } from "@/features/theme/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Theme() {
    const theme = useSelector((state) => state[themeSlice.reducerPath].theme);
    const oldTheme = theme === "dark" ? "light" : "dark";
    console.log(theme);

    useEffect(() => {
        document.documentElement.classList.remove(oldTheme);
        document.documentElement.classList.add(theme);
    }, [theme, oldTheme]);
    return null;
}
