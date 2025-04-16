import { createBrowserRouter } from "react-router";
import { LoginContainer } from "./login/login";
import ErrorPage from "@/shared/view/ErrorPage";
import DashboardLayoutContainer from "@/shared/view/layout/dashboard-layout";
import DashboardContainer from "./dashboard/Dashboard";
import ProtectedRoute from "@/shared/view/ProtectedRoute";
import UserManagementContainer from "./user-management/UserManagement";
import { UserCreateContainer } from "./user-management/container/create/UserCreate";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayoutContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <DashboardContainer />
          </ProtectedRoute>
        ),
      },

      // User Routes
      {
        path: '/user-management',
        element: (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <UserManagementContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user-management/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <UserCreateContainer />
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
