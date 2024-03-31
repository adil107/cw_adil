import {useState } from 'react'
import Card from 'components/ui/Card'
import Avatar from 'components/ui/Avatar'
import MediaSkeleton from 'components/shared/loaders/MediaSkeleton'
import Loading from 'components/shared/Loading'



import {
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineUsers,
} from 'react-icons/hi'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import NumberFormat from 'react-number-format';
import { isEmpty, mapValues } from 'lodash'


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
                                {value}
                            </h3>
                        </div>
                    </div>

                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = (props) => {
    const { icon, avatarClass, label, value, growthRate, loading ,data} = props
    const [isLoading, setIsLoading] = useState(false);
    const [stateData, setStateData] = useState({});

    const [message, setMessage] = useTimeOutMessage();
   
  





    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-500"
                label="Merchant Id"
                value={isEmpty(data?.value) ? "N/A" : data?.value}
                loading={isLoading}
            />
            <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Total Amount"
                value={isEmpty(data?.amount) ? "N/A" : data?.amount}
                loading={isLoading}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Transaction Id"
                value={isEmpty(data?.value) ? "N/A" : data?.value}
                loading={isLoading}
            />
        </div>
    )
}

export default CustomerStatistic
