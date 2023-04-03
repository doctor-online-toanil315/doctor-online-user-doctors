import {
  Button,
  ClockIcon,
  LikeIcon,
  MoneyIcon,
  RoundedPersonIcon,
  StarGold,
} from "doctor-online-components";
import React from "react";
import { Link } from "react-router-dom";
import { StyledDoctorCardContainer, StyledDoctorListContainer } from "./styled";

const DoctorListContainer = () => {
  return (
    <StyledDoctorListContainer>
      <StyledDoctorCardContainer>
        <div className="doctor-infos">
          <div className="doctor-img">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
              alt="doctor avatar"
            />
          </div>
          <div className="infos">
            <h3>Dr. Jacob Jones</h3>
            <div className="rating">
              <span>
                <StarGold /> 4.7
              </span>
              <span className="dot" />
              <span>45+ reviews</span>
            </div>
            <p>
              MDS - Periodonyology and Oral Impantology, BDS <br />
              17 Years Of Experience
            </p>
            <p>
              <RoundedPersonIcon /> Dentist
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
            <MoneyIcon /> $1000
          </p>
          <Link to="/123222">
            <Button type="primary">Book Appointment</Button>
          </Link>
        </div>
      </StyledDoctorCardContainer>
    </StyledDoctorListContainer>
  );
};

export default DoctorListContainer;
