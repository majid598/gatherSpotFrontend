import { FaPlay } from "react-icons/fa6"
import { useGetMyReels } from "../../Requests/GetRequest"

const Reels = ({ id }) => {
  const { reels } = useGetMyReels(id)
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {reels?.map((reel) =>
        <div className="w-full h-60 bg-zinc-400 relative">
          <video src={reel?.attachMent?.url} autoPlay loop muted className="w-full h-full object-cover"></video>
          <div className="flex absolute bottom-2 right-2 items-center gap-1 text-white mix">
            <FaPlay /> <span>{reel?.views?.length}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reels
