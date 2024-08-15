import { useGetMyReels } from "../../Requests/GetRequest"

const Reels = () => {
  const { reels } = useGetMyReels()
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {reels?.map((reel) =>
        <div className="w-full h-60 bg-zinc-400">
          <video src={reel?.attachMent?.url} autoPlay loop muted className="w-full h-full object-cover"></video>
        </div>
      )}
    </div>
  )
}

export default Reels
