import React from "react";
import { Notification, Tag, toast } from "components/ui";
import isLastChild from "utils/isLastChild";
import classNames from "classnames";


const PaymentMethods = (props) => {
  const { data } = props;
  const handleCopyClick = (value) => {
    try {
      const el = document.createElement('textarea');
      el.value = value
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      toast.push(
        <Notification title={"Copied"} type={"info"}>
          Successfully copied!
        </Notification>
      );
    } catch (e) {
      toast.push(
        <Notification title={"Copied"} type={"danger"}>
          Failed to copy. Please try again.
        </Notification>
      );
    }
  };


  return (
    <>
      {data && data.length > 0 && (
        <div>
          <h4 className="mb-4">User Wallets</h4>
          <div className="rounded-lg border border-gray-200 dark:border-gray-600">
            {data.map((card, index) => (
              <div
                key={card.last4Number}
                className={classNames(
                  "flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4",
                  !isLastChild(data, index) &&
                  "border-b border-gray-200 dark:border-gray-600"
                )}
              >
                <div className="flex items-center gap-3">
                  {card.chain === "ETH" && (
                    <img
                      src="/img/others/ethereum.png"
                      style={{ width: 40, height: 40 }}
                      alt="master"
                    />
                  )}
                  {card.chain === "MATIC" && (
                    <img
                      src="/img/others/polygon.png"
                      style={{ width: 40, height: 40 }}
                      alt="visa"
                    />
                  )}

                  {card.chain === "XLM" && (
                    <img
                      src="/img/others/stellar-lumens.png"
                      style={{ width: 40, height: 40 }}
                      alt="visa"
                    />
                  )}

                  <div>
                    <div className="flex items-center">
                      <div
                        className="text-gray-900 dark:text-gray-100 font-semibold break-all"
                        onClick={() => handleCopyClick(card.public_key)}
                        style={{ cursor: "pointer" }}
                      >
                        {/* {card.cardHolderName} ••••{' '}
                                                {card.last4Number} */}
                        {card.public_key}
                      </div>

                      <Tag className="bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-100 rounded-md border-0 mx-2  break-all">
                        <span className="capitalize"> {card.chain} </span>
                      </Tag>
                    </div>
                    <span>
                      {/* Create time: {moment(card.creat_time).format('MM/DD/YYYY')} */}
                      Balance: {parseFloat(card.offchain_balance).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <EditPaymentMethod />
            <DeletePaymentMethod /> */}
    </>
  );
};

export default PaymentMethods;
