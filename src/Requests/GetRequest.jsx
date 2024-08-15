import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const server = import.meta.env.VITE_SERVER

export const useGetMyAllPosts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/all`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => setPosts(data?.posts)).catch((err) => {
            console.log(err)
        })
    }, [posts])

    return { posts, isLoading }
}

export const useGetMyPhotos = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [photos, setPhotos] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/photos`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => setPhotos(data?.photos)).catch((err) => {
            console.log(err)
        })
    }, [photos])

    return { photos, isLoading }
}
export const useGetMyVideos = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [videos, setVideos] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/videos`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => setVideos(data?.videos)).catch((err) => {
            console.log(err)
        })
    }, [videos])

    return { videos, isLoading }
}
export const useGetMyReels = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [reels, setReels] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/reels`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => setReels(data?.reels)).catch((err) => {
            console.log(err)
        })
    }, [reels])

    return { reels, isLoading }
}

export const useGetUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/user/all`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => setUsers(data?.users)).catch((err) => {
            console.log(err)
        })
    }, [users])

    return { users, isLoading }
}