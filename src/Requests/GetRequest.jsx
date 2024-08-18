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
export const useGetMyDrafts = (id) => {
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/post/my/drafts?id=${id}`, {
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
export const useGetMyPrivate = (id) => {
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

export const useGetMyRequests = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [requests, setRequests] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/user/request/my`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            console.log(data)
            setRequests(data?.requests)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [requests])

    return { requests, isLoading }
}

export const useGetMyFriends = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [friends, setFriends] = useState([null])
    useEffect(() => {
        axios.get(`${server}/api/v1/user/friends/my`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setFriends(data?.friends)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [friends])

    return { friends, isLoading }
}

export const useReset = () => {
    const reset = () => {
        axios.get(`${server}/api/v1/user/my/reset`, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return reset
}