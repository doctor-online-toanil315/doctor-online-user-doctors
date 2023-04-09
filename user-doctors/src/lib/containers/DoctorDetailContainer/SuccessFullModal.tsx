import { Button } from "doctor-online-components";
import React from "react";
import SuccessFullImg from "src/lib/assets/success.png";
import { StyledSuccessFullModal } from "./styled";

interface Props {
  handleCancel: () => void;
}

const SuccessFullModal = ({ handleCancel }: Props) => {
  return (
    <StyledSuccessFullModal>
      <img src={SuccessFullImg} />
      <h1>Congratulations!</h1>
      <p>Your Appointment Request is Successfully</p>
      <span>Doctor will see and reply for your appointment. Please wait</span>
      <Button onClick={handleCancel}>Make a new Appointment</Button>
    </StyledSuccessFullModal>
  );
};

export default SuccessFullModal;
