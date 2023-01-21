import { permissionMyTimeEnum } from '../../../../types';

export const navLinks = (openLink: string) => {
  switch (openLink) {
    case 'overview':
      return [
        {
          path: '/overview/me',
          display: 'overviewTabs.onlyMe',
          key: '/overview/me',
          permission: permissionMyTimeEnum.VIEW_WORKING_HOUR_ONLYME
        },
        {
          path: '/overview/everyone',
          display: 'overviewTabs.everyone',
          key: '/overview/everyone',
          permission: permissionMyTimeEnum.VIEW_WORKING_HOUR_EVERYONE
        }
      ];

    default:
      return [];
  }
};
