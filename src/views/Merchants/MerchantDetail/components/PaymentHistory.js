import React from "react";
import { Badge, Tooltip } from "components/ui";
import "./stylethis.css";

import { DataTable, DoubleSidedImage } from "components/shared";

import moment from "moment";
import useThemeClass from "utils/hooks/useThemeClass";
import Avatar from "components/ui/Avatar";
import { Link } from "react-router-dom";
import {
  HiOutlineSwitchHorizontal,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from "react-icons/hi";
import { URL_ETH, URL_MATIC, URL_STELLER } from "constants/app.constant";

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

const ActionColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const disabledButtonStyle = {
    opacity: "0.2",
    // Add other styles for disabled state if needed
  };
  let disable = false;
  let redirectUrl = "";

  if (row.type === "transfer") {
    disable = true;
  }

  // Construct different redirect URLs based on chain types
  switch (row.chain) {
    case "ETH":
      redirectUrl = `${URL_ETH}${row.transaction_hash}`;
      break;
    case "XLM":
      redirectUrl = `${URL_STELLER}${row.transaction_hash}`;
      break;
    case "MATIC":
      redirectUrl = `${URL_MATIC}${row.transaction_hash}`;
      break;
    default:
      break;
  }

  return (
    <div className={`${textTheme} cursor-pointer select-none font-semibold`}>
      <a target="_blank" href={redirectUrl}>
        <button
          className={`${disable ? "disabledButton" : ""}`}
          style={disable ? disabledButtonStyle : {}}
          disabled={disable}
        >
          View
        </button>
      </a>
    </div>
  );
};

const ActionColumns = ({ row }) => {
  const { textTheme } = useThemeClass();
  const disabledButtonStyle = {
    opacity: "0.2",
  };
  let redirectUrl = "";
  let disable = false;

  if (row.type === "") {
    disable = true;
  }

  switch (row.type) {
    case "transfer":
    case "deposit":
      // Internal Link for transfers
      return (
        <div
          className={`${textTheme} cursor-pointer select-none font-semibold break-all`}
        >
          <Tooltip title={row.receiver} className="tooltip-wrapper">
            {/* <Link to={`/merchant-details?userId=${row.receiver}`}> */}
            <Link to={`/merchant-details?userId=${row.user_id}`}>
              <button>{row.receiver.slice(0, 8) + "..."}</button>
            </Link>
          </Tooltip>
        </div>
      );

    case "withdraw":
      // External Link for withdraw and deposit
      switch (row.chain) {
        case "ETH":
          redirectUrl = `${URL_ETH}${row.transaction_hash}`;
          break;
        case "XLM":
          redirectUrl = `${URL_STELLER}${row.transaction_hash}`;
          break;
        case "MATIC":
          redirectUrl = `${URL_MATIC}${row.transaction_hash}`;
          break;
        default:
          redirectUrl = `https://example.com/address/${row.transaction_hash}`;
          break;
      }

      return (
        <div
          className={`${textTheme} cursor-pointer select-none font-semibold break-all`}
        >
          <a target="_blank" href={redirectUrl}>
            <button>{row.receiver.slice(0, 8) + "..."}</button>
          </a>
        </div>
      );

    default:
      return (
        <Link to={`/merchant-detail?userId=${row.receiver}`}>
          <button>{row.receiver.slice(0, 8) + "..."}</button>
        </Link>
      ); // Return null for any other unknown types
  }
};

const columns = [
  {
    header: "Action",

    cell: (props) => {
      const row = props.row.original;
      let type = row.type;

      return (
        <div className="flex items-center gap-2">
          <div>
            <ActionIcon type={type} />
          </div>
          <span className="font-semibold heading-text whitespace-nowrap capitalize">
            {row.type} {""} {""} {row.chain}
          </span>
        </div>
      );
    },
  },
  {
    header: "Receiver",
    id: "action",
    cell: (props) => <ActionColumns row={props.row.original} />,
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
    header: "Date",
    accessorKey: "create_time",
    cell: (props) => {
      const row = props.row.original;
      return <div>{moment(row.create_time).format("MM/DD/YYYY")}</div>;
    },
  },

  {
    header: "Status",
    accessorKey: "create_time",
    cell: (props) => {
      const row = props.row.original;

      return (
        <div className="flex items-center gap-2 ">
          <Badge
            className={
              row.status === "Pending"
                ? "badge-dot bg-amber-500"
                : row.status === "Completed"
                ? "badge-dot bg-emerald-500"
                : "badge-dot bg-red-500"
            }
          />
          <span
            className={
              row.status === "Pending"
                ? "capitalize font-semibold text-amber-500"
                : row.status === "Completed"
                ? "capitalize font-semibold text-emerald-500"
                : "capitalize font-semibold text-red-500"
            }
          >
            {row.status}
          </span>

          {/* <span class="badge-dot bg-emerald-500"></span>
                        <span class="capitalize font-semibold text-emerald-500">Complete</span> */}
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

const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  return (
    <div className="flex items-center">
      <Avatar size={28} shape="circle" src={"/img/avatars/thumb-1.jpg"} />
      <Link className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`} to="#">
        {row.user_id === row.sender
          ? "Withdraw"
          : row.user_id === row.receiver
          ? "Deposit"
          : "Transfer"}{" "}
        {row.chain}
      </Link>
    </div>
  );
};

const PaymentHistory = (props) => {
  const { data, onPageChange, totalPage } = props;

  return (
    <div className="mt-8">
      <h4 className="mb-4">Transactions History</h4>

      <DataTable
        columns={columns}
        data={data}
        pagingData={{ total: totalPage * 10, pageSize: 10 }}
        onPaginationChange={(value) => {
          onPageChange(value);
        }}
      />
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          />
          <h6 className="my-5 text-center">
            Presently, there are no transactions.
          </h6>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
