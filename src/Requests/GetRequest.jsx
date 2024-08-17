import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { shuffleArray } from "../Components/RenderAttachment"

const server = import.meta.env.VITE_SERVER

export const useGetMyAllPosts = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/all?id=${id}`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setPosts(data?.posts)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [posts])

    return { posts, isLoading }
}

export const useGetMyPhotos = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [photos, setPhotos] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/photos?id=${id}`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setPhotos(data?.photos)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [photos])

    return { photos, isLoading }
}
export const useGetMyVideos = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [videos, setVideos] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/videos?id=${id}`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setVideos(data?.videos)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [videos])

    return { videos, isLoading }
}
export const useGetMyReels = (id) => {
    const [isLoading, setIsLoading] = useState(false)
    const [reels, setReels] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/reels?id=${id}`, {
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
export const useGetSingleUser = (id) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    useEffect(() => {
        axios.get(`${server}/api/v1/user/get/${id}`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => setUser(data?.user)).catch((err) => {
            console.log(err)
        })
    }, [user])

    return { user, isLoading }
}

export const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/all`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setPosts(data?.posts)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [posts])

    return { posts, isLoading }
}

export const useGetFollowers = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [followers, setFollowers] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/user/followers?id=${id}`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setFollowers(data?.followers)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [followers])

    return { followers, isLoading }
}

export const useGetFollowing = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [following, setFollowing] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/user/following?id=${id}`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setFollowing(data?.following)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [following])

    return { following, isLoading }
}
