import { Link, useLocation } from 'react-router-dom';
import { StyledContainerLink, StyledLink, StyledTabs } from './styles';
import { LinkType } from './link';
import { navLinks } from './LinkTabsOverView';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const TabsOverView = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [openLink, setOpenLink] = useState('/');
  const [openKey, setOpenKey] = useState('/');

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenLink(paths[1]);
    setOpenKey(paths.slice(0, 3).join('/'));
  }, [pathname]);

  return (
    <StyledTabs>
      <StyledContainerLink tabBarGutter={24} activeKey={openKey}>
        {navLinks(openLink).length > 0 &&
          navLinks(openLink).map((item: LinkType) => (
            <StyledLink
              key={item.key}
              tab={
                <Link className="custom-link-header" to={item.path}>
                  {t(item.display)}
                </Link>
              }
            />
          ))}
      </StyledContainerLink>
    </StyledTabs>
  );
};

export default TabsOverView;
