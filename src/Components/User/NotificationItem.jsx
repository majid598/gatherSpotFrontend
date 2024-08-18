import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import { useAcceptFriendRequest } from "../../Requests/PostRequests"

const NotificationItem = ({ user, request, type = "" }) => {
    const { acceptReq } = useAcceptFriendRequest()
    return (
        <div className="px-10 w-full py-4 flex items-center justify-between">
            <div className='flex gap-3 items-center'>
                <Link to={`/user/${user?._id}`} className='w-14 h-14 rounded-full flex overflow-hidden'>
                    <Avatar src={user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
                </Link>
                <div>
                    <Link to={`/user/${user?._id}`} className='font-semibold'>{user?.fullName}</Link>
                    <h4 className='text-sm font-semibold text-zinc-500'>{user?.username}</h4>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={() => acceptReq(request?._id, true)} className="px-5 py-2 rounded-md bg-sky-500 text-white font-bold">Accept</button>
                <button onClick={() => acceptReq(request?._id, false)} className="px-5 py-2 rounded-md bg-red-500 text-white font-bold">Reject</button>
            </div>
        </div>
    )
}

export default NotificationItem
