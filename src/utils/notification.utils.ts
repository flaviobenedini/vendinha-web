import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const sendNotification = (
  type: NotificationType,
  description: string,
  status?: number,
  origin?: string
): void => {
  notification[type]({
    message: `${getNotificationMessage(type)} ${status ? status : ""} ${
      origin ? origin : ""
    }`,
    description: description,
    style: getNotificationStyle(type),
    duration: getNotiticationDuration(type),
  });
};

const getNotificationStyle = (type: string) => {
  return {
    success: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #b7eb8f",
      backgroundColor: "#f6ffed",
      borderRadius: "10px",
    },
    warning: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #ffe58f",
      backgroundColor: "#fffbe6",
      borderRadius: "10px",
    },
    error: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #ffa39e",
      backgroundColor: "#fff1f0",
      borderRadius: "10px",
    },
    info: {
      color: "rgba(0, 0, 0, 0.65)",
      border: "1px solid #3caff7",
      backgroundColor: "#e6f7ff",
      borderRadius: "10px",
    },
  }[type];
};

const getNotificationMessage = (type: string) => {
  return {
    info: "Informação",
    success: "Sucesso",
    error: "Erro",
    warning: "Atenção",
  }[type];
};

const getNotiticationDuration = (type: string) => {
  return {
    success: 3,
    error: 6,
    warning: 5,
    info: 8,
  }[type];
};

export default sendNotification;
