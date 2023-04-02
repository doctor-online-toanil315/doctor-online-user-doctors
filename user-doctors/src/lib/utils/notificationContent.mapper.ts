import { NOTIFICATION_CONTENT_ENUM } from "../constants";
import { NotificationType } from "../types";

export const notificationContentMapper = (notification: NotificationType) => {
  const fullName = `${notification.from.firstName} ${notification.from.lastName}`;

  switch (notification.content) {
    case NOTIFICATION_CONTENT_ENUM.DOCTOR_ACCEPT_APPOINTMENT: {
      return `Dr.${fullName} has accepted your appointment request.`;
    }

    case NOTIFICATION_CONTENT_ENUM.DOCTOR_ADD_A_CONSULTION: {
      return `Dr.${fullName} add a new consultation after going through a medical consultation with you! Please check it`;
    }

    case NOTIFICATION_CONTENT_ENUM.DOCTOR_CANCEL_APPOINTMENT: {
      return `Dr.${fullName} has canceled your appointment! Please comeback later`;
    }

    case NOTIFICATION_CONTENT_ENUM.DOCTOR_DECLINE_APPOINTMENT: {
      return `Dr.${fullName} has declined your appointment! Please comeback later`;
    }

    case NOTIFICATION_CONTENT_ENUM.DOCTOR_UPDATE_APPOINTMENT: {
      return `Dr.${fullName} has updated information about appointment! Please check it.`;
    }

    case NOTIFICATION_CONTENT_ENUM.DOCTOR_UPDATE_CONSULTION: {
      return `Dr.${fullName} has updated consultation! Please check it`;
    }

    case NOTIFICATION_CONTENT_ENUM.USER_REQUEST_APPOINTMENT: {
      return `${fullName} has request an appointment with you! Please check it`;
    }

    default:
      break;
  }
};
