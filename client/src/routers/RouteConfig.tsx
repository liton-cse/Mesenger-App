// routes.ts
import { lazy } from "react";
import { type AppRoute } from "./routeTypes.js";

const Login = lazy(() => import("../components/auth/Login"));
const ForgetPassword = lazy(() => import("../components/auth/ForgetPassword"));
const VerifyEmail = lazy(() => import("../components/auth/VerifyEmail"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const MessengerApp = lazy(() => import("../page/Mesenger"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));

export const publicRoutes: AppRoute[] = [
  { path: "/", element: Login, layout: MainLayout },
  { path: "/forget-password", element: ForgetPassword, layout: MainLayout },
  { path: "/verify-otp", element: VerifyEmail, layout: MainLayout },
  { path: "/reset-password", element: ResetPassword, layout: MainLayout },
];

export const privateRoutes: AppRoute[] = [
  { path: "/", element: MessengerApp, layout: MainLayout },
];
