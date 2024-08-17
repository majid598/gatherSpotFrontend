import { Link, useNavigate } from "react-router-dom"
import Layout from "../Layout/Layout"
import { FaArrowLeft } from "react-icons/fa"

const List = () => {
    const navigate = useNavigate()
    const lists = [
        {
            name: "Following",
            address: "/lists/list/following"
        },
        {
            name: "Followers",
            address: "/lists/list/followers"
        },
        {
            name: "Friends",
            address: "/lists/list/friends"
        },
        {
            name: "Close Friends",
            address: "/lists/list/close-friends"
        },
        {
            name: "Blocked",
            address: "/lists/list/blocked"
        },
    ]
    return (
        <Layout>
            <div className="w-full bg-white h-full">
                <div className="flex gap-4 p-10 items-start w-full relative border-b-2 z-50">
                    <button onClick={() => navigate("/")}><FaArrowLeft className="text-xl text-zinc-600" /></button>
                    <div>
                        <h2 className="font-semibold text-sky-500">Lists</h2>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    {lists.map((list) => <Link key={list.name} to={list.address} className="w-full p-10 py-5 border-b-2 hover:bg-zinc-200 text-zinc-500 font-semibold border-zinc-200">{list.name}</Link>)}
                </div>
            </div>
        </Layout>
    )
}

export default List
