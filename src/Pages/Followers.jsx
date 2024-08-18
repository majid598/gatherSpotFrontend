import { Link, useNavigate } from "react-router-dom"
import Layout from "../Layout/Layout"
import { FaArrowLeft } from "react-icons/fa"
import { useGetFollowers } from "../Requests/GetRequest"
import { useSelector } from "react-redux"
import UserItem from "../Components/User/UserItem"

const Followers = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { followers } = useGetFollowers(user?._id)

  return (
    <Layout>
      <div className="w-full bg-white h-full">
        <div className="flex gap-4 p-10 items-start w-full relative border-b-2 z-50">
          <button onClick={() => navigate("/user/lists")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
          <div>
            <h2 className="font-semibold text-sky-500">Followers</h2>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 p-10">
          {followers.map((follower) => <UserItem key={follower?._id} user={follower} type="follower" />)}
        </div>
      </div>
    </Layout>
  )
}

export default Followers
