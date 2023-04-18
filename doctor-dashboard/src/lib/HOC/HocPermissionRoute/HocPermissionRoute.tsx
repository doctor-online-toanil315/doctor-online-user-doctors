import React from "react";
import { PermissionRoute, ROLE_ENUM } from "doctor-online-common";
import { useGetMeQuery } from "src/lib/services";

interface Props {
  role: string;
  component: JSX.Element;
}

const HocPermissionRoute = (props: Props) => {
  const { data } = useGetMeQuery();

  return (
    <PermissionRoute userRole={data?.data.role ?? ROLE_ENUM.USER} {...props} />
  );
};

export default HocPermissionRoute;
