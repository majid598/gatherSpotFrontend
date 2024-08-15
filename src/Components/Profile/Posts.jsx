import { useGetMyAllPosts } from "../../Requests/GetRequest"
import renderAttachment, { fileFormat } from '../RenderAttachment'

const Posts = () => {
  const { posts } = useGetMyAllPosts()
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {posts?.map((post) =>
        <div className="w-full h-60 bg-zinc-400">
          {renderAttachment(fileFormat(post?.attachMent?.url), post?.attachMent?.url, false, true, true)}
        </div>
      )}
    </div>
  )
}

export default Posts
