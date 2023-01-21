import { Outlet } from 'react-router-dom';
import { NavigationManager } from '../HOC';
import { Login } from '../pages';

const routes = [
  {
    path: '/*',
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <p>Auth App</p>,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];

export default routes;
