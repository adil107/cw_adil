import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { DataTable } from "components/shared";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge, Button } from "components/ui";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import Alert from "components/ui/Alert";
import { DoubleSidedImage } from "components/shared";
import useMarchant from "utils/hooks/useMerchant";
import UpdateStatusMethod from "./components/UpdateStatusMethod";

import { Input } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";
import moment from "moment";
const statusColor = {
  active: "bg-emerald-500",
  blocked: "bg-red-500",
};

const Merchantlisting = (props) => {
  const [showStatusDialogue, setShowStatusDialogue] = useState(false);
  const [statusChangedValue, setStatusChangedValue] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [notFoundMessage, setNotFoundMessage] = useState(
    "Presently, there are no existing merchants."
  );
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [message, setMessage] = useTimeOutMessage();
  const [merchantList, setMerchantList] = useState([]);

  const { getMerchantList, searchMerchant } = useMarchant();

  useEffect(() => {
    if (props.newMerchant === true) {
      getMarchant();
    }
  }, [props.newMerchant]);

  useEffect(() => {
    if (search === true) {
      handleSearch(searchTerm);
    } else {
      getMarchant();
    }
  }, [search, currentPageSearch, currentPage]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setSearch(true);
    }
  }, [searchTerm]);

  const searchMerchantList = (term) => {
    if (term.length >= 2) {
      setSearchTerm(term);
    }
    if (term.length === 0) {
      setSearchTerm(term);
      setSearch(false);
      setCurrentPage(1);
    }
  };

  const handleSearch = async (term) => {
    try {
      const { data } = await searchMerchant(term, currentPageSearch);
      setMerchantList(data.data.searchResults);
      if (data.data.searchResults.length === 0) {
        setNotFoundMessage(
          "No matching records were found for the provided search criteria."
        );
      }

      setTotalPage(data.data.pageCount);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getMarchant = async () => {
    try {
      setIsLoading(true);
      const result = await getMerchantList(currentPage);
      setIsLoading(false);
      setMerchantList(result.data.data.users);
      setTotalPage(result.data.data.pageCount);
    } catch (e) {
      setIsLoading(false);
      setMessage(e.message);
    }
  };

  const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();
    return (
      <div className={`${textTheme} cursor-pointer select-none font-semibold`}>
        <Link to={`/merchant-details?userId=${row.id}`}>View</Link>
      </div>
    );
  };

  const columns = [
    {
      header: "Name", // Combine "First Name" and "Last Name" into a single header
      cell: (props) => {
        const row = props.row.original;
        return <NameColumn row={row} />;
      },
    },

    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Create Time",
      accessorKey: "create_time",
      cell: (props) => {
        const row = props.row.original;
        return <div>{moment(row.create_time).format("MM/DD/YYYY")}</div>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex items-center">
            <Badge
              className={
                row.is_active === false
                  ? statusColor.blocked
                  : statusColor.active
              }
            />
            <span className="ml-2 rtl:mr-2 capitalize">
              {row.is_active === true ? "Active" : "Deactive"}
            </span>

            <Switch
              defaultChecked={row.is_active === true ? true : false}
              onClick={() => {
                setSelectedUserID(row.id);
                setStatusChangedValue(!row.is_active);
                setShowStatusDialogue(true);
              }}
            />
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
        <Link
          className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
          to="#"
        >
          {row.first_name + " " + row.last_name}
        </Link>
      </div>
    );
  };

  return (
    <div className="table-responsive pt-6">
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <h3 className="text-left col-span-1">Users</h3>
        <div className=" sm:flex justify-end items-center  gap-4 col-span-2">
          <Input
            className="mb-4 sm:mb-0 sm:w-48 h-10"
            size="sm"
            placeholder="Search..."
            type="search"
            autoFill="off"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={(e) => searchMerchantList(e.target.value.toLowerCase())}
            name="search"
          />

          <Button
            variant="solid"
            className="w-full sm:w-auto"
            onClick={() => props.openAddMerhcnatModal()}
          >
            Add Merchant
          </Button>
        </div>
      </div>

      <div className="flex justify-end mb-3"></div>
      <DataTable
        columns={columns}
        data={merchantList}
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

      {!isLoading && merchantList && merchantList?.length < 1 && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No user found!"
          />
          <h6 className="mb-8">{notFoundMessage}</h6>
        </div>
      )}
      <UpdateStatusMethod
        onSuccess={() => {
          setMerchantList(
            merchantList.map((item) => {
              if (selectedUserID === item.id) {
                return { ...item, is_active: statusChangedValue };
              }
              return item;
            })
          );
          setShowStatusDialogue(false);
        }}
        userID={selectedUserID}
        status={statusChangedValue}
        onDialogClose={() => setShowStatusDialogue(false)}
        dialogOpen={showStatusDialogue}
      ></UpdateStatusMethod>
    </div>
  );
};

export default Merchantlisting;
