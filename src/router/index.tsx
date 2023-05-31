import { createBrowserRouter, Navigate } from "react-router-dom";

import type { RouteObject } from "react-router-dom";

import React from "react";

import About from "@/pages/about";
import BasicLayout from "@/pages/layout/basic.layout";

const Home = React.lazy(() => import("../pages/home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        meta: {
          title: "home",
          icon: "home",
        },
        Permissions: [],
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/",
});

export default router;
