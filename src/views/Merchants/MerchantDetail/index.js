import React, { useEffect, useState } from "react";
import {
  AdaptableCard,
  Loading,
  Container,
  DoubleSidedImage,
} from "components/shared";
import CustomerProfile from "./components/CustomerProfile";
import PaymentHistory from "./components/PaymentHistory";
import PaymentMethods from "./components/PaymentMethods";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import useMarchant from "utils/hooks/useMerchant";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { Alert } from "components/ui";

const CustomerDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [merchantDetail, setMerchantDetail] = useState({});
  const [walletList, setWalletList] = useState([]);
  const [transaction, setTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useTimeOutMessage();
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  const {
    getMerchantDetailByID,
    getMerchatWalletList,
    getMerchatTransactionList,
  } = useMarchant();

  useEffect(() => {
    getMarchantDetail();
  }, []);

  useEffect(() => {
    getTransaction();
  }, [currentPage]);

  let callBack = () => {
    alert("i am call")
  }
  const getMarchantDetail = async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("userId");

    try {
      setIsLoading(true);
      const result = await getMerchantDetailByID(id);
      const wallet = await getMerchatWalletList(id);
      setMerchantDetail(result.data.data);
      setWalletList(wallet.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setMessage(e.message);
    }
  };

  const getTransaction = async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("userId");

    try {
      const transaction = await getMerchatTransactionList(id, currentPage);
      setTransactionList(transaction?.data?.data?.transactions);
      setTotalPage(transaction.data.data.pageCount);
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <Container className="h-full">
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}

      {!isLoading && isEmpty(merchantDetail) && (
        <div className="h-full flex flex-col items-center justify-center">
          {/* <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          /> */}
          <h3 className="mt-8">No user found against the given ID!</h3>
        </div>
      )}
      <Loading loading={isLoading}>
        {!isEmpty(merchantDetail) && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="col-span-1">
              <CustomerProfile data={merchantDetail} />
            </div>
            <div className="col-span-1 xl:col-span-2">
              <AdaptableCard>
                <PaymentMethods data={walletList} />
                <PaymentHistory
                  callback={(id) => {


                  }}
                  totalPage={totalPage}
                  onPageChange={(value) => {
                    setCurrentPage(value);
                  }}
                  data={transaction}
                />
              </AdaptableCard>
            </div>
          </div>
        )}
      </Loading>
    </Container>
  );
};

export default CustomerDetail;
