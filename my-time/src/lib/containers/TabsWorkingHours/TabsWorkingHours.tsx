import { Link, useLocation } from 'react-router-dom';
import { StyledContainerLink, StyledLink, StyledTabs } from './styles';
import { LinkType } from './link';
import { navLinks } from './LinkTabsWorkingHours';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { RootState, useCommonSelector } from '@nexthcm/common';

const TabsWorkingHours = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [openLink, setOpenLink] = useState('/');
  const [openKey, setOpenKey] = useState('/');
  const { permissions } = useCommonSelector((state: RootState) => state.user);

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenLink(paths[1]);
    setOpenKey(paths.slice(0, 4).join('/'));
  }, [pathname]);

  return (
    <StyledTabs>
      <StyledContainerLink tabBarGutter={24} activeKey={openKey}>
        {navLinks(openLink).length > 0 &&
          navLinks(openLink).map((item: LinkType) =>
            item?.permission ? (
              permissions.includes(item.permission) && (
                <StyledLink
                  key={item.key}
                  tab={
                    <Link className="custom-link-header" to={item.path}>
                      {t(item.display)}
                    </Link>
                  }
                />
              )
            ) : (
              <StyledLink
                key={item.key}
                tab={
                  <Link className="custom-link-header" to={item.path}>
                    {t(item.display)}
                  </Link>
                }
              />
            )
          )}
      </StyledContainerLink>
    </StyledTabs>
  );
};

export default TabsWorkingHours;
