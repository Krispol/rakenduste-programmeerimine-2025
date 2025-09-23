import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import HelloBtn from "./components/HelloBtn";
import DrawerAppBar from "./components/DrawerAppBar";
//import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <DrawerAppBar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/HelloBtn", element: <HelloBtn /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
