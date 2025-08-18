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
import CommodityContainer from "./commodity/Commodity";
import { CommodityCreateContainer } from "./commodity/container/create/CommodityCreate";
import { CommodityDetailContainer } from "./commodity/container/detail/CommodityDetail";
import { CommodityEditContainer } from "./commodity/container/edit/CommodityEdit";
import EmployeeContainer from "./employee/Employee";
import KecamatanContainer from "./kecamatan/Kecamatan";
import { KecamatanCreateContainer } from "./kecamatan/container/create/KecamatanCreate";
import { KecamatanEditContainer } from "./kecamatan/container/edit/KecamatanEdit";
import KelurahanContainer from "./kelurahan/Kelurahan";
import { KelurahanCreateContainer } from "./kelurahan/container/create/KelurahanCreate";
import { KelurahanEditContainer } from "./kelurahan/container/edit/KelurahanEdit";
import PhotoCategoryContainer from "./photo-category/PhotoCategory";
import { PhotoCategoryCreateContainer } from "./photo-category/container/create/PhotoCategoryCreate";
import { PhotoCategoryEditContainer } from "./photo-category/container/edit/PhotoCategoryEdit";
import PhotoContainer from "./photo/Photo";
import VideoContainer from "./video/Video";
import { VideoCreateContainer } from "./video/container/create/VideoCreate";
import { VideoDetailContainer } from "./video/container/detail/VideoDetail";
import { PhotoCreateContainer } from "./photo/container/create/PhotoCreate";
import { PhotoDetailContainer } from "./photo/container/detail/PhotoDetail";
import { PhotoEditContainer } from "./photo/container/edit/PhotoEdit";

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

      // Commodity Routes
      {
        path: '/commodity',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/commodity/:id/detail',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityDetailContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/commodity/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityEditContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/commodity/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <CommodityCreateContainer />
          </ProtectedRoute>
        ),
      },

      // Employee Routes
      {
        path: '/employee',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <EmployeeContainer />
          </ProtectedRoute>
        ),
      },
      // Kecamatan Routes
      {
        path: '/kecamatan',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <KecamatanContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/kecamatan/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <KecamatanCreateContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/kecamatan/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <KecamatanEditContainer />
          </ProtectedRoute>
        ),
      },
      // Kelurahan Routes
      {
        path: '/kelurahan',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <KelurahanContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/kelurahan/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <KelurahanCreateContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/kelurahan/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <KelurahanEditContainer />
          </ProtectedRoute>
        ),
      },
      // Photo Category Routes
      {
        path: '/photo-category',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoCategoryContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/photo-category/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoCategoryCreateContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/photo-category/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoCategoryEditContainer />
          </ProtectedRoute>
        ),
      },

      // Photo Routes
      {
        path: '/photo',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/photo/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoCreateContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/photo/:id/detail',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoDetailContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/photo/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <PhotoEditContainer />
          </ProtectedRoute>
        ),
      },

      // Video Routes
      {
        path: '/video',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <VideoContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/video/create',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <VideoCreateContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/video/:id/detail',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
            <VideoDetailContainer />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: '/video/:id/edit',
      //   element: (
      //     <ProtectedRoute allowedRoles={['superadmin', "admin"]}>
      //       <VideoEditContainer />
      //     </ProtectedRoute>
      //   ),
      // },
    ]
  },
  {
    path: "/login",
    element: <LoginContainer />,
    errorElement: <ErrorPage />,
  },
]);
