import { PrivateRoute } from '@nexthcm/common';
import { createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import { NavigationManager } from '../HOC';
import { NotificationSettings } from '../pages/NotificationSettings';

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
      <Route path="settings" element={<NotificationSettings />} />
    </Route>
  </Route>
);

export default routes;
