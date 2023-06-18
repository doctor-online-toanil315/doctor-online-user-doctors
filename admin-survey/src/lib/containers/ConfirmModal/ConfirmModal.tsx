import React from "react";
import { StyledConfirmModal } from "./styled";
import { Button, DangerIcon } from "doctor-online-components";

interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

const ConfirmModal = ({ handleClose, handleSubmit, isLoading }: Props) => {
  return (
    <StyledConfirmModal>
      <DangerIcon />
      <p>Are you sure you want to publish this survey?</p>
      <div className="user-ctrl">
        <Button onClick={handleClose} border="outline">
          Cancel
        </Button>
        <Button loading={isLoading} onClick={handleSubmit}>
          OK
        </Button>
      </div>
    </StyledConfirmModal>
  );
};

export default ConfirmModal;
