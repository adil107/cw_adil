
import React, { useState } from "react";
import Merchantlisting from "./Merchantlisting";
import AddMerchantMethod from "./components/AddMerchantMethod";
import CustomerStatistic from "./MerchantDetail/components/CustomerStatistic";


const Merchant = () => {
  const [modalShow, setModalShow] = useState(false);
  const [newMerchant, setNewMerchant] = useState(false);

  return (
    <div>
      <CustomerStatistic/>

      <Merchantlisting openAddMerhcnatModal={() => setModalShow(true)} newMerchant={newMerchant} />
      <AddMerchantMethod
        newMerchantAdd={(value) => {
          setNewMerchant(value);
          setTimeout(() => {
            setNewMerchant(false);
          }, 1000);
        }}
        dialogOpen={modalShow}
        onDialogClose={() => setModalShow(false)}
      />
    </div>
  );
};

export default Merchant;
