import {
  CalendarIcon,
  PaperIcon,
  RoundedPersonIcon,
  VideoIcon,
} from "doctor-online-components";
import React from "react";
import { StyledDoctorOverview } from "./styled";
import {
  useGetAppointmentByDoctorQuery,
  useGetConsultationByDoctorQuery,
  useGetMeQuery,
  useGetPatientOfDoctorQuery,
} from "src/lib/services";
import { abbreviateNumber } from "src/lib/utils/formatNumber.util";

const DoctorOverview = () => {
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: appointments } = useGetAppointmentByDoctorQuery(
    {
      page: 1,
      size: 10,
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
    },
    { skip: !currentUserLogin?.data.doctor?.id }
  );
  const { data: patients } = useGetPatientOfDoctorQuery(
    {
      page: 1,
      size: 10,
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
    },
    { skip: !currentUserLogin?.data.doctor?.id }
  );
  const { data: totalConsultations } = useGetConsultationByDoctorQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <StyledDoctorOverview>
      <div className="overview-item purple">
        <div className="icon">
          <CalendarIcon />
        </div>
        <div className="data">
          <h2>{abbreviateNumber(appointments?.totalItems ?? 0)}</h2>
          <p>Appointments</p>
        </div>
      </div>
      <div className="overview-item red">
        <div className="icon">
          <RoundedPersonIcon />
        </div>
        <div className="data">
          <h2>{abbreviateNumber(patients?.totalItems ?? 0)}</h2>
          <p>Patients</p>
        </div>
      </div>
      <div className="overview-item orange">
        <div className="icon">
          <PaperIcon />
        </div>
        <div className="data">
          <h2>{abbreviateNumber(totalConsultations ?? 0)}</h2>
          <p>Consultation</p>
        </div>
      </div>
    </StyledDoctorOverview>
  );
};

export default DoctorOverview;
