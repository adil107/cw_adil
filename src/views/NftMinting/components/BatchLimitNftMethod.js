import { Field, Form, Formik } from "formik";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Alert,
  Dialog,
} from "components/ui";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import * as Yup from "yup";
import useNftMint from "utils/hooks/useNftMint";

const validationSchema = Yup.object().shape({
  limit: Yup.string().required("Please enter batch limit"),
});

const BatchLimitNftMethod = (props) => {
  const {
    disableSubmit = false,
    dialogOpen,
    onDialogClose,
    batchLimitUpdate,
  } = props;
  const [message, setMessage] = useTimeOutMessage();
  const [successMessage, setSuccessMessage] = useTimeOutMessage();
  const { updatBatchLimit } = useNftMint();

  const onAddMintNft = async (values, { setSubmitting, resetForm }) => {
    const { limit } = values;

    try {
      setSubmitting(true);
      await updatBatchLimit({
        limit,
      });
      setSuccessMessage("Batch limit updated.");
      setSubmitting(false);
      batchLimitUpdate();
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

      <h4>Batch Limit</h4>
      <div className="mt-6">
        <Formik
          initialValues={{
            limit: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (!disableSubmit) {
              onAddMintNft(values, { setSubmitting, resetForm });
            } else {
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className=" w-full">
                  <FormItem
                    asterisk
                    label="Batch Limit"
                    invalid={errors.limit && touched.limit}
                    errorMessage={errors.limit}
                  >
                    <Field
                      type="number"
                      autoComplete="off"
                      name="limit"
                      placeholder="Enter Batch Limit"
                      component={Input}
                    />
                  </FormItem>
                </div>

                <FormItem className="mb-0 mt-2 text-right">
                  <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
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

export default BatchLimitNftMethod;
