import { Avatar } from "@mui/material"
import { FaUserPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useCreateChat, useSendFriendRequest } from "../../Requests/PostRequests"
import { Button } from "../Custom/custom"
import Loader from "../Loader"

const UserItem = ({ user, type = "user" }) => {
    const { sendReq, isLoading } = useSendFriendRequest()
    const { createChat, isLoading: chatLoading } = useCreateChat()

    return (
        <div className='w-full flex justify-between items-center'>
            {chatLoading && <Loader />}
            <div className='flex gap-3 items-center'>
                <Link to={`/user/${user?._id}`} className='w-14 h-14 rounded-full flex overflow-hidden'>
                    <Avatar src={user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
                </Link>
                <div>
                    <Link to={`/user/${user?._id}`} className='font-semibold'>{user?.fullName}</Link>
                    <h4 className='text-sm font-semibold text-zinc-500'>@{user?.username}</h4>
                </div>
            </div>
            {
                type === "user" ? <button onClick={() => sendReq(user?._id)} className='p-2 bg-green-200 flex items-center justify-center rounded-full'>
                    <FaUserPlus className='text-green-600' />
                </button> : type === "friend" ?
                    <div className="flex items-center gap-2">
                        <Button onClick={() => createChat(user?._id)}>
                            Message
                        </Button>
                        <button className='p-2 px-5 bg-red-500 text-white font-bold flex items-center justify-center rounded-full'>
                            Unfriend
                        </button>
                    </div> : type === "follower" ?
                        <div className="flex items-center gap-2">
                            <button className='p-2 px-5 bg-red-500 text-white font-bold flex items-center justify-center rounded-full'>
                                Remove
                            </button>
                            <button onClick={() => sendReq(user?._id)} className='p-2 px-5 flex items-center gap-2 bg-green-500 text-white font-bold justify-center rounded-md'>
                                {isLoading ? "Sending..." : <><FaUserPlus /> Add</>}
                            </button>
                        </div>
                        : type === "following" &&
                        <button className='p-2 px-5 bg-red-500 text-white font-bold flex items-center justify-center rounded-full'>
                            un-follow
                        </button>
            }
        </div>
    )
}

export default UserItem
