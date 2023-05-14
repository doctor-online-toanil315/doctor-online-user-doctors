import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useGetMeQuery } from "../services";
import { ACCESS_TOKEN } from "../constants";
import { io } from "socket.io-client";

const useSocket = () => {
  const { data: currentUserLogin } = useGetMeQuery();
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [call, setCall] = useState<any>({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [connectEstablish, setConnectEstablish] = useState(false);
  const clientRef = useRef<any>(null);
  const bigVideoRef = useRef<HTMLVideoElement>(null);
  const smallVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<any>(null);
  const connection = useRef<any>(null);

  const isFirstRunRef = useRef<boolean>(true);
  useEffect(() => {
    if (currentUserLogin && isFirstRunRef.current) {
      const client = io("http://localhost:8001", {
        query: {
          token: sessionStorage.getItem(ACCESS_TOKEN),
        },
      });
      clientRef.current = client;
      isFirstRunRef.current = false;

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (smallVideoRef.current) {
            smallVideoRef.current.srcObject = currentStream;
          }
        })
        .catch((error) => {
          console.log("===================error get stream: ", error);
        });

      client.on("handShakeEstablished", ({ from }: { from: string }) => {
        setConnectEstablish(true);
      });

      client.on("callUser", ({ signal, from }) => {
        setCall({ isReceiveCall: true, from, signal });
      });

      client.on("callEnded", () => {
        leaveCall();
      });

      client.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peerRef.current.signal(signal);
        connection.current = peerRef.current;
      });
    }

    return () => {
      clientRef.current?.off("callAccepted");
      clientRef.current?.off("handShakeEstablished");
      clientRef.current?.off("callUser");
      clientRef.current?.off("callEnded");
    };
  }, [currentUserLogin]);

  const handShake = (to: string) => {
    if (clientRef.current) {
      console.log("handshake work: ", clientRef.current);
      clientRef.current.emit("handShake", {
        from: currentUserLogin?.data,
        to,
      });
    }
  };

  const establishHandShake = (to: string) => {
    if (clientRef.current) {
      clientRef.current.emit("handShakeEstablished", {
        to,
        from: currentUserLogin?.data.id,
      });
    }
  };

  const answerCall = () => {
    if (clientRef.current && call.signal) {
      setCallAccepted(true);
      peerRef.current = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });
      peerRef.current.on("signal", (data: any) => {
        clientRef.current.emit("answerCall", { signal: data, to: call.from });
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
    if (clientRef.current) {
      peerRef.current = new Peer({ initiator: true, trickle: false, stream });
      peerRef.current.on("signal", (data: any) => {
        clientRef.current.emit("callUser", {
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
    }
  };

  const leaveCall = () => {
    setCallEnded(true);
    connection.current.destroy();
    window.location.reload();
  };

  return {
    call,
    callAccepted,
    connectEstablish,
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
