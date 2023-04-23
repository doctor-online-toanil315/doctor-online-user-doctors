import { useCommonSelector, RootState } from "doctor-online-common";
import { useEffect } from "react";
import { NotificationType } from "src/types";

const useSocket = (handleReceiveEvent: (data: NotificationType) => void) => {
  const { client } = useCommonSelector((state: RootState) => state.webSocket);

  useEffect(() => {
    if (client) {
      client.on("notifications", handleReceiveEvent);
    }

    return () => {
      client?.off("notifications", handleReceiveEvent);
    };
  }, [client]);
};

export default useSocket;
