import { LuLoader } from "react-icons/lu"


const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LuLoader className="loader text-5xl" />
    </div>
  )
}

export default Loader