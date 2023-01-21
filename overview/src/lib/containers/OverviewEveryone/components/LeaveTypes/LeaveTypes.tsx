import { StyledContainerLeaveTypes } from "./styles";
import { Title } from "@nexthcm/components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetLeaveTypesQuery } from "../../../../services";

interface LeaveTypesProps {
  name: string;
  shortName: string;
}

const LeaveTypes = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [leaveTypes, setLeaveTypes] = useState<LeaveTypesProps[]>([]);

  const { data: leaveTypesData } = useGetLeaveTypesQuery(
    {
      year: searchParams.get("year"),
      month: searchParams.get("month"),
      search: searchParams.get("search") ?? "",
      filterType: searchParams.get("filterType") ?? "",
    },
    {
      skip:
        searchParams.get("year") === null && searchParams.get("month") === null,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (leaveTypesData) {
      setLeaveTypes(leaveTypesData.data);
    }
  }, [leaveTypesData]);

  return (
    <StyledContainerLeaveTypes>
      <Title className="mb-8" level={5}>
        {t("overViewEveryone.leaveTypes")}
      </Title>
      <div className="content-leave-types">
        {leaveTypes.map((item: LeaveTypesProps, index) => (
          <div className="type" key={index}>
            <span className="text-type mr-4 fw-700">{item.shortName}</span>
            <span className="text-type">{item.name}</span>
          </div>
        ))}
      </div>
    </StyledContainerLeaveTypes>
  );
};

export default LeaveTypes;
