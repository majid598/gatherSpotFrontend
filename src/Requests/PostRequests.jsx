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

export const userUploadCoverPhoto = () => {
    const [isLoading, setIsLoading] = useState(false)
    const upload = (file) => {
        const formData = new FormData()
        formData.append("file", file.file)
        setIsLoading(true)
        axios.put(`${server}/api/v1/user/profile/edit/cover-photo`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            file.clear()
            toast.success(data?.message)
        }).catch((err) => {
            setIsLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { upload, isLoading }
}

export const userUploadProfilePhoto = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadProfile = (file) => {
        const formData = new FormData()
        formData.append("file", file.file)
        setIsLoading(true)
        axios.put(`${server}/api/v1/user/profile/edit/profile-photo`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            file.clear()
            toast.success(data?.message)
        }).catch((err) => {
            setIsLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { uploadProfile, isLoading }
}

