import React from "react";
import {
  StyledDoctorReviewsContainer,
  StyledDoctorReviewsItem,
  Title,
} from "./styled";
import {
  LikeIcon,
  StarBold,
  StarGold,
  StarIcon,
} from "doctor-online-components";
import { theme } from "doctor-online-common";

const DoctorReviewes = () => {
  return (
    <StyledDoctorReviewsContainer>
      <div className="header">
        <Title>Patients Feedback for Dr. Jacob Jones</Title>
        <p className="feedback">Share your feed back</p>
      </div>
      <p className="number-of-result">129 Results</p>
      <ul>
        <li>
          <DoctorReviewItem />
        </li>
      </ul>
    </StyledDoctorReviewsContainer>
  );
};

const DoctorReviewItem = () => {
  return (
    <StyledDoctorReviewsItem>
      <img
        className="avatar"
        src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
        alt="doctor avatar"
      />
      <div className="review-content">
        <div className="header">
          <div className="content">
            <h5>Delowar Hussen</h5>
            <p className="time-ago">Reviewed 2 Days ago</p>
            <p className="used-service">Visited For Dental Implant Fixing</p>
            <p className="recommend">
              <LikeIcon stroke={theme.strongBlue} /> I recommend the doctor
            </p>
          </div>
          <ul className="rating">
            <li>
              <StarGold />
            </li>
            <li>
              <StarGold />
            </li>
            <li>
              <StarGold />
            </li>
            <li>
              <StarGold />
            </li>
          </ul>
        </div>
        <p className="review">
          My experience was really nice. Sir gave complete about weight
          management. His diagnosis is very good take complete details of the
          patient's past and present life style. I really hope for the best
          forever.
        </p>
        <p className="happy-with">
          <span>Happy with:</span>
          <span className="happy-item">Doctor friendliness</span>
          <span className="happy-item">Treatment Satisfaction</span>
        </p>
      </div>
    </StyledDoctorReviewsItem>
  );
};

export default DoctorReviewes;
