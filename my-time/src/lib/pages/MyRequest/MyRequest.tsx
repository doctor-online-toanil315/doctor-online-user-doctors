import { Outlet } from 'react-router-dom';
import { MyRequestFilter, MyRequestHeader } from '../../containers';
import { TabsRequest } from '../../containers/TabsRequest';
import { MyRequestContainer } from './styles';

const MyRequest = () => {
  return (
    <>
      <MyRequestHeader />
      <MyRequestContainer>
        <TabsRequest />
        <MyRequestFilter />
        <Outlet />
      </MyRequestContainer>
    </>
  );
};

export default MyRequest;
