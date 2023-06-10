import React from "react";
import {
  StyledDoctorReviewsContainer,
  StyledDoctorReviewsItem,
  Title,
} from "./styled";
import { LikeIcon, Modal, StarGold } from "doctor-online-components";
import { theme, useModal } from "doctor-online-common";
import {
  useGetDoctorByIdQuery,
  useGetDoctorReviewsQuery,
} from "src/lib/services";
import { useParams } from "react-router-dom";
import { DoctorReview } from "src/lib/types/DoctorType";
import moment from "moment";
import NotFoundImg from "src/lib/assets/doctor-not-found.png";

const DoctorReviewes = () => {
  const { doctorId } = useParams();
  const modal = useModal();
  const { data: reviews, isLoading } = useGetDoctorReviewsQuery(
    doctorId ?? "",
    {
      skip: !doctorId,
    }
  );
  const { data: doctorById } = useGetDoctorByIdQuery(doctorId ?? "", {
    skip: !doctorId,
  });

  return (
    <StyledDoctorReviewsContainer>
      <div className="header">
        <Title>
          Patients Feedback for Dr.{" "}
          {`${doctorById?.data.user?.firstName} ${doctorById?.data.user?.lastName}`}
        </Title>
      </div>
      <p className="number-of-result">{reviews?.data.length} Results</p>
      <ul>
        {!isLoading && reviews?.data.length ? (
          reviews?.data.map((review) => {
            return (
              <li key={review.id}>
                <DoctorReviewItem review={review} />
              </li>
            );
          })
        ) : (
          <div className="empty">
            <img src={NotFoundImg} alt="empty" />
            <p>
              There are no feed backs for Dr.{" "}
              {`${doctorById?.data.user?.firstName} ${doctorById?.data.user?.lastName}`}{" "}
              recently
            </p>
          </div>
        )}
      </ul>
    </StyledDoctorReviewsContainer>
  );
};

interface DoctorReviewItemProps {
  review: DoctorReview;
}

const DoctorReviewItem = ({ review }: DoctorReviewItemProps) => {
  return (
    <StyledDoctorReviewsItem>
      <img
        className="avatar"
        src={
          review.user?.avatar ??
          "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
        }
        alt="doctor avatar"
      />
      <div className="review-content">
        <div className="header">
          <div className="content">
            <h5>{`${review.user.firstName} ${review.user.lastName}`}</h5>
            <p className="time-ago">
              Reviewed{" "}
              {moment
                .duration(moment().diff(new Date(review.created_at).valueOf()))
                .humanize()}
            </p>
            <p className="used-service">Visited For {review.problem}</p>
            {review.recommend && (
              <p className="recommend">
                <LikeIcon stroke={theme.strongBlue} /> I recommend the doctor
              </p>
            )}
          </div>
          <ul className="rating">
            {new Array(review.rate).fill(1).map((_, index) => {
              return (
                <li key={index}>
                  <StarGold />
                </li>
              );
            })}
          </ul>
        </div>
        <p className="review">{review.experience}</p>
        <p className="happy-with">
          <span>Happy with:</span>
          {review.reasonHappyWith.split(",").map((reason) => {
            return (
              <span key={reason} className="happy-item">
                {reason}
              </span>
            );
          })}
        </p>
      </div>
    </StyledDoctorReviewsItem>
  );
};

export default DoctorReviewes;
