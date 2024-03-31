import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import {
    apiResendOtp,
    apiSignIn,
    apiSignOut,
    apiSignUp,
    apiVerifyOtp,
} from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess } from "store/auth/sessionSlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { errorHandler } from "utils/helperMethod";
import { useNavigate } from "react-router-dom";
import { apiSearchTransactions, apiGetAllUserTransactions } from "services/Transaction";

function useTransaction() {


    const getAllUsersTransactions = async (values) => {
        try {
            const { data } = await apiGetAllUserTransactions(values);
          
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors);
        }
    };

    const searchTransaction = async (values,pageNumber) => {
        try {
            const { data } = await apiSearchTransactions(values,pageNumber);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors);
        }
    };


    return {
        searchTransaction,
        getAllUsersTransactions
    };
}

export default useTransaction;
