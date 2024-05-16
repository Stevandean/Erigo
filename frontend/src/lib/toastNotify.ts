import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorToast = (message: string | any) => {
  toast.error(message);
};

export const successToast = (message: string | any) => {
  toast.success(message);
};

export const infoToast = (message: string | any) => {
  toast.info(message);
};

export const warningToast = (message: string | any) => {
  toast.warning(message);
};
