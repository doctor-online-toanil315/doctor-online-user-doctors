export const navLinks = (openLink: string) => {
  switch (openLink) {
    case 'overview':
      return [
        {
          path: '/overview/me',
          display: 'overviewTabs.onlyMe',
          key: '/overview/me'
        },
        {
          path: '/overview/everyone',
          display: 'overviewTabs.everyone',
          key: '/overview/everyone'
        }
      ];

    default:
      return [];
  }
};
