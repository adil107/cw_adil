import Modalwarapper from "common/Modalwarapper";
import React from "react";
import NewMerchatadd from "views/NewMerchant/NewMerchatadd";

const AddNewMerchant = ({
  isOpen,
  onCompleteCallback= () => {},
  close = () => {},
  ...rest
}) => {
  return (
    <div>
      <Modalwarapper isOpen={isOpen} close={close} >
        {isOpen && <NewMerchatadd onCompleteCallback={onCompleteCallback} />}
      </Modalwarapper>
    </div>
  );
};

export default AddNewMerchant;
