import Input from "common/Input";
import { Button } from "components/ui";
import React, { useState } from "react";
import { apiAddNewMerchant } from "services/AddMerchantServices";


const NewMerchatadd = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tokenPayload, setTokenPayload] = useState({
    email: "",
    project_id: "",
  });
  console.log(tokenPayload);
  const onChangeListener = (e) => {
    e.preventDefault();
    setTokenPayload({ ...tokenPayload, [e.target.name]: e.target.value });
  };
  console.log("payload", tokenPayload);
  const createMerchant = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      const addResp = await apiAddNewMerchant(tokenPayload);
      if (addResp.ok) {
        console.log("Merchant created successfully.");
        props.onCompleteCallback();
      } else {
        console.error("Failed to create merchant.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setIsSubmitting(false)

  };

  return (
    <div>
      <Input
        onChange={onChangeListener}
        key={"name"}
        placeholder="Email"
        name={"email"}
      />
      <Input
        onChange={onChangeListener}
        key={"name"}
        placeholder="Project Id"
        name={"project_id"}
      />
      <Button
        variant="solid"
        type="submit"
        loading={isSubmitting}
        onClick={createMerchant}
      >
        {isSubmitting ? "Creating...." : "Create"}
      </Button>
    </div>
  );
};

export default NewMerchatadd;
