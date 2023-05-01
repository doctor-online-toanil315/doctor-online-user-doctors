import { useCommonSelector, RootState } from "doctor-online-common";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useGetMeQuery } from "../services";

const useSocket = (client: any) => {
  const { data: currentUserLogin } = useGetMeQuery();
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [call, setCall] = useState<any>({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const bigVideoRef = useRef<HTMLVideoElement>(null);
  const smallVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<any>(null);
  const connection = useRef<any>(null);

  useEffect(() => {
    if (client) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (smallVideoRef.current) {
            smallVideoRef.current.srcObject = currentStream;
          }
        });

      client.on("handShakeEstablished", ({ from }: { from: string }) => {
        callUser(from);
      });

      client.on("callUser", ({ signal, from }) => {
        console.log("==================================callUser: ", {
          signal,
          from,
        });
        setCall({ isReceiveCall: true, from, signal });
      });

      client.on("callEnded", () => {
        leaveCall();
      });
    }

    return () => {
      client?.off("callAccepted");
      client?.off("handShakeEstablished");
      client?.off("callUser");
      client?.off("callEnded");
    };
  }, []);

  // const isFirstRunRef = useRef<boolean>(true);
  // useEffect(() => {
  //   if (Object.keys(call).length > 0 && client && isFirstRunRef.current) {
  //     console.log("===========call: ", call);
  //     answerCall();
  //     isFirstRunRef.current = false;
  //   }
  // }, [call, client]);

  const handShake = (to: string) => {
    if (client) {
      client.emit("handShake", { from: currentUserLogin?.data.id, to });
    }
  };

  const establishHandShake = (to: string) => {
    if (client) {
      client.emit("handShakeEstablished", {
        to,
        from: currentUserLogin?.data.id,
      });
    }
  };

  const answerCall = () => {
    if (client) {
      setCallAccepted(true);
      peerRef.current = new Peer({ initiator: false, trickle: false, stream });
      peerRef.current.on("signal", (data: any) => {
        client.emit("answerCall", { signal: data, to: call.from });
      });
      peerRef.current.on("stream", (currentStream: any) => {
        if (bigVideoRef.current) {
          bigVideoRef.current.srcObject = currentStream;
        }
      });
      peerRef.current.signal(call.signal);
      connection.current = peerRef.current.current;
    }
  };

  const callUser = (id: string) => {
    if (client) {
      peerRef.current = new Peer({ initiator: true, trickle: false, stream });
      peerRef.current.on("signal", (data: any) => {
        client.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: currentUserLogin?.data.id,
        });
      });
      peerRef.current.on("stream", (currentStream: any) => {
        if (bigVideoRef.current) {
          bigVideoRef.current.srcObject = currentStream;
        }
      });

      client.on("callAccepted", (signal) => {
        console.log("=======================call Accepted: ", signal);
        setCallAccepted(true);
        peerRef.current.signal(signal);
        connection.current = peerRef.current;
      });
      peerRef.current.on("close", () => {
        setCallAccepted(false);
        setCallEnded(true);
        setCall(null);
        client.off("callAccepted");
      });
    }
  };

  const leaveCall = () => {
    setCallEnded(true);
    connection.current.destroy();
    window.location.reload();
  };

  return {
    client,
    call,
    callAccepted,
    callEnded,
    stream,
    bigVideoRef,
    smallVideoRef,
    leaveCall,
    handShake,
    establishHandShake,
    answerCall,
    callUser,
  };
};

export default useSocket;
