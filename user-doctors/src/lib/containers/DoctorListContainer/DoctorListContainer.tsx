import {
  Button,
  ClockIcon,
  LikeIcon,
  MoneyIcon,
  RoundedPersonIcon,
  StarGold,
  Table,
} from "doctor-online-components";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { StyledDoctorCardContainer, StyledDoctorListContainer } from "./styled";
import { Pagination } from "antd";
import { useGetDoctorsQuery } from "src/lib/services";

const DoctorListContainer = () => {
  const tableInstance = Table.useTable();
  const { data: doctors } = useGetDoctorsQuery({
    page: 1,
    size: 10,
  });

  return (
    <StyledDoctorListContainer>
      {doctors?.data.map((doctor) => {
        return (
          <Fragment>
            <StyledDoctorCardContainer>
              <div className="doctor-infos">
                <div className="doctor-img">
                  <img src={doctor.avatar ?? ""} alt="doctor avatar" />
                </div>
                <div className="infos">
                  <h3>Dr. {`${doctor.firstName} ${doctor.lastName}`}</h3>
                  <div className="rating">
                    <span>
                      <StarGold /> {doctor.rating.toFixed(1)}
                    </span>
                    <span className="dot" />
                    <span>45+ reviews</span>
                  </div>
                  <p>{doctor.yearOfExperience} Years Of Experience</p>
                  <p>
                    <RoundedPersonIcon /> {doctor.specializeTitle}
                  </p>
                </div>
              </div>
              <div className="appointment-infos">
                <p>
                  <LikeIcon /> 98% (250 votes)
                </p>
                <p>
                  <ClockIcon /> Avilabale Today
                </p>
                <p>
                  <MoneyIcon /> ${doctor.price}
                </p>
                <Link to="/f0c2fe5d-aacf-43cc-b456-89076926913d">
                  <Button type="primary">Book Appointment</Button>
                </Link>
              </div>
            </StyledDoctorCardContainer>
          </Fragment>
        );
      })}
    </StyledDoctorListContainer>
  );
};

export default DoctorListContainer;
