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
import {
  apiGetALLNftDetails,
  apiGetAllTransactions,
  apiLazyMinting,
  apiRetryNft,
  apiBatchUpdate
} from "services/Minting";
import axios from "axios";

function useNftMint() {

  const getNftListing = async (values) => {
    try {
      const { data } = await apiGetAllTransactions(values);
      return {
        status: "success",
        data: data,
      };
    } catch (errors) {
      throw errorHandler(errors);
    }
  };

  const getNFTDetails = async (requestId) => {
    try {
      const { data } = await apiGetALLNftDetails(requestId);
      return {
        status: "success",
        data: data,
      };
    } catch (errors) {
      throw errorHandler(errors);
    }
  };


  const addMintNft = async (values) => {
    try {
      const { data } = await apiLazyMinting(values);
      return {
        status: "success",
        data: data,
      };
    } catch (errors) {
      throw errorHandler(errors);
    }
  };



  const getNFTDetailsURL = async (JsonUrl) => {
    try {
      const { data } = await axios.get(JsonUrl);
      console.log("data responme", data);
      return {
        status: "success",
        data: data,
      };
    } catch (errors) {
      throw errorHandler(errors);
    }
  };

  const retryNft = async (hash) => {
    try {
      const { data } = await apiRetryNft(hash);
      return {
        status: "success",
        data: data,
      };
    } catch (errors) {
      throw errorHandler(errors);
    }
  };


  const updatBatchLimit = async (limit) => {
   
    try {
      const { data } = await apiBatchUpdate(limit);

      return {
        status: "success",
        data: data,
      };
    } catch (errors) {
      throw errorHandler(errors);
    }
  };


  return {
    addMintNft,
    getNFTDetails,
    getNftListing,
    getNFTDetailsURL,
    retryNft,
    updatBatchLimit
  };
}

export default useNftMint;
