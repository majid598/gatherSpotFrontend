import { useGetMyVideos } from "../../Requests/GetRequest"
import renderAttachment, { fileFormat } from '../RenderAttachment'

const Videos = () => {
  const { videos } = useGetMyVideos()
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {videos?.map((video) =>
        <div className="w-full h-60 bg-zinc-400">
          {renderAttachment(fileFormat(video?.attachMent?.url), video?.attachMent?.url, false, true, true)}
        </div>
      )}
    </div>
  )
}

export default Videos
