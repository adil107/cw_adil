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
import { apiGetMerchant,apiAddNewMerchant,apiUpdateMerchantStatus,apiGetMerchantDetailByID,apiGetMerchantWallets, apiGetMerchantTransacrions,apiGetMerchantDashboardStatics, apiSearchMerchant } from "services/MerchantService";
import useQuery from "./useQuery";

function useMarchant() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getMerchantDashboardStatics = async () => {
        try {
            const { data } = await apiGetMerchantDashboardStatics();
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };
    

    const getMerchantList = async (page) => {
        try {
            const { data } = await apiGetMerchant(page);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

    const searchMerchant = async (values,pageNumber) => {
        try {
            const { data } = await apiSearchMerchant(values,pageNumber);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };


    const addMerchant = async (values) => {
        try {
            const { data } = await apiAddNewMerchant(values);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

    const updateMerchantStatus = async (userID,status) => {
        try {
            const { data } = await apiUpdateMerchantStatus(userID,status);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

    const getMerchantDetailByID = async (userID) => {
        try {
            const { data } = await apiGetMerchantDetailByID(userID);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

    const getMerchatWalletList = async (userID) => {
        try {
            const { data } = await apiGetMerchantWallets(userID);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

    const getMerchatTransactionList = async (userID,pageNumber) => {
        try {
            const { data } = await apiGetMerchantTransacrions(userID,pageNumber);
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

  
    const getSearchMerchant = async (userID,pageNumber) => {
        try {
            const { data } = await apiSearchMerchant();
            return {
                status: "success",
                data: data,
            };
        } catch (errors) {
            throw errorHandler(errors)
        }
    };

   

    return {

        getMerchantList,
        addMerchant,
        updateMerchantStatus,
        getMerchantDetailByID,
        getMerchatWalletList,
        getMerchatTransactionList,
        getMerchantDashboardStatics,
        getSearchMerchant,
        searchMerchant

    };
}

export default useMarchant;
