import { useDispatch } from "react-redux"
import { useGetMyAllPosts } from "../../Requests/GetRequest"
import renderAttachment, { fileFormat } from '../RenderAttachment'
import { setIsOpenPost } from "../../redux/reducers/misc"

const Posts = ({ id, currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch()
  const { posts, isLoading } = useGetMyAllPosts(id)

  return (
    <div className="w-full grid sm:grid-cols-4 grid-cols-3 gap-1">
      {isLoading ? <>
        <div className="newLoader1 w-full sm:h-60 h-36 bg-zinc-400"></div>
        <div className="newLoader2 w-full sm:h-60 h-36 bg-zinc-400"></div>
        <div className="newLoader3 w-full sm:h-60 h-36 bg-zinc-400"></div>
      </> : posts?.map((post, index) =>
        <button key={post?._id} onClick={() => {
          dispatch(setIsOpenPost(true))
          setCurrentIndex(index);
        }} className="w-full sm:h-60 h-36 bg-zinc-400">
          {renderAttachment(fileFormat(post?.attachMent?.url), post?.attachMent?.url, false, true, true)}
        </button>
      )}
    </div>
  )
}

export default Posts
