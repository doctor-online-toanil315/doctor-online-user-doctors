import { PrivateRoute, ROLE_ENUM } from "doctor-online-common";
import { createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { NavigationManager } from "../HOC";
import { HocPermissionRoute } from "../HOC/HocPermissionRoute";
import { ListPayments } from "../pages/ListPayments";

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
            role={ROLE_ENUM.ADMIN}
            component={<ListPayments />}
          />
        }
      />
    </Route>
  </Route>
);

export default routes;
