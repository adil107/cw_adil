import React, { useState } from "react";
import { Card, Avatar } from "components/ui";
import moment from "moment";
import { MediaSkeleton } from "components/shared";
import axios from "axios";
import JsonPreviewModal from "./JsonPreviewModal";

const CustomerInfoField = ({ title, value, handleClick }) => {
  return (
    <div className="mb-2">
      <span
        style={{ display: "block" }}
        className="text-gray-700 mb-2 dark:text-gray-200 font-semibold"
      >
        {title}
      </span>

      <p
        onClick={handleClick && handleClick}
        className="mb-2"
        style={{ cursor: handleClick ? "pointer" : "auto" }}
      >
        {value}
      </p>
    </div>
  );
};

const NftMetadataDetail = ({ data = {}, loading }) => {
  const [meteJson, seMetaJson] = useState(null);

  const handleFetchMetaJson = (url) => {
    axios
      .get(url)
      .then((res) => {
        seMetaJson(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="flex xl:flex-col items-center gap-8">
          <Avatar size={90} shape="square" src={data?.metadata?.image} />
          <h4 className="font-bold">{data?.metadata?.name}</h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-y-1 gap-x-8 mt-8">
          {loading ? (
            [1, 2, 3, 4].map((e) => <MediaSkeleton key={e + 3} />)
          ) : (
            <>
              <CustomerInfoField title="User Id" value={data?.user_id} />
              <CustomerInfoField
                title="Description"
                value={data?.metadata?.description || "N/A"}
              />
              <CustomerInfoField title="Chain" value={data?.chain} />
              <CustomerInfoField title="Quantity" value={data?.quantity} />
              <CustomerInfoField
                title="Create Time"
                value={moment(data.create_time).format("MM/DD/YYYY")}
              />

              <CustomerInfoField
                title="Metadata Url"
                value={data?.image_uri ? data?.image_uri : "N/A"}
                handleClick={() =>
                  data?.image_uri && handleFetchMetaJson(data?.image_uri)
                }
              />
            </>
          )}
        </div>

        <JsonPreviewModal
          meteJson={meteJson || {}}
          isOpen={meteJson ? true : false}
          onClose={() => seMetaJson(null)}
        />
      </div>
    </Card>
  );
};

export default NftMetadataDetail;
