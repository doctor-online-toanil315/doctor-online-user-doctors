import React, { useEffect, useState } from "react";
import { StyledNoteModal, StyledVideoConsultingContainer } from "./styled";
import { useSearchParams } from "react-router-dom";
import { useGetMeQuery, useGetUserByIdQuery } from "src/lib/services";
import {
  Button,
  CameraIcon,
  DangerIcon,
  HangUpIcon,
  MicroPhoneIcon,
  Modal,
} from "doctor-online-components";
import useSocket from "src/lib/hooks/useSocket";
import { useModal } from "doctor-online-common";

const VideoConsultingContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: currentUserLogin } = useGetMeQuery();
  const { from, to } = Object.fromEntries(searchParams.entries());
  const targetUserId = from === currentUserLogin?.data.id ? to : from;
  const { data: targetUser } = useGetUserByIdQuery(targetUserId, {
    skip: !targetUserId || !currentUserLogin,
    refetchOnMountOrArgChange: true,
  });

  const {
    call,
    callAccepted,
    callEnded,
    stream,
    bigVideoRef,
    smallVideoRef,
    leaveCall,
    handShake,
    establishHandShake,
    callUser,
    answerCall,
    connectEstablish,
  } = useSocket();

  useEffect(() => {
    if (from === currentUserLogin?.data.id) {
      console.log("=============handshake", targetUserId);
      handShake(targetUserId);
    }

    if (to === currentUserLogin?.data.id) {
      console.log("=============establishHandShake", from);
      establishHandShake(from);
    }
  }, [from, currentUserLogin]);

  useEffect(() => {
    if (connectEstablish) {
      callUser(targetUserId);
    }
  }, [connectEstablish]);

  useEffect(() => {
    if (Object.keys(call).length > 0) {
      modal.handleOpen();
    }
  }, [call]);

  const modal = useModal();

  return (
    <StyledVideoConsultingContainer>
      {!callAccepted && (
        <div className="ringing">
          <img
            src={
              targetUser?.data.avatar ??
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="target user avatar"
          />
          <h3>{`${targetUser?.data.firstName} ${targetUser?.data.lastName}`}</h3>
          <p>Ringing...</p>
        </div>
      )}
      {callAccepted && !callEnded && (
        <video ref={bigVideoRef} className="big-video" playsInline autoPlay />
      )}
      <video
        ref={smallVideoRef}
        className="small-video"
        playsInline
        autoPlay
        muted
      />
      <div className="footer">
        <div className="action">
          <MicroPhoneIcon />
        </div>
        <div className="hang-up">
          <HangUpIcon />
        </div>
        <div className="action">
          <CameraIcon />
        </div>
      </div>
      <Modal open={modal.isOpen} width={450} onCancel={modal.handleClose}>
        <StyledNoteModal>
          <DangerIcon />
          <p>Note that during the meeting, the camera will always be on</p>
          <Button
            onClick={() => {
              answerCall();
              modal.handleClose();
            }}
          >
            Ok
          </Button>
        </StyledNoteModal>
      </Modal>
    </StyledVideoConsultingContainer>
  );
};

export default VideoConsultingContainer;
