import { PermissionRoute, PrivateRoute } from "@nexthcm/common";
import {
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
} from "react-router-dom";
import { NavigationManager } from "../HOC";
import { DetailModal } from "../containers/DetailModal";
import { List, WFH, MyRequest, WorkingHours, MyLeave } from "../pages";
import UpdateTimeSheet from "../containers/UpdateTimesheet/UpdateTimesheet";
import { WorkingAfterHours } from "../containers/WorkingAfterHours";
import { permissionMyTimeEnum } from "../types/permisstions";
import { WorkingOnsite } from "../pages/RequestManagement";
import LeaveList from "../pages/LeaveList/LeaveList";
import { Everyone, OnlyMe } from "../containers/WorkingHours";
import DetailMyRequestsModal from "../containers/DetailModal/DetailMyRequestModal";
import WorkingOnsites from "../pages/MyRequest/WorkingOnsites/WorkingOnsites";
import WorkingAfterHourss from "../pages/MyRequest/WorkingAfterHourss/WorkingAfterHourss";
import UpdateTimeSheets from "../pages/MyRequest/UpdateTimeSheets/UpdateTimeSheets";
import WorkFromHome from "../pages/MyRequest/WorkFromHome/WorkFromHome";
import { MyLeaveDetailModal } from "../containers";

const routes = createRoutesFromElements(
  <Route
    path="/*"
    element={
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    }
  >
    <Route path="/*" element={<PrivateRoute />}>
      <Route index element={<Navigate to="my-leave" />} />
      <Route
        path="my-leave/*"
        element={
          <PermissionRoute
            permissions={[permissionMyTimeEnum.VIEW_MY_LEAVE]}
            component={<MyLeave />}
          />
        }
      >
        <Route path=":id" element={<MyLeaveDetailModal />} />
      </Route>

      <Route
        path="requests/*"
        element={
          <PermissionRoute
            permissions={[permissionMyTimeEnum.VIEW_REQUEST_MANAGEMENT]}
            component={<List />}
          />
        }
      >
        <Route index element={<Navigate to="leave" />} />
        <Route path="leave/*" element={<LeaveList />}>
          <Route path=":id" element={<DetailModal typeRequest="leave" />} />
        </Route>

        <Route path="working-after-hours/*" element={<WorkingAfterHours />}>
          <Route
            path=":id"
            element={<DetailModal typeRequest="working-after-hours" />}
          />
        </Route>

        <Route path="timesheet-updates/*" element={<UpdateTimeSheet />}>
          <Route
            path=":id"
            element={<DetailModal typeRequest="timesheet-updates" />}
          />
        </Route>
        <Route path="working-onsite/*" element={<WorkingOnsite />}>
          <Route
            path=":id"
            element={<DetailModal typeRequest="working-onsite" />}
          />
        </Route>
        <Route path="work-from-home/*" element={<WFH />}>
          <Route
            path=":id"
            element={<DetailModal typeRequest="work-from-home" />}
          />
        </Route>
      </Route>

      <Route
        path="working-hours/*"
        element={
          <PermissionRoute
            permissions={[permissionMyTimeEnum.VIEW_WORKING_HOUR_ONLYME]}
            component={<WorkingHours />}
          />
        }
      />
      <Route path="working-hours/everyone" element={<Everyone />} />

      <Route path="working-hours/*" element={<WorkingHours />}>
        <Route
          path="only-me"
          element={
            <PermissionRoute
              permissions={[permissionMyTimeEnum.VIEW_WORKING_HOUR_ONLYME]}
              component={<OnlyMe />}
            />
          }
        />
        <Route
          path="everyone"
          element={
            <PermissionRoute
              permissions={[permissionMyTimeEnum.VIEW_WORKING_HOUR_ONLYME]}
              component={<Everyone />}
            />
          }
        />
      </Route>

      <Route
        path="my-requests/*"
        element={
          <PermissionRoute
            permissions={[permissionMyTimeEnum.VIEW_MY_REQUEST]}
            component={<MyRequest />}
          />
        }
      >
        <Route index element={<Navigate to="working-after-hours" />} />
        <Route path="working-after-hours/*" element={<WorkingAfterHourss />}>
          <Route
            path=":id"
            element={
              <DetailMyRequestsModal typeRequest="working-after-hours" />
            }
          />
        </Route>

        <Route path="update-timesheet/*" element={<UpdateTimeSheets />}>
          <Route
            path=":id"
            element={<DetailMyRequestsModal typeRequest="update-timesheet" />}
          />
        </Route>

        <Route path="working-onsite/*" element={<WorkingOnsites />}>
          <Route
            path=":id"
            element={<DetailMyRequestsModal typeRequest="working-onsite" />}
          />
        </Route>

        <Route path="work-from-home/*" element={<WorkFromHome />}>
          <Route
            path=":id"
            element={<DetailMyRequestsModal typeRequest="work-from-home" />}
          />
        </Route>
      </Route>
    </Route>
  </Route>
);

export default routes;
