import { Field, Form, Formik, FieldProps } from "formik";
import {
  Input,
  Button,
  Checkbox,
  FormItem,
  FormContainer,
  Alert,
  Dialog,
} from "components/ui";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import useMarchant from "utils/hooks/useMerchant";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string().required("Please enter your email").email('Please enter valid email'),
  // projectID: Yup.string().required("Please enter your project ID"),
});

const AddMerchantMethod = (props) => {
  const navigate = useNavigate();
  const {
    disableSubmit = false,
    dialogOpen,
    onDialogClose,
    newMerchantAdd,
  } = props;
  const [message, setMessage] = useTimeOutMessage();
  const [successMessage, setSuccessMessage] = useTimeOutMessage();

  const { addMerchant } = useMarchant();

  const onAddMerchant = async (values, { setSubmitting, resetForm }) => {
    const { email, firstName, lastName } = values;
    try {
      setSubmitting(true);
      await addMerchant({ email, firstName, lastName });
      setSuccessMessage("Merchant successfully added to the platform.");
      setSubmitting(false);
      newMerchantAdd(true);
      resetForm();
    } catch (e) {
      setSubmitting(false);
      setMessage(e.message);
    }
  };

  return (
    <Dialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      {successMessage && (
        <Alert className="mb-4" type="success" showIcon>
          {successMessage}
        </Alert>
      )}

      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}

      <h4>Add new merchant</h4>
      <div className="mt-6">
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            // projectID: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (!disableSubmit) {
              onAddMerchant(values, { setSubmitting, resetForm });
            } else {
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-2 gap-4">
                  <FormItem
                    asterisk
                    label="First name"
                    invalid={errors.firstName && touched.firstName}
                    errorMessage={errors.firstName}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="firstName"
                      placeholder="First name"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                    asterisk
                    label="First name"
                    invalid={errors.lastName && touched.lastName}
                    errorMessage={errors.lastName}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="lastName"
                      placeholder="Last name"
                      component={Input}
                    />
                  </FormItem>
                </div>

                <FormItem
                  asterisk
                  label="Email"
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                  />
                </FormItem>

                <FormItem className="mb-0 mt-2 text-right">
                  <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                  >
                    {isSubmitting ? "Adding..." : "Add merchant"}
                  </Button>
                </FormItem>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default AddMerchantMethod;
