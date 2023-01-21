import { permissionMyTimeEnum } from '../../types/permisstions';

export const navLinks = (openLink: string) => {
  switch (openLink) {
    case 'my-time':
      return [
        {
          path: '/my-time/working-hours/only-me',
          display: 'tabs.workingHoursOnlyMe',
          key: '/my-time/working-hours/only-me',
          permission: permissionMyTimeEnum.VIEW_WORKING_HOUR_ONLYME
        },
        {
          path: '/my-time/working-hours/everyone',
          display: 'tabs.workingHoursEveryOne',
          key: '/my-time/working-hours/everyone',
          permission: permissionMyTimeEnum.VIEW_WORKING_HOUR_EVERYONE
        }
      ];

    default:
      return [];
  }
};
