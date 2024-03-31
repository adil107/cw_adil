import React, { useEffect, useState } from "react";
import { AdaptableCard } from "components/shared";
import useNftMint from "utils/hooks/useNftMint";
import NftMetadataDetail from "./components/NftMetadataDetail";
import Detailstxn from "./components/Detailstxn";
import toast from "components/ui/toast";
import Notification from "components/ui/Notification";
import { HiOutlineUserGroup } from "react-icons/hi";
import MediaSkeleton from "components/shared/loaders/MediaSkeleton";
import { isEmpty } from "lodash";

const NftMinting = () => {
  const [nftDetail, setNftDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getNFTDetails } = useNftMint();

  useEffect(() => {
    getNftDetails();
  }, []);

  const getNftDetails = async () => {
    try {
      setIsLoading(true);
      const queryParameters = new URLSearchParams(window.location.search);
      const id = queryParameters.get("requestId");
      const getNftDetailsall = await getNFTDetails(id);
      setNftDetail(getNftDetailsall.data.data);
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

  const StatisticCard = (props) => {
    const { label, value } = props;
    // const avatarSize = 55;

    return (
      <div>
        <div className="flex items-center gap-3">
          <div>
            <div>
              <div className="flex items-center">
                <div className="text-gray-900 dark:text-gray-100 font-semibold capitalize mb-2">
                  {label}
                </div>
              </div>
              <span className="break-all">{value || "N/A"} </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4">
        <div>
          <NftMetadataDetail data={nftDetail} loading={isLoading} />
        </div>
        <div className="w-full">
          <AdaptableCard>
            <div className="rounded-lg border  p-[35px] mb-4">
              <h4 className="mb-4">Metadata</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {isLoading
                  ? [1, 2, 3, 4].map((e) => (
                      <MediaSkeleton
                        key={e}
                        avatarProps={{
                          className: "rounded",
                          width: 10,
                          height: 10,
                        }}
                      />
                    ))
                  : nftDetail?.metadata?.attributes?.map((attribute, index) => (
                      <StatisticCard
                        icon={<HiOutlineUserGroup />}
                        avatarClass="!bg-indigo-500"
                        label={attribute?.trait_type}
                        value={
                          isEmpty(attribute?.value) ? "N/A" : attribute?.value
                        }
                        loading={isLoading}
                      />
                    ))}
              </div>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((e) => (
                  <MediaSkeleton
                    key={e + 1}
                    avatarProps={{
                      className: "rounded",
                      width: 10,
                      height: 10,
                    }}
                  />
                ))}
              </div>
            ) : (
              <Detailstxn data={nftDetail} />
            )}
            <div className="mb-5"></div>
          </AdaptableCard>
        </div>
      </div>
    </>
  );
};

export default NftMinting;
