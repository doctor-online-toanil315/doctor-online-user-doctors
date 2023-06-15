import { PrivateRoute, ROLE_ENUM } from "doctor-online-common";
import { createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { NavigationManager } from "../HOC";
import { BlogDetail, BlogList } from "../pages";
import { HocPermissionRoute } from "../HOC/HocPermissionRoute";

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
      <Route
        index
        element={
          <HocPermissionRoute role={ROLE_ENUM.USER} component={<BlogList />} />
        }
      />
      <Route
        path="/:blogId"
        element={
          <HocPermissionRoute
            role={ROLE_ENUM.USER}
            component={<BlogDetail />}
          />
        }
      />
    </Route>
  </Route>
);

export default routes;
