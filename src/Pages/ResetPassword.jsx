import { useInputValidation } from "6pp";
import { useParams } from "react-router-dom";
import { useResetPassword } from "../Requests/PostRequests";

const ResetPassword = () => {
    const { token } = useParams()
    const password = useInputValidation("")

    const { reset, isLoading } = useResetPassword()

    const handleSubmit = () => {
        console.log(token)
        reset(token, password.value)
    }

    return (
        <div className="w-full h-screen bg-zinc-100 relative overflow-hidden">
            <div className="w-full h-[100vw] -top-40 -right-[45%] rounded-full bg-sky-500 absolute"></div>
            <div className="w-full h-full relative flex items-center justify-center">
                <div className="bg-white w-[30rem]  rounded-2xl shadow-sm p-10">
                    <h1 className="text-2xl font-bold text-center">
                        Reset Your password
                    </h1>
                    <div className="flex flex-col gap-3 mt-10 px-12">
                        <label className="w-full">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                                placeholder="New Password"
                            />
                        </label>
                        <label className="w-full">
                            <input
                                type="text"
                                className="w-full p-2 rounded-md outline-none bg-transparent border-2 hover:border-black/30 transition-all duration-300 focus:border-sky-500"
                                value={password.value}
                                onChange={password.changeHandler}
                                placeholder="Confirm New Password"
                            />
                        </label>
                        <button onClick={handleSubmit} className="w-full p-3 bg-sky-500 mt-4 text-white rounded-lg font-bold transition-all duration-300 hover:bg-sky-600">
                            {isLoading ? "Sending..." : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[24rem] absolute -bottom-40 -left-40 h-[24rem] rounded-full bg-sky-500"></div>
        </div>
    );
};

export default ResetPassword;
