import { PrivateRoute, ROLE_ENUM } from "doctor-online-common";
import {
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import { NavigationManager } from "../HOC";
import { HocPermissionRoute } from "../HOC/HocPermissionRoute";
import { Header } from "../containers/Header";
import { DashBoard } from "../pages/DashBoard";

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={
      <NavigationManager>
        <div>
          <Header />
          <Outlet />
        </div>
      </NavigationManager>
    }
  >
    <Route path="/" element={<PrivateRoute />}>
      <Route
        index
        element={
          <HocPermissionRoute
            role={ROLE_ENUM.DOCTOR}
            component={<DashBoard />}
          />
        }
      />
    </Route>
  </Route>
);

export default routes;
