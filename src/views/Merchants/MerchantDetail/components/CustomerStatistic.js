import { useEffect, useState } from 'react'
import Card from 'components/ui/Card'
import Avatar from 'components/ui/Avatar'
import MediaSkeleton from 'components/shared/loaders/MediaSkeleton'
import Loading from 'components/shared/Loading'
import useMarchant from 'utils/hooks/useMerchant'
import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'

import NumberFormat from 'react-number-format';
import { isEmpty } from 'lodash'


// ...

const NumericFormat = NumberFormat;

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, growthRate, loading } = props
    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                {/* <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value}
                                /> */}
                                {Number(value || 0)?.toLocaleString()}
                            </h3>
                        </div>
                    </div>

                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [statisticData, setStatisticData] = useState({});
    const { getMerchantDashboardStatics } = useMarchant();

    useEffect(() => {
        getMarchantStat()
    }, [])

    const getMarchantStat = async () => {

        try {
            setIsLoading(true);
            const result = await getMerchantDashboardStatics();
            setIsLoading(false);
            setStatisticData(result.data.data)
        }
        catch (e) {
            setIsLoading(false);
        }

    };





    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">

            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-500"
                label="Total Customers"
                value={isEmpty(statisticData?.userCount) ? "N/A" : statisticData?.userCount}
                loading={isLoading}
            />
            <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Total Transactions"
                value={isEmpty(statisticData?.transactionCount) ? "N/A" : statisticData?.transactionCount}
                loading={isLoading}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Total NFTs"
                value={isEmpty(statisticData?.nftCount) ? "N/A" : statisticData?.nftCount}
                loading={isLoading}
            />
        </div>
    )
}

export default CustomerStatistic
