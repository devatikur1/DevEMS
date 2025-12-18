import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/app/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ULayout from "./layouts/u/ULayout";
import OverviewPage from "./pages/OverviewPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="u" element={<ULayout />}>
          <Route index element={<OverviewPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
