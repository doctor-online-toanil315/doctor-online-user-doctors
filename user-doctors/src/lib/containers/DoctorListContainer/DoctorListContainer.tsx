import {
  Button,
  ClockIcon,
  LikeIcon,
  MoneyIcon,
  RoundedPersonIcon,
  StarGold,
  Table,
} from "doctor-online-components";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { StyledDoctorCardContainer, StyledDoctorListContainer } from "./styled";
import { Pagination } from "antd";
import { useGetDoctorsQuery } from "src/lib/services";

const DoctorListContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    specialList: specialListParams,
    fromPrice,
    toPrice,
    page,
  } = Object.fromEntries(searchParams.entries());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: doctors } = useGetDoctorsQuery(
    {
      page: Number(page),
      size: 5,
      from: Number(fromPrice),
      to: Number(toPrice),
      specialList: specialListParams?.split(",") ?? [],
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  return (
    <StyledDoctorListContainer>
      <div className="doctor-list">
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
                    <MoneyIcon /> {doctor.price.toLocaleString()} VND
                  </p>
                  <Link to="/f0c2fe5d-aacf-43cc-b456-89076926913d">
                    <Button type="primary">Book Appointment</Button>
                  </Link>
                </div>
              </StyledDoctorCardContainer>
            </Fragment>
          );
        })}
      </div>
      <Pagination
        hideOnSinglePage
        current={currentPage}
        total={doctors?.totalItems}
        defaultPageSize={5}
        onChange={(value) => {
          searchParams.delete("page");
          searchParams.append("page", String(value));
          setSearchParams(searchParams);
        }}
      />
    </StyledDoctorListContainer>
  );
};

export default DoctorListContainer;
