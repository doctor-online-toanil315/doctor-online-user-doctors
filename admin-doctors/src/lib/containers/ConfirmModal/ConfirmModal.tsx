import React from "react";
import { StyledConfirmModal } from "./styled";
import { Button, DangerIcon } from "doctor-online-components";

interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
}

const ConfirmModal = ({ handleClose, handleSubmit }: Props) => {
  return (
    <StyledConfirmModal>
      <DangerIcon />
      <p>Are you sure you want to delete this doctor?</p>
      <div className="user-ctrl">
        <Button onClick={handleClose} border="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>OK</Button>
      </div>
    </StyledConfirmModal>
  );
};

export default ConfirmModal;
