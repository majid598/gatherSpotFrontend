import { useSelector } from "react-redux"
import renderAttachment, { fileFormat } from '../RenderAttachment'

const Posts = () => {
  const { user } = useSelector(state => state.auth)
  console.log(user?.posts)
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {user?.posts?.map((post) =>
        <div className="w-full h-60 bg-zinc-400">
          {renderAttachment(fileFormat(post?.attachMent), post?.attachMent, false, true, true)}
        </div>
      )}
    </div>
  )
}

export default Posts
