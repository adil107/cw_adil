import React, { useEffect } from "react";
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


const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
  rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
  const navigate = useNavigate();
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = "/forgot-password",
    verifyOtp = "/verify-otp"
  } = props;
  const [message, setMessage] = useTimeOutMessage();
  const { signIn } = useAuth();



  const onSignIn = async (values, setSubmitting) => {

    try {
      const { email, password } = values;
      setSubmitting(true);
      const result = await signIn({ email, password });
      navigate(`${verifyOtp}?userID=${result.message.data.user_id}`)
      setSubmitting(false);
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
      <Formik

        initialValues={{
          email: "",
          password: "",
          rememberMe: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
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
              <div className="flex justify-between mb-6">
              <div className="flex justify-between mb-6"></div>
                {/* <Field
                  className="mb-0"
                  name="rememberMe"
                  component={Checkbox}
                  children="Remember Me"
                /> */}
                <ActionLink to={forgotPasswordUrl}>Forgot Password?</ActionLink>
                {/* <ActionLink to={verifyOtp}>otp</ActionLink> */}
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
              {/* <div className="mt-4 text-center">
                <span>Don't have an account yet? </span>
                <ActionLink to={signUpUrl}>Sign up</ActionLink>
              </div> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
