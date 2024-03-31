import { useSelector, useDispatch } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import {
    apiResendOtp,
    apiSignIn,
    apiSignOut,
    apiSignUp,
    apiVerifyOtp,
    apiForgotPassword,
    apiResetPassword
} from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess, onSignInSuccessSetUser } from "store/auth/sessionSlice";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { errorHandler } from "utils/helperMethod";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

function useAuth() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const query = useQuery();

    const { token, signedIn } = useSelector((state) => state.auth.session);
    const removeTokenFromLocalStorage = () => {
        localStorage.clear("token");
    };

    const handleSignOut = () => {
        removeTokenFromLocalStorage();
        dispatch(onSignOutSuccess());
        dispatch(setUser(initialState));
        navigate(appConfig.unAuthenticatedEntryPath);
    };


    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values);
            return {
                status: "success",
                message: resp.data,
            };

        } catch (errors) {
            throw errorHandler(errors)

        }
    };

    const resendOtp = async (values) => {
        try {
            const resp = await apiResendOtp(values);
            return {
                status: "success",
                message: resp.data,
            };
        } catch (errors) {
            throw errorHandler(errors)

        }
    }

    const verifyOtp = async (values) => {

        try {
            const resp = await apiVerifyOtp(values);
            console.log("resp", resp.data.data)

            if (resp.data) {
                const { token } = resp.data.data;
                dispatch(onSignInSuccess(token));

                // TODO check again
                if (resp.data.data.user) {
                    dispatch(
                        setUser(
                            resp.data.data.user || {
                                avatar: "",
                                userName: "Anonymous",
                                authority: ["USER"],
                                email: "",
                            }
                        )
                    );
                }

            }
            return {
                status: "success",
                message: resp.data,
            };
        } catch (errors) {
            throw errorHandler(errors)

        }

    };

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values);
            if (resp.data) {
                const { token } = resp.data.data;
                dispatch(onSignInSuccess(token));
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: "",
                                userName: "Anonymous",
                                authority: ["USER"],
                                email: "",
                            }
                        )
                    );
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY);
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
                return {
                    status: "success",
                    message: "",
                };
            }
        } catch (errors) {
            return {
                status: "failed",
                message: errors?.response?.data?.message || errors.toString(),
            };
        }
    };

    const userVerificationOnForgotPassword = async (values) => {
        try {

            const resp = await apiForgotPassword(values);
            return {
                status: "success",
                message: resp.data,
            };

        } catch (errors) {
            throw errorHandler(errors)

        }
    };


    const resetPassword = async (values) => {
        try {

            const resp = await apiResetPassword(values);
            return {
                status: "success",
                message: resp.data,
            };

        } catch (errors) {
            throw errorHandler(errors)

        }
    };




    const signOut = () => {
        handleSignOut();
    };

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
        verifyOtp,
        resendOtp,
        userVerificationOnForgotPassword,
        resetPassword
    };
}

export default useAuth;
