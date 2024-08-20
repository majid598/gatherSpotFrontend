import { FaArrowLeft } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import Layout from "../Layout/Layout"
import UserItem from "../Components/User/UserItem"
import { useGetMyFriends } from "../Requests/GetRequest"

const Friends = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { friends } = useGetMyFriends()



  return (
    <Layout>
      <div className="w-full bg-white h-full">
        <div className="flex gap-4 p-10 items-start w-full relative border-b-2 z-50">
          <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
          <div>
            <h2 className="font-semibold text-sky-500">Friends</h2>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 p-10">
          {friends.map((friend, index) => <UserItem type="friend" user={friend} key={index + 1} />)}
        </div>
      </div>
    </Layout>
  )
}

export default Friends
