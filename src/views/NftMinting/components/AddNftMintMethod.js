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
  publicAddress: Yup.string().required("Please enter public address"),
  chain: Yup.string().required("Please select a chain").oneOf(['ETH', 'MATIC', 'XLM']),
  imageUri: Yup.string().required("Please enter your image URI"),

});

const AddNftMintMethod = (props) => {

  const { disableSubmit = false, dialogOpen, onDialogClose,newNftAdded } = props;
  const [message, setMessage] = useTimeOutMessage();
  const [successMessage, setSuccessMessage] = useTimeOutMessage();
  const { addMintNft } = useNftMint();

  const onAddMintNft = async (values, { setSubmitting, resetForm }) => {
    const { publicAddress, chain, imageUri } = values;

    try {

      setSubmitting(true);
      await addMintNft({
        publicAddress,
        chain,
        metadataFileUrl: imageUri,
      });
      setSuccessMessage("NFT Mint successfully added to the platform.");
      setSubmitting(false);
      newNftAdded()
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

      <h4>Add NFT Mint</h4>
      <div className="mt-6">
        <Formik
          initialValues={{
            publicAddress: "",
            chain: "", // Make sure this matches one of the valid options in the validation rule
            imageUri: ""
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
                <div className="grid grid-cols-2 gap-4">
                  <FormItem
                  asterisk
                    label="Public Address"
                    invalid={errors.publicAddress && touched.publicAddress}
                    errorMessage={errors.publicAddress}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="publicAddress"
                      placeholder="Public Address"
                      component={Input}
                    />
                  </FormItem>

                  <FormItem
                  asterisk
                    label="Chain"
                    invalid={errors.chain && touched.chain}
                    errorMessage={errors.chain}
                  >
                    <Field
                      as="select"
                      name="chain"
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-h-[44px]"
                    >
                      <option value="" label="Select Chain" />
                      <option value="ETH" label="ETH" />
                      <option value="MATIC" label="MATIC" />
                      {/* <option value="XLM" label="XLM" /> */}
                    </Field>
                  </FormItem>


                </div>
                <FormItem
                asterisk
                  label="Meta Data"
                  invalid={errors.imageUri && touched.imageUri}
                  errorMessage={errors.imageUri}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="imageUri"
                    placeholder=""
                    component={Input}
                  />
                </FormItem>
                {/* <Drawer /> */}

                <FormItem className="mb-0 mt-2 text-right">
                  <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                  >
                    {isSubmitting ? "Minting..." : "Mint Nft"}
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

export default AddNftMintMethod;
