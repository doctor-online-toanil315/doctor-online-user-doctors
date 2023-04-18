import Dropdown from "antd/lib/dropdown";
import React, { useMemo } from "react";
import { useGetMeQuery } from "src/lib/services";
import {
  ProfileContainer,
  StyledDropdownItem,
  StyledProfileOverview,
} from "./styled";
import {
  SettingIcon,
  LogOutIcon,
  DownArrowSvgComponent,
} from "doctor-online-components";
import Divider from "antd/lib/divider";
import { ApiResponseImpl, UserType } from "src/lib/types";

const Profile = () => {
  const { data } = useGetMeQuery();

  const menu = useMemo(() => {
    return [
      {
        key: "1",
        label: <ProfileOverview data={data} />,
      },
      {
        key: "2",
        label: (
          <StyledDropdownItem>
            <SettingIcon />
            <span>Setting</span>
          </StyledDropdownItem>
        ),
      },
      {
        key: "3",
        label: (
          <StyledDropdownItem>
            <LogOutIcon />
            <span>Log out</span>
          </StyledDropdownItem>
        ),
      },
    ];
  }, [data]);

  return (
    <ProfileContainer>
      <Dropdown
        trigger={["click"]}
        menu={{ items: menu }}
        dropdownRender={(menu) => (
          <div>
            {React.cloneElement(menu as React.ReactElement)}
            <Divider style={{ margin: 8 }} />
          </div>
        )}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
        overlayStyle={{ width: 250 }}
      >
        <div className="dropdown-placeholder">
          <img
            src={
              data?.data.avatar ??
              `https://ui-avatars.com/api/?name=${
                data?.data.firstName + " " + data?.data.lastName
              }`
            }
            alt="avatar"
          />
          <DownArrowSvgComponent />
        </div>
      </Dropdown>
    </ProfileContainer>
  );
};

interface ProfileOverviewProps {
  data?: ApiResponseImpl<UserType>;
}

export const ProfileOverview = ({ data }: ProfileOverviewProps) => {
  return (
    <StyledProfileOverview>
      <img
        src={
          data?.data.avatar ??
          `https://ui-avatars.com/api/?name=${
            data?.data.firstName + " " + data?.data.lastName
          }`
        }
        alt="avatar"
      />
      <div className="profile-infos">
        <h3>
          {data?.data.firstName} {data?.data.lastName}
        </h3>
        <span>General Patient</span>
      </div>
    </StyledProfileOverview>
  );
};

export default Profile;
