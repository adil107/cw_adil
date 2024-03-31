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
  hash: Yup.string().required("Please enter nft hash"),
});

const RetryNftMethod = (props) => {
  const {
    disableSubmit = false,
    dialogOpen,
    onDialogClose,
    retryNftAdded,
  } = props;
  const [message, setMessage] = useTimeOutMessage();
  const [successMessage, setSuccessMessage] = useTimeOutMessage();
  const { retryNft } = useNftMint();

  const onAddMintNft = async (values, { setSubmitting, resetForm }) => {
    const { hash } = values;

    try {
      setSubmitting(true);
      await retryNft({
        hash,
      });
      setSuccessMessage("NFT Mint successfully added to the platform.");
      setSubmitting(false);
      retryNftAdded();
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

      <h4>Retry Nft</h4>
      <div className="mt-6">
        <Formik
          initialValues={{
            hash: "",
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
                    label="Nft Hash"
                    invalid={errors.hash && touched.hash}
                    errorMessage={errors.hash}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="hash"
                      placeholder="Enter Nft Hash"
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
                    {isSubmitting ? "Retrying..." : "Retry Nft"}
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

export default RetryNftMethod;
