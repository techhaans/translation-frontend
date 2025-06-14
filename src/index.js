import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

(function ensureHashRouting() {
    const { pathname, search, hash } = window.location;
    if (!hash && pathname !== "/") {
        window.history.replaceState(
            null,
            "",
            `/#${pathname}${search}`
        );
    }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);


