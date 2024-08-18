import { useGetMyRequests } from "../../Requests/GetRequest"
import NotificationItem from "./NotificationItem"

const Requests = () => {
    const { requests, isLoading } = useGetMyRequests()
    return (
        <div className="w-full">
            {requests?.map((item) => <NotificationItem user={item?.sender} request={item} key={item?._id} type="request" />)}
        </div>
    )
}

export default Requests
