import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {APP_ROUTER} from "@/router";
import {Toaster} from "@/components/providers/toaster";
import {ThemeProvider} from "@/components/providers/theme-provider";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={APP_ROUTER}/>
                <Toaster/>
            </ThemeProvider>
        </React.StrictMode>
    );
});