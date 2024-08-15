import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

const server = import.meta.env.VITE_SERVER

export const useCreateNewPost = () => {
    const [isLoading, setIsLoading] = useState(false)
    const createPost = (data) => {
        setIsLoading(true)
        axios.post(`${server}/api/v1/post/new`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            toast.success(data?.message)
        }).catch((err) => {
            setIsLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { createPost, isLoading }
}