import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import useAuth from 'utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
})

const ForgotPasswordForm = (props) => {
    const { userVerificationOnForgotPassword } = useAuth();
    const { disableSubmit = false, className, signInUrl = '/sign-in', resetPasswordUrl = '/reset-password' } = props
    const [message, setMessage] = useTimeOutMessage();
    const navigate = useNavigate();
    const onUserVerification = async (values, setSubmitting) => {

        try {
            const { email } = values;
            setSubmitting(true);
            await userVerificationOnForgotPassword({ email });
            navigate(`${resetPasswordUrl}`)
            setSubmitting(false);
        }
        catch (e) {

            setSubmitting(false);
            setMessage(e.message);
        }

    };

    return (
        <div className={className}>

            <div className="mb-6">

                <>
                    <h3 className="mb-1">Forgot Password</h3>
                    <p>
                        Please enter your email address to receive a
                        verification code
                    </p>
                </>

            </div>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onUserVerification(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div>
                                <FormItem
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
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Email'}
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
    )
}

export default ForgotPasswordForm
