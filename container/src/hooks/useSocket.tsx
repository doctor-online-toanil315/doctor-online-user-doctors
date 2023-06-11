import { useCommonSelector, RootState } from "doctor-online-common";
import { useEffect } from "react";
import { AppointmentType, NotificationType, UserType } from "src/types";

const useSocket = (
  handleReceiveEvent: (data: NotificationType) => void,
  handleReceiveCallRequest: (data: { from: UserType }) => void,
  handleReminder: (data: AppointmentType) => void
) => {
  const { client } = useCommonSelector((state: RootState) => state.webSocket);

  useEffect(() => {
    if (client) {
      client.on("notifications", handleReceiveEvent);
      client.on("handShake", handleReceiveCallRequest);
      client.on("reminder", handleReminder);
    }

    return () => {
      client?.off("notifications", handleReceiveEvent);
      client?.off("handShake", handleReceiveCallRequest);
      client?.off("reminder", handleReminder);
    };
  }, [client]);
};

export default useSocket;
