import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

const Stories = ({ stories, user }) => {
    return (
        <div className="w-full border-b border-black/20 relative p-2 my-5 whitespace-nowrap  overflow-y-hidden overscroll-x-scroll bg-[#FAFAFA]">
            <Link
                to={`/user/story/${user?.story?._id}`}
                className="w-24 h-28 rounded-md relative inline-block mx-3"
            >
                {user?.story ? (
                    <div className="w-full h-full rounded-md overflow-hidden">
                        <img
                            src={user?.story?.attachMent}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center bg-sky-500 text-white font-bold text-center h-full rounded-md overflow-hidden">
                        <FaPlus />
                        Add <br /> Story
                    </div>
                )}
            </Link>
            {/* {stories?.map((story, index) => ( */}
                <>
                    {/* {story._id === user?.story?._id ? (
                        ""
                    ) : ( */}
                        {/* <Link
                            to={`/user/story/${user?.story?._id}`}
                            className="w-24 h-28 rounded-md relative inline-block mx-3"
                        >
                            <div className="w-full h-full rounded-md overflow-hidden">
                                <img
                                    src={user?.profile?.url}
                                    alt=""
                                    className="w-full h-full"
                                />
                            </div>
                        </Link> */}
                    {/* )} */}
                </>
            {/* ))} */}
        </div>
    )
}

export default Stories
