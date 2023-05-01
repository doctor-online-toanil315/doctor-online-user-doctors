import { PrivateRoute } from "doctor-online-common";
import { createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { NavigationManager } from "../HOC";
import { VideoConsulting } from "../pages";

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
      <Route index element={<VideoConsulting />} />
    </Route>
  </Route>
);

export default routes;
