import { useFormik } from "formik";
import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import useQuery from "utils/hooks/useQuery";
import Spinner from "components/ui/Spinner";
import * as Yup from "yup";
import { Button, FormItem, FormContainer, Alert } from "components/ui";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { useNavigate } from "react-router-dom";
import appConfig from "configs/app.config";
import useAuth from "utils/hooks/useAuth";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
// import jwt_decode from 'jwt-decode'
// import store from "../../../store";
import './style.css'

const VerifyOtp = (props) => {
  const navigate = useNavigate();
  const { className } = props;
  const [message, setMessage] = useTimeOutMessage();
  const [loading, setLoading] = useState(false); // Add loading state
  const [loadingResend, setLoadingResend] = useState(false);
  const [otpSendMessage, setOtpSendMessage] = useTimeOutMessage();
  // Authentication hooks for OTP verification and resend
  const { verifyOtp, resendOtp } = useAuth();
  const query = useQuery();

  // Formik hook for handling form state and validation
  const formik = useFormik({
    initialValues: {
      otpCode: "",
    },
    validationSchema: Yup.object().shape({
      otpCode: Yup.string()
        .required("Please enter the OTP code")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
    }),

    //
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const queryParameters = new URLSearchParams(window.location.search);
        const id = queryParameters.get("userID");
        await verifyOtp({ ...values, userID: id });
        setLoading(false);
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
      } catch (e) {
        setLoading(false);
        setMessage(e.message);
      }
    },
  });

  // Function to handle OTP resend
  const handleResendOTP = async () => {
    try {
      setLoadingResend(true);
      const queryParameters = new URLSearchParams(window.location.search);
      const id = queryParameters.get("userID");
      await resendOtp({ userID: id });
      setLoadingResend(false);
      setOtpSendMessage("OTP code send again to your email");
    } catch (e) {
      setLoadingResend(false);
      setMessage(e.message);
    }
  };

  return (
    <div className={className}>
      {otpSendMessage && (
        <Alert className="mb-4" type="success" showIcon>
          {otpSendMessage}
        </Alert>
      )}
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <FormContainer>
        <FormItem
          label="Enter security code"
          invalid={formik.errors.otpCode && formik.touched.otpCode}
          errorMessage={formik.errors.otpCode}
          className="mb-8"
        >
          <MuiOtpInput
            // sx={{ width: "450px" }}
            className="flex gap-2"
            style={{maxWidth:'450px'}}
            {...formik.getFieldProps("otpCode")}
            onChange={(value) => formik.setFieldValue("otpCode", value)}
            length={6}
          />
        </FormItem>

        <Button
          block
          loading={loading}
          variant="solid"
          onClick={() => formik.handleSubmit()}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
        <div className="flex justify-between items-center mt-4 gap-3">
          <p className="">Didn't receive the code? </p>
          <Button
            variant="twoTone"
            size="xs"
            onClick={loadingResend ? null : () => handleResendOTP()}
            loading={loadingResend}
          >
            Resend
          </Button>
        </div>
      </FormContainer>
    </div>
  );
};

export default VerifyOtp;
