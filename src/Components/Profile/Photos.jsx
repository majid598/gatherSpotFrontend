import { useGetMyPhotos } from "../../Requests/GetRequest"
import renderAttachment, { fileFormat } from '../RenderAttachment'

const Photos = ({id}) => {
  const { photos } = useGetMyPhotos(id)
  return (
    <div className="w-full grid grid-cols-4 gap-1">
      {photos?.map((photo) =>
        <div key={photo?._id} className="w-full h-60 bg-zinc-400">
          {renderAttachment(fileFormat(photo?.attachMent?.url), photo?.attachMent?.url, false, true, true)}
        </div>
      )}
    </div>
  )
}

export default Photos
