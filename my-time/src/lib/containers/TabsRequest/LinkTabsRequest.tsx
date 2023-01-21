export const navLinks = (openLink: string) => {
  switch (openLink) {
    case 'requests':
      return [
        {
          path: '/my-time/requests/leave',
          display: 'tabs.leave',
          key: '/my-time/requests/leave'
        },
        {
          path: '/my-time/requests/working-after-hours',
          display: 'tabs.workingAfterHours',
          key: '/my-time/requests/working-after-hours'
        },
        {
          path: '/my-time/requests/timesheet-updates',
          display: 'tabs.updateTimesheet',
          key: '/my-time/requests/timesheet-updates'
        },
        {
          path: '/my-time/requests/working-onsite',
          display: 'tabs.workingOnsite',
          key: '/my-time/requests/working-onsite'
        },
        {
          path: '/my-time/requests/work-from-home',
          display: 'tabs.workFromHome',
          key: '/my-time/requests/work-from-home'
        }
      ];

    case 'my-requests':
      return [
        {
          path: '/my-time/my-requests/working-after-hours',
          display: 'tabs.workingAfterHours',
          key: '/my-time/my-requests/working-after-hours'
        },
        {
          path: '/my-time/my-requests/update-timesheet',
          display: 'tabs.updateTimesheet',
          key: '/my-time/my-requests/update-timesheet'
        },
        {
          path: '/my-time/my-requests/working-onsite',
          display: 'tabs.workingOnsite',
          key: '/my-time/my-requests/working-onsite'
        },
        {
          path: '/my-time/my-requests/work-from-home',
          display: 'tabs.workFromHome',
          key: '/my-time/my-requests/work-from-home'
        }
      ];

    default:
      return [];
  }
};
