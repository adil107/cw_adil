import React from "react";
import { Card, Avatar, Button } from "components/ui";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

import moment from "moment";

const CustomerInfoField = ({ title, value }) => {
  return (
    <div>
      <span className="text-gray-700 dark:text-gray-200 font-semibold">
        {title}
      </span>
      <p>{value}</p>
    </div>
  );
};

const NftMetadataDetail = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="flex xl:flex-col items-center gap-2">
          <Avatar size={90} shape="square" src={data?.metadata?.image} />
          <h4 className="font-bold">{data?.metadata?.name}</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-1 gap-x-4 mt-8">
          <CustomerInfoField title="User Id" value={data?.user_id} />
          <CustomerInfoField
            title="Description"
            value={data?.metadata?.description}
          />
          <CustomerInfoField title="Chain" value={data?.chain} />
          <CustomerInfoField title="Quantity" value={data?.quantity} />
          <CustomerInfoField
            title="Create Time"
            value={moment(data.create_time).format("MM/DD/YYYY")}
          />
        </div>
      </div>
    </Card>
  );
};

export default NftMetadataDetail;
