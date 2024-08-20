import { FaPlay } from "react-icons/fa6"
import { useGetMyReels } from "../../Requests/GetRequest"

const Reels = ({ id }) => {
  const { reels } = useGetMyReels(id)
  return (
    <div className="w-full grid sm:grid-cols-4 grid-cols-3 gap-1">
      {reels?.map((reel) =>
        <div key={reel?._id} className="w-full sm:h-60 h-40 bg-zinc-400 relative">
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
