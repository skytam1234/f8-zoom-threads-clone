import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "@splidejs/react-splide/css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { reduxStore } from "./store/store";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={reduxStore.store}>
    <PersistGate loading={null} persistor={reduxStore.persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>
);
