import React from "react";
import { Card, Avatar } from "components/ui";

import moment from "moment";
import { HiOutlineUser } from "react-icons/hi";

const CustomerInfoField = ({ title, value }) => {
  return (
    <div className="">
      <span
        style={{ display: "block" }}
        className="text-gray-700 mb-2 dark:text-gray-200 font-semibold"
      >
        {title}
      </span>

      <p className="mb-2">{value}</p>
    </div>
  );
};

const CustomerProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between">
        <div className="flex xl:flex-col items-center gap-4">
          <Avatar size={82} shape="circle" icon={<HiOutlineUser />} />
          <h4 className="font-bold">
            {data.first_name + " " + data.last_name}
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
          <CustomerInfoField title="Email" value={data.email} />
          <CustomerInfoField title="First Name" value={data.first_name} />
          <CustomerInfoField title="Last Name" value={data.last_name} />
          <CustomerInfoField
            title="Create Time"
            value={moment(data.create_time).format("MM/DD/YYYY")}
          />
        </div>
      </div>
    </Card>
  );
};

export default CustomerProfile;
