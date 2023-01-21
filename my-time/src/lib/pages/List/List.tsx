import { ContainerRequestManagement } from './styles';
import { Outlet } from 'react-router-dom';
import { RequestManagement } from '../../containers/Request Management';
import { TabsRequest } from '../../containers/TabsRequest';

const List = () => {
  return (
    <>
      <RequestManagement />
      <ContainerRequestManagement>
        <TabsRequest />
        <Outlet />
      </ContainerRequestManagement>
    </>
  );
};

export default List;
