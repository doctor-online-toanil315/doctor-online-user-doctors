import { useCommonSelector, RootState } from "doctor-online-common";
import { useEffect } from "react";
import { NotificationType, UserType } from "src/types";

const useSocket = (
  handleReceiveEvent: (data: NotificationType) => void,
  handleReceiveCallRequest: (data: { from: UserType }) => void
) => {
  const { client } = useCommonSelector((state: RootState) => state.webSocket);

  useEffect(() => {
    if (client) {
      client.on("notifications", handleReceiveEvent);
      client.on("handShake", handleReceiveCallRequest);
    }

    return () => {
      client?.off("notifications", handleReceiveEvent);
    };
  }, [client]);
};

export default useSocket;
