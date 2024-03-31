import React, { useEffect, useState } from "react";
import { DataTable } from "components/shared";
import { Badge, Tooltip, toast } from "components/ui";
import { isEmpty } from "lodash";
import { HiOutlineSearch } from "react-icons/hi";
import { Input } from "components/ui";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { DoubleSidedImage } from "components/shared";
import Avatar from "components/ui/Avatar";
import Alert from "components/ui/Alert";
import Notification from "components/ui/Notification";
import {
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from "react-icons/hi";
import useTransaction from "utils/hooks/useTransaction";

const UserTransaction = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundMessage, setNotFoundMessage] = useState(
    "There are currently no transactions in existence."
  );
  const [message, setMessage] = useTimeOutMessage();
  const { getAllUsersTransactions, searchTransaction } = useTransaction();

  useEffect(() => {
    if (search === true) {
      handleSearch(searchTerm);
    } else {
      getAllUserTransactions();
    }
  }, [currentPage, search, currentPageSearch]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setSearch(true);
    }
  }, [searchTerm]);

  const searchTransactionList = (term) => {
    if (term.length >= 3) {
      setSearchTerm(term);
    }
    if (term.length === 0) {
      setSearchTerm(term);
      setSearch(false);
      setCurrentPage(1);
    }
  };

  const getAllUserTransactions = async () => {
    try {
      const { data } = await getAllUsersTransactions(currentPage);
      setTransactionList(data.data.transactions);
      setTotalPage(data.data.pageCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessage(error.message);
    }
  };

  const handleSearch = async (term) => {
    try {
      const { data } = await searchTransaction(term, currentPageSearch);
      setTransactionList(data.data.searchResults);
      if (data.data.searchResults.length === 0) {
        setNotFoundMessage(
          "No matching records were found for the provided search criteria."
        );
      }

      setTotalPage(data.data.pageCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.push(
        <Notification title={"Error"} type={"danger"}>
          {error.message}
        </Notification>
      );
    }
  };

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
  const ActionIcon = ({ type }) => {
    let icon = null;
  
    switch (type) {
      case "deposit":
        icon = (
          <Avatar
            size="sm"
            className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
            icon={<HiOutlineArrowDown style={{ transform: "rotate(45deg)" }} />}
          />
        );
        break;
      case "withdraw":
        icon = (
          <Avatar
            size="sm"
            className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
            icon={<HiOutlineArrowUp style={{ transform: "rotate(45deg)" }} />}
          />
        );
        break;
      case "transfer":
        icon = (
          <Avatar
            size="sm"
            className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
            icon={
              <HiOutlineSwitchHorizontal style={{ transform: "rotate(45deg)" }} />
            }
          />
        );
        break;
      default:
        icon = <Avatar />;
        break;
    }
  
    return icon;
  };
  const columns = [
    {
      header: "Project Id",
      accessorKey: "project_id",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.project_id)
          ? "NA"
          : `${row.project_id.slice(0, 6)}....${row.project_id.slice(-4)}`;
        return (
          <Tooltip title={row.project_id} className="tooltip-wrapper">
            <span
              onClick={() => handleCopyClick(row.project_id)}
              style={{ cursor: "pointer" }}
            >
              {formattedId}
            </span>
          </Tooltip>
        );
      },
    },

    {
      header: "Sender",
      accessorKey: "sender",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.sender)
          ? "NA"
          : `${row.sender.slice(0, 6)}....${row.sender.slice(-4)}`

        return (
          <>
            <Tooltip title={row.sender}>
              <Avatar
                size="sm"
                className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100"
                icon={<HiOutlineArrowUp style={{ transform: "rotate(45deg)" }} />}
                onClick={() => handleCopyClick(row)}
              // onMouseEnter={handleTooltipToggle}
              // onMouseLeave={handleTooltipToggle}
              />

              <span
                className="ml-2"
                onClick={() => handleCopyClick(row.sender)}
                style={{ cursor: "pointer" }}
              >
                {formattedId}
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      header: "Id",
      accessorKey: "id",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.id)
          ? "NA"
          : `${row.id.slice(0, 6)}....${row.id.slice(-4)}`;
        return (
          <Tooltip title={row.id} className="tooltip-wrapper">
            <span
              onClick={() => handleCopyClick(row.id)}
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
          <Tooltip title={row.transaction_hash}>

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
      header: "Receiver",
      accessorKey: "receiver",
      cell: (props) => {
        const row = props.row.original;
        const formattedId = isEmpty(row.receiver)
          ? "NA"
          : `${row.receiver.slice(0, 6)}....${row.receiver.slice(-4)}`

        return (
          <>
            <Tooltip title={row.receiver} className="tooltip-wrapper">

              <Avatar
                size="sm"
                className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                icon={
                  <HiOutlineArrowDown style={{ transform: "rotate(45deg)" }} />
                }
                onClick={() => handleCopyClick(row)}

              />

              <span
                className="ml-2"
                onClick={() => handleCopyClick(row.receiver)}
                style={{ cursor: "pointer" }}
              >
                {formattedId}
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      header: "Tx Type",
    
      cell: (props) => {
        const row = props.row.original;
        const onchain = row.onchain;
    
        return (
          <div className="flex items-center gap-2">
            <span className="">
              {onchain ? 'ON CHAIN' : 'OFF CHAIN'}
            </span>
          </div>
        );
      },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (props) => {
        const row = props.row.original;
        return <span>{parseFloat(row.amount).toFixed(2)}</span>;
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
                row.status === "Canceled"
                  ? "badge-dot bg-red-500"
                  : row.status === "Completed"
                    ? "badge-dot bg-emerald-500"
                    : row.status === "Pending"
                      ? "badge-dot bg-yellow-500"
                      : "badge-dot bg-emerald-500" // Default color, change as needed
              }
            />
            <span
              className={
                row.status === "Canceled"
                  ? "capitalize font-semibold text-red-500"
                  : row.status === "Completed"
                    ? "capitalize font-semibold text-emerald-500"
                    : row.status === "Pending"
                      ? "capitalize font-semibold text-yellow-500"
                      : "capitalize font-semibold text-emerald-500" // Default color, change as needed
              }
            >
              {row.status}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="card-border px-4 py-8 rounded-lg mt-8">
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h3 className="text-left">All Transactions</h3>
        <div className="flex justify-end">
        <Input
          className="lg:w-72 h-10"
          size="sm"
          type="search"
          placeholder="Search..."
          prefix={<HiOutlineSearch className="text-lg" />}
          onChange={(e) => searchTransactionList(e.target.value.toLowerCase())}
          name="search"
        />
        </div>
      </div>

      {!isLoading && isEmpty(transactionList) ? (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          />
          <h6 className="mb-8 ">{notFoundMessage}</h6>
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={transactionList}
            loading={isLoading}
            pagingData={{ total: totalPage * 10, pageSize: 10 }}
            onPaginationChange={(value) => {
              if (search === true) {
                setCurrentPageSearch(value);
              } else {
                setCurrentPage(value);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default UserTransaction;
