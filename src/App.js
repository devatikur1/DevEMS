import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
