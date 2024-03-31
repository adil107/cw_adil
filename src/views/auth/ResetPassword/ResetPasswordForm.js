import React from "react";
import {
  Input,
  Button,
  Checkbox,
  FormItem,
  FormContainer,
  Alert,
} from "components/ui";
import { PasswordInput, ActionLink } from "components/shared";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useAuth from "utils/hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "components/ui/toast";
import Notification from "components/ui/Notification";

const validationSchema = Yup.object().shape({
  otpCode: Yup.string()
    .required("Please enter the OTP code")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
  password: Yup.string().required('Please enter your password'),
  confirmPassword: Yup.string().required('Please enter your password').oneOf(
    [Yup.ref('password'), null],
    'Your passwords do not match'
  ),



});

const UpdatePasswordForm = (props) => {
  const navigate = useNavigate();
  const {
    disableSubmit = false,
    className,
    signInUrl = '/sign-in'
  } = props;
  const [message, setMessage] = useTimeOutMessage();
  const { resetPassword } = useAuth();


  const onPasswordSubmit = async (values, setSubmitting) => {

    try {

      setSubmitting(true);
      await resetPassword(values);
      setSubmitting(false);
      toast.push(
        <Notification
          title={"Update Password"}
          type={"success"}
        >
          Your password update successfully
        </Notification>
      )
      navigate(`${signInUrl}`)

    }
    catch (e) {
      setSubmitting(false);
      setMessage(e.message);
    }

  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}

      <h2 className="mb-4">Update Password</h2>

      <p style={{ fontSize: '16px', marginBottom: 16 }}>
        If your provided email exists in our database, you will receive an OTP code in few minutes.<br></br>Please enter that code in the below box to update the password.<br></br><b>NOTE: If it doesn’t appear within a few minutes, check your spam folder.</b>
      </p>

      <Formik

        initialValues={{
          otpCode: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onPasswordSubmit(values, setSubmitting);
          } else {
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Enter security code"
                invalid={errors.otpCode && touched.otpCode}
                errorMessage={errors.otpCode}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="otpCode"
                  placeholder="OTP Code"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItem>
              <FormItem
                label="Confirm Password"
                invalid={
                  errors.confirmPassword &&
                  touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
              >
                <Field
                  autoComplete="off"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  component={PasswordInput}
                />
              </FormItem>

              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
              <div className="mt-4 text-center">
                <span>Back to </span>
                <ActionLink to={signInUrl}>Sign in</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePasswordForm;
