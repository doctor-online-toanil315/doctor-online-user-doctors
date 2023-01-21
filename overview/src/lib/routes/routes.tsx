import { PrivateRoute, PermissionRoute } from '@nexthcm/common';
import {
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
} from 'react-router-dom';
import { NavigationManager } from '../HOC';
import { permissionOverviewEnum, permissionMyTimeEnum } from '../types';
import { List } from '../pages';
import { Everyone } from '../pages/Everyone';
import { OnlyMe } from '../pages/OnlyMe';

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    }
  >
    <Route path="/*" element={<PrivateRoute />}>
      <Route
        path="/*"
        element={
          <PermissionRoute
            permissions={[permissionOverviewEnum.VIEW_OVERVIEW]}
            component={<List />}
          />
        }
      >
        <Route index element={<Navigate to="me" />} />
        <Route
          path="me"
          element={
            <PermissionRoute
              permissions={[permissionMyTimeEnum.VIEW_WORKING_HOUR_ONLYME]}
              component={<OnlyMe />}
            />
          }
        />
        <Route
          path="everyone"
          element={
            <PermissionRoute
              permissions={[permissionMyTimeEnum.VIEW_WORKING_HOUR_EVERYONE]}
              component={<Everyone />}
            />
          }
        />
      </Route>
    </Route>
  </Route>
);

export default routes;
