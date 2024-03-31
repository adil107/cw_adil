import React from "react";
import { Badge } from "components/ui";

const Detailstxn = (props) => {
  const { data } = props;

  return (
    <>
      <div className="rounded-lg border  p-[35px]">
        <h4 className="mb-4">Details</h4>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={'mb-2'}
          >
            <div className="flex items-center gap-3">
              <div>
                <div>
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-100 font-semibold mb-2">
                      Request ID
                    </div>
                  </div>
                  <span className="break-all">{data?.request_id}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={'mb-2'}
          >
            <div className="flex items-center gap-3">
              <div>
                <div>
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-100 font-semibold  mb-2">
                      Public Address
                    </div>
                  </div>
                  <span className="break-all">
                    {data?.public_address ? data?.public_address : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={'mb-2'}
          >
            <div className="flex items-center gap-3">
              <div>
                <div>
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-100 font-semibold  mb-2">
                      Transaction Hash
                    </div>
                  </div>
                  <span className="break-all">
                    {data?.transaction_hash ? data?.transaction_hash : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={'mb-2'}
          >
            <div className="flex items-center gap-3">
              <div>
                <div>
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-100 font-semibold  mb-2">
                      NFT ID
                    </div>
                  </div>
                  <span className="break-all">
                    {data?.nft_id ? data?.nft_id : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={'mb-2'}
          >
            <div className="flex items-center gap-3">
              <div>
                <div>
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-100 font-semibold  mb-2">
                      Status
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        data?.status === "ERRORED"
                          ? "badge-dot bg-red-500"
                          : data?.status === "IN_PROCESS" ||
                            data?.status === "PENDING"
                          ? "badge-dot bg-yellow-500"
                          : "badge-dot bg-emerald-500"
                      }
                    />
                    <span
                      className={
                        data?.status === "ERRORED"
                          ? "capitalize font-semibold text-red-500"
                          : data?.status === "IN_PROCESS" ||
                            data?.status === "PENDING"
                          ? "capitalize font-semibold text-yellow-500"
                          : "capitalize font-semibold text-emerald-500"
                      }
                    >
                      {data?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            // className={classNames(
            //   "rounded-lg border border-gray-200 dark:border-gray-600 p-[22px]"
            // )}
          >
            <div className="flex items-center gap-3">
              <div>
                <div>
                  <div className="flex items-center">
                    <div className="text-gray-900 dark:text-gray-100 font-semibold  mb-2">
                      Project ID
                    </div>
                  </div>
                  <span className="break-all">
                    {data?.project_id ? data?.project_id : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>


















        </div>
      </div>
    </>
  );
};

export default Detailstxn;
