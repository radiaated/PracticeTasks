import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Section from "./components/Section.tsx";
import Section1 from "./components/Section1.tsx";
import Section2 from "./components/Section2.tsx";
import Section3 from "./components/Section3.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Section />,
  },
  {
    path: "/1",
    element: <Section1 />,
  },
  {
    path: "/2",
    element: <Section2 />,
  },
  {
    path: "/3",
    element: <Section3 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
