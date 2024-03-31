import { InfoMessage } from "./InfoMessage";

export const errorHandler = (e) => {
    try {
        let msg = e?.response?.data ? e?.response?.data?.errors[0]?.message : InfoMessage.ERROR.NETWORK_ERROR;
        return {
            status: "failed",
            message: msg || e.toString(),
        };
    }
    catch (e) {
        return {
            status: "failed",
            message: InfoMessage.ERROR.UNEXPECTED_ERROR || e.toString(),
        };
    }
}