import { PrivateRoute, ROLE_ENUM } from "doctor-online-common";
import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import { NavigationManager } from "../HOC";
import { HocPermissionRoute } from "../HOC/HocPermissionRoute";
import { DoctorDetailPage, DoctorListPage } from "../pages";

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    }
  >
    <Route path="/" element={<PrivateRoute />}>
      <Route
        index
        element={
          <HocPermissionRoute
            role={ROLE_ENUM.USER}
            component={<Navigate to="/list" />}
          />
        }
      />
      <Route
        path="/list"
        element={
          <HocPermissionRoute
            role={ROLE_ENUM.USER}
            component={<DoctorListPage />}
          />
        }
      />
      <Route
        path="/:doctorId"
        element={
          <HocPermissionRoute
            role={ROLE_ENUM.USER}
            component={<DoctorDetailPage />}
          />
        }
      />
    </Route>
  </Route>
);

export default routes;
