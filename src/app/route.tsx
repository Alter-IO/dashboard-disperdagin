import { createBrowserRouter } from "react-router";
import { LoginContainer } from "./login/login";
import ErrorPage from "@/shared/view/ErrorPage";
import DashboardLayoutContainer from "@/shared/view/layout/dashboard-layout";
import DashboardContainer from "./dashboard/Dashboard";
import ProtectedRoute from "@/shared/view/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayoutContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', 'monitoring', 'user']}>
            <DashboardContainer />
          </ProtectedRoute>
        ),
      },
    ]
  },
  {
    path: "/login",
    element: <LoginContainer />,
    errorElement: <ErrorPage />,
  },
]);
