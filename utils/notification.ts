import { toast } from "react-toastify";

const CommonStyle = {
  fontWeight: "bolder",
  fontSize: "17px",
  padding: "20px",
};

export enum NotificationType {
  ERROR,
  SUCCESS,
}

const ColorStyle = {
  [NotificationType.ERROR]: {
    background: "red",
    color: "white",
  },
  [NotificationType.SUCCESS]: {
    background: "green",
    color: "white",
  },
};

export function showNotification(message: string, type: NotificationType) {
  toast.loading(message, {
    style: {
      ...CommonStyle,
      ...ColorStyle[type],
    },
  });
}
