import { RootState, useCommonSelector } from '@nexthcm/common';
import { Outlet } from 'react-router-dom';
import { OverviewCICO } from '../../containers/OverviewCICO';
import { TabsOverView } from '../../containers/OverviewEveryone/components/TabsOverView';

const List = () => {
  const { permissions: permissionCommon } = useCommonSelector(
    (state: RootState) => state.user
  );

  return (
    <div>
      <OverviewCICO></OverviewCICO>
      <TabsOverView />
      <Outlet />
    </div>
  );
};

export default List;
