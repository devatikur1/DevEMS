import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/app/AppLayout";
import HomePage from "./pages/HomePage";
import ULayout from "./layouts/u/ULayout";
import OverviewPage from "./pages/OverviewPage";
import CreateWorkspacePage from "./pages/CreateWorkspacePage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sign-in" element={<AuthPage IsSignIn={true} />} />
        <Route path="sign-up" element={<AuthPage />} />
        <Route path="u" element={<ULayout />}>
          <Route index element={<OverviewPage />} />
        </Route>
        <Route path="/create-workspace" element={<CreateWorkspacePage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
