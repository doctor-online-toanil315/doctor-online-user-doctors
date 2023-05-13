import { LongArrowRightIcon, StarIcon } from "doctor-online-components";
import { DoctorType } from "src/lib/types/DoctorType";
import { DoctorCardContainer } from "./styled";

interface DoctorCardProps {
  doctorItem?: DoctorType;
}

const DoctorCard = ({ doctorItem }: DoctorCardProps) => {
  return doctorItem ? (
    <DoctorCardContainer>
      <img
        src={
          doctorItem.avatar ??
          "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
        }
        alt="doctor image"
      />
      <div className="infos">
        <h4>{`Dr. ${doctorItem.firstName} ${doctorItem.lastName}`}</h4>
        <p>{doctorItem.specializeTitle}</p>
        <p>
          <span>
            <StarIcon fill="#f6f6f6" width={12} />
            {doctorItem.rating.toFixed(1)}
          </span>
          <span className="dot">•</span>
          <span>50+ Reviews</span>
          <LongArrowRightIcon />
        </p>
      </div>
    </DoctorCardContainer>
  ) : null;
};

export default DoctorCard;
