import { NOTIFICATION_CONTENT_ENUM } from "../constants";
import { UserType } from "./UserTypes";

export interface NotificationType {
  id: string;
  content: NOTIFICATION_CONTENT_ENUM;
  isSeen: boolean;
  createAt: string;
  reachObjectId: string;
  to: UserType;
  from: UserType;
}
