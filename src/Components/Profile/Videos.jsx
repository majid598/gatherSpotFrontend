import { useGetMyVideos } from "../../Requests/GetRequest"
import renderAttachment, { fileFormat } from '../RenderAttachment'

const Videos = ({ id }) => {
  const { videos } = useGetMyVideos(id)
  return (
    <div className="w-full grid sm:grid-cols-4 grid-cols-3 gap-1">
      {videos?.map((video) =>
        <div key={video?._id} className="w-full sm:h-60 h-36 bg-zinc-400">
          {renderAttachment(fileFormat(video?.attachMent?.url), video?.attachMent?.url, false, true, true)}
        </div>
      )}
    </div>
  )
}

export default Videos
