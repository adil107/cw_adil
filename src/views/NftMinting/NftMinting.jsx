import React, { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";
import { DataTable } from "components/shared";
import useThemeClass from "utils/hooks/useThemeClass";
import { Badge, Button, Tooltip, toast, Dropdown, Avatar } from "components/ui";
import {
  HiDotsVertical,
  HiOutlineSwitchVertical,
  HiCubeTransparent,
  HiSparkles,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { DoubleSidedImage } from "components/shared";
import Alert from "components/ui/Alert";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import AddNftMintMethod from "./components/AddNftMintMethod";
import RetryNftMethod from "./components/RetryNftMethod";
import BatchLimitNftMethod from "./components/BatchLimitNftMethod";
import { Link } from "react-router-dom";
import useNftMint from "utils/hooks/useNftMint";
import Notification from "components/ui/Notification";

const NftMinting = () => {
  const [nftTransactionList, setNftTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundMessage, setNotFoundMessage] = useState(
    "There are currently no nft transactions in existence."
  );
  const [message, setMessage] = useTimeOutMessage();
  // const inputRef = useRef(null);
  // const handleInputChange = () => { };

  const { getNftListing } = useNftMint();

  const handleCopyClick = (value) => {
    try {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
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

  useEffect(() => {
    getNftTransactions();
  }, [currentPage]);

  const getNftTransactions = async () => {
    try {
      setIsLoading(true);
      const nftList = await getNftListing(currentPage);
      setNftTransactionList(nftList.data.data.nftTrans);
      setTotalPage(nftList.data.data.pageCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
    }
  };
  const columns = [
    {
      header: "Request ID",
      accessorKey: "request_id",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.request_id)
          ? "NA"
          : `${row.request_id.slice(0, 6)}....${row.request_id.slice(-4)}`;
        return (
          <Tooltip title={row.request_id} className="tooltip-wrapper">
            <span
              onClick={() => handleCopyClick(row.request_id)}
              style={{ cursor: "pointer" }}
            >
              {formattedId}
            </span>
          </Tooltip>
        );
      },
    },

    {
      header: "Public Address",
      accessorKey: "public_address",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.public_address)
          ? "NA"
          : `${row.public_address.slice(0, 6)}....${row.public_address.slice(
              -4
            )}`;
        return (
          <Tooltip title={row.public_address} className="tooltip-wrapper">
            <span
              onClick={() => handleCopyClick(row.public_address)}
              style={{ cursor: "pointer" }}
            >
              {formattedId}
            </span>
          </Tooltip>
        );
      },
    },
    {
      header: "NFT ID",
      accessorKey: "nft_id",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = row.nft_id === null ? "NA" : row.nft_id;
        return (
          <Tooltip title={row.nft_id} className="tooltip-wrapper">
            <span
              onClick={() => handleCopyClick(row.nft_id)}
              style={{ cursor: "pointer" }}
            >
              {formattedId}
            </span>
          </Tooltip>
        );
      },
    },
    {
      header: "Transaction Hash",
      accessorKey: "transaction_hash",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.transaction_hash)
          ? "NA"
          : `${row.transaction_hash.slice(
              0,
              6
            )}....${row.transaction_hash.slice(-4)}`;
        return (
          <Tooltip title={row.transaction_hash} className="tooltip-wrapper">
            <span
              onClick={() => handleCopyClick(row.transaction_hash)}
              style={{ cursor: "pointer" }}
            >
              {formattedId}
            </span>
          </Tooltip>
        );
      },
    },
    {
      header: "Chain",
      accessorKey: "chain",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex items-center">
            {row.chain === "ETH" && (
              <>
                <div
                  className="px-3 py-1 w-24 text-center rounded-md border-0 mx-2 capitalize"
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#4eaada",
                    display: "flex",
                    height: "35px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/img/others/ethereum.png"
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    alt="Ethereum"
                  />
                  {row.chain}
                </div>
              </>
            )}
            {row.chain === "MATIC" && (
              <div
                className="px-3 py-1 w-24 text-center rounded-md border-0 mx-2 capitalize"
                style={{
                  backgroundColor: "rgb(229 216 253)",
                  color: "#884bf2",
                  display: "flex",
                  height: "35px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/img/others/polygon.png"
                  style={{ width: 20, height: 20, marginRight: 8 }}
                  alt="MATIC"
                />
                {row.chain}
              </div>
            )}
            {row.chain === "XLM" && (
              <div
                className="px-3 py-1 w-24 text-center rounded-md border-0 mx-2 capitalize"
                style={{
                  backgroundColor: "rgb(238 238 238)",
                  color: "black",
                  display: "flex",
                  height: "35px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/img/others/stellar-lumens.png"
                  style={{ width: 20, height: 20, marginRight: 8 }}
                  alt="XLM"
                />
                {row.chain}
              </div>
            )}
          </div>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const row = props.row.original;

        return (
          <div className="flex items-center gap-2">
            <Badge
              className={
                row.status === "ERRORED"
                  ? "badge-dot bg-red-500"
                  : row.status === "IN_PROCESS" || row?.status === "PENDING"
                  ? "badge-dot bg-yellow-500"
                  : "badge-dot bg-emerald-500"
              }
            />
            <span
              className={
                row.status === "ERRORED"
                  ? "capitalize font-semibold text-red-500"
                  : row.status === "IN_PROCESS" || row?.status === "PENDING"
                  ? "capitalize font-semibold text-yellow-500"
                  : "capitalize font-semibold text-emerald-500"
              }
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
    {
      header: "",
      id: "action",
      cell: (props) => <ActionColumn row={props.row.original} />,
    },
  ];
  const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();
    return (
      <div className={`${textTheme} cursor-pointer select-none font-semibold`}>
        <Link to={`/nft-details?requestId=${row.request_id}`}>View</Link>
      </div>
    );
  };
  const [modalShow, setModalShow] = useState(false);
  const [retryModalShow, setRetryModalShow] = useState(false);
  const [batchModalShow, setBatchModalShow] = useState(false);

  const DropAvatar = (
    <div
      style={{ cursor: "pointer" }}
      className="pb-2 custom-avatar"
      // className={classNames(className, "flex items-center gap-2")}
    >
      <Avatar size={48} icon={<HiOutlineSortDescending />} />
      {/* <div className="hidden md:block">
        <div className="text-xs capitalize"></div>
      </div> */}
    </div>
  );

  return (
    <div className="card-border px-4 py-8 rounded-lg mt-8">
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h3 className="text-left">NFT Transaction List</h3>
        <div className="flex justify-end">
          <Dropdown
            menuStyle={{ minWidth: 240 }}
            renderTitle={DropAvatar}
            placement="bottom-end"
          >
            <Dropdown.Item
              eventKey="Sign Out"
              onClick={() => setModalShow(true)}
              className="gap-2"
            >
              <span className="text-xl opacity-50">
                <HiOutlineSwitchVertical />
              </span>
              <span>Create Mint NFT Request</span>
            </Dropdown.Item>

            <Dropdown.Item variant="divider" />
            <Dropdown.Item
              eventKey="Sign Out"
              onClick={() => setRetryModalShow(true)}
              className="gap-2"
            >
              <span className="text-xl opacity-50">
                <HiCubeTransparent />
              </span>
              <span>Retry Mint Transaction</span>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            <Dropdown.Item
              eventKey="Sign Out"
              onClick={() => setBatchModalShow(true)}
              className="gap-2"
            >
              <span className="text-xl opacity-50">
                <HiSparkles />
              </span>
              <span>Configure Batch Limit</span>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <AddNftMintMethod
        dialogOpen={modalShow}
        newNftAdded={() => {
          getNftTransactions();
        }}
        onDialogClose={() => setModalShow(false)}
      />

      <RetryNftMethod
        dialogOpen={retryModalShow}
        retryNftAdded={() => {
          getNftTransactions();
        }}
        onDialogClose={() => setRetryModalShow(false)}
      />

      <BatchLimitNftMethod
        dialogOpen={batchModalShow}
        batchLimitUpdate={() => {
          getNftTransactions();
        }}
        onDialogClose={() => setBatchModalShow(false)}
      />

      {!isLoading && isEmpty(nftTransactionList) ? (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          />
          <h6 className="mb-8">{notFoundMessage}</h6>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={nftTransactionList}
          loading={isLoading}
          pagingData={{ total: totalPage * 10, pageSize: 10 }}
          onPaginationChange={(value) => {
            setCurrentPage(value);
          }}
        />
      )}
    </div>
  );
};

export default NftMinting;
