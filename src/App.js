import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/app/AppLayout";
import InLayout from "./layouts/in/InLayout";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

import OverviewPage from "./pages/OverviewPage";
import EmployeesPage from "./pages/EmployeesPage";

import CreateWorkspacePage from "./pages/CreateWorkspacePage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sign-in" element={<AuthPage IsSignIn={true} />} />
        <Route path="sign-up" element={<AuthPage />} />
        <Route path="u" element={<InLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="create-workspace" element={<CreateWorkspacePage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}
