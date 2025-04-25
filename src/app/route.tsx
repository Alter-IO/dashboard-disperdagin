import { createBrowserRouter } from "react-router";
import { LoginContainer } from "./login/login";
import ErrorPage from "@/shared/view/ErrorPage";
import DashboardLayoutContainer from "@/shared/view/layout/dashboard-layout";
import DashboardContainer from "./dashboard/Dashboard";
import ProtectedRoute from "@/shared/view/ProtectedRoute";
import UserManagementContainer from "./user-management/UserManagement";
import { UserCreateContainer } from "./user-management/container/create/UserCreate";
import CommodityTypesContainer from "./commodity-type/CommodityTypes";
import { CommodityTypeCreateContainer } from "./commodity-type/container/create/CommodityTypeCreate";
import { CommodityTypeEditContainer } from "./commodity-type/container/edit/CommodityTypeEdit";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayoutContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <DashboardContainer />
          </ProtectedRoute>
        ),
      },

      // User Routes
      {
        path: '/user-management',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
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

      // Commodity Type Routes
      {
        path: '/commodity-type',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityTypesContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/commodity-type/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityTypeCreateContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/commodity-type/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityTypeEditContainer />
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
