import { LuLoader } from "react-icons/lu"


const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LuLoader className="loader text-5xl" />
    </div>
  )
}

export default Loader


export const UploadingLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/70 z-[99]">
      <LuLoader className="loader text-5xl" />
    </div>
  )
}