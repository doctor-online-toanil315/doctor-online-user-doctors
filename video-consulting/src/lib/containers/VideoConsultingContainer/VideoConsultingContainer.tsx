import React, { useEffect } from "react";
import { StyledVideoConsultingContainer } from "./styled";
import { useSearchParams } from "react-router-dom";
import { useGetMeQuery, useGetUserByIdQuery } from "src/lib/services";
import {
  CameraIcon,
  HangUpIcon,
  MicroPhoneIcon,
} from "doctor-online-components";
import useSocket from "src/lib/hooks/useSocket";
import { RootState, useCommonSelector } from "doctor-online-common";

const VideoConsultingContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: currentUserLogin } = useGetMeQuery();
  const { from, to } = Object.fromEntries(searchParams.entries());
  const targetUserId = from === currentUserLogin?.data.id ? to : from;
  const { data: targetUser } = useGetUserByIdQuery(targetUserId, {
    skip: !targetUserId || !currentUserLogin,
    refetchOnMountOrArgChange: true,
  });
  const { client } = useCommonSelector((state: RootState) => state.webSocket);

  const {
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
  } = useSocket(client);

  // useEffect(() => {
  //   if (client && from === currentUserLogin?.data.id) {
  //     handShake(to);
  //   }

  //   if (client && to === currentUserLogin?.data.id) {
  //     establishHandShake(from);
  //   }
  // }, [client, from, currentUserLogin]);

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
      {stream && (
        <video
          ref={smallVideoRef}
          className="small-video"
          playsInline
          muted
          autoPlay
        />
      )}
      <div className="footer">
        <div className="action">
          <MicroPhoneIcon />
        </div>
        <div className="hang-up" onClick={() => callUser(targetUserId)}>
          <HangUpIcon />
        </div>
        <div className="action" onClick={() => answerCall()}>
          <CameraIcon />
        </div>
      </div>
    </StyledVideoConsultingContainer>
  );
};

export default VideoConsultingContainer;
