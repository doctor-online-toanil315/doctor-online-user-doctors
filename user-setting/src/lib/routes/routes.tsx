import { PrivateRoute, ROLE_ENUM } from "doctor-online-common";
import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import { NavigationManager } from "../HOC";
import { DoctorDetailPage } from "../pages";

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={
      <NavigationManager>
        <div>
          <Outlet />
        </div>
      </NavigationManager>
    }
  >
    <Route path="/" element={<PrivateRoute />}>
      <Route index element={<Navigate to="/me" />} />
      <Route path="me" element={<DoctorDetailPage />} />
    </Route>
  </Route>
);

export default routes;
