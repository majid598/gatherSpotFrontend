import { useDispatch } from "react-redux"
import { useGetMyAllPosts, useGetMyDrafts } from "../../Requests/GetRequest"
import renderAttachment, { fileFormat } from '../RenderAttachment'
import { setIsOpenPost } from "../../redux/reducers/misc"

const Draft = ({ id, currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch()
  const { posts, isLoading } = useGetMyDrafts(id)

  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {isLoading ? <>
        <div className="newLoader1 w-full h-60 bg-zinc-400"></div>
        <div className="newLoader2 w-full h-60 bg-zinc-400"></div>
        <div className="newLoader3 w-full h-60 bg-zinc-400"></div>
      </> : posts?.map((post, index) =>
        <button key={post?._id} onClick={() => {
          dispatch(setIsOpenPost(true))
          setCurrentIndex(index);
        }} className="w-full h-60 bg-zinc-400">
          {renderAttachment(fileFormat(post?.attachMent?.url), post?.attachMent?.url, false, true, true)}
        </button>
      )}
    </div>
  )
}

export default Draft
