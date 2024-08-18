import { FaArrowLeft } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import Layout from "../Layout/Layout"
import Requests from "../Components/User/Requests"

const Notifications = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  const [searchParams] = useSearchParams()

  const type = searchParams.get("type")
  console.log(type)

  const buttons = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Requests",
      type: "requests",
    },
    {
      name: "Messages",
      type: "messages",
    },
    {
      name: "Followers",
      type: "followers",
    },
    {
      name: "Likes",
      type: "likes",
    },
  ]
  return (
    <Layout>
      <div className="w-full bg-white h-full">
        <div className="flex gap-4 p-10 items-start w-full relative border-b-2 z-50">
          <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
          <div>
            <h2 className="font-semibold text-sky-500">Notifications</h2>
          </div>
        </div>
        <div className="flex gap-4 p-10 flex-wrap">
          {buttons.map((btn) => <button onClick={() => navigate(`/notifications?type=${btn.type}`)} className={`px-5 py-2 rounded-full font-bold transition-all duration-300 ${btn.type === type ? "bg-sky-500 text-white" : "bg-zinc-200 text-zinc-500 hover:bg-sky-500 hover:text-white"}`}>{btn.name}</button>
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
          {type === "requests" && <Requests />}
        </div>
      </div>
    </Layout>
  )
}

export default Notifications
