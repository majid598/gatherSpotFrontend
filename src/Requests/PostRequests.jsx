import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const server = import.meta.env.VITE_SERVER

export const useCreateNewPost = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createPost = (data) => {
        setIsLoading(true);
        return new Promise((resolve, reject) => {
            axios.post(`${server}/api/v1/post/new`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": localStorage.getItem("token")
                }
            }).then(({ data }) => {
                setIsLoading(false);
                toast.success(data?.message);
                resolve(data); // Resolves the Promise with the response data
            }).catch((err) => {
                setIsLoading(false);
                toast.error(err?.response?.data?.message);
                console.log(err);
                reject(err); // Rejects the Promise with the error
            });
        });
    };

    return { createPost, isLoading };
};

export const useUploadCoverPhoto = () => {
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

export const useUploadProfilePhoto = () => {
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

export const useEditBio = () => {
    const [bioLoading, setBioLoading] = useState(false)
    const editBio = (bio) => {
        setBioLoading(true)
        axios.put(`${server}/api/v1/user/profile/edit`, { bio: bio.value }, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setBioLoading(false)
            bio.clear()
            toast.success(data?.message)
        }).catch((err) => {
            setBioLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { editBio, bioLoading }
}
export const useEditProfile = () => {
    const [editLoading, setEditLoading] = useState(false)
    const editProfile = (data) => {
        setEditLoading(true)
        axios.put(`${server}/api/v1/user/profile/edit`, data, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setEditLoading(false)
            toast.success(data?.message)
        }).catch((err) => {
            setEditLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { editProfile, editLoading }
}

export const useViewReel = () => {
    const viewPlus = (id) => {
        axios.put(`${server}/api/v1/post/view/${id}`, {}, {
            withCredentials: true, headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => console.log(data)).catch((err) => console.log(err))
    }
    return viewPlus
}

export const useChangePassword = () => {
    const [passLoading, setPassLoading] = useState(false)
    const change = (data) => {
        setPassLoading(true)
        axios.put(`${server}/api/v1/user/change/password`, data, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setPassLoading(false)
            toast.success(data?.message)
        }).catch((err) => {
            setPassLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { change, passLoading }
}
export const useSendEmail = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const send = (email) => {
        setIsLoading(true)
        axios.post(`${server}/api/v1/user/forgot/password`, { email: email.value }, {
            withCredentials: true,
            headers: {
                "token": localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setIsLoading(false)
            email.clear()
            navigate(`/password/reset/${data?.token}`)
            toast.success(data?.message)
        }).catch((err) => {
            setIsLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        })
    }

    return { send, isLoading }
}
export const useResetPassword = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const reset = (token, password) => {
        setIsLoading(true)
        axios
            .post(`${server}/api/v1/user/password/reset/${token}`, { password })
            .then(({ data }) => {
                setIsLoading(false)
                navigate(`/login`)
                toast.success(data?.message)
            }).catch((err) => {
                setIsLoading(false)
                toast.error(err?.response?.data?.message)
                console.log(err)
            })
    }

    return { reset, isLoading }
}

export const useLikeAPost = () => {
    const like = (id) => {
        axios
            .get(`${server}/api/v1/post/like/${id}`, {
                withCredentials: true,
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then(({ data }) => {
                toast.success(data?.message)
            }).catch((err) => {
                toast.error(err?.response?.data?.message)
                console.log(err)
            })
    }

    return like
} 

export const useFollowAUser = () => {
    const follow = (id) => {
        axios
            .get(`${server}/api/v1/user/${id}/follow`, {
                withCredentials: true,
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then(({ data }) => {
                toast.success(data?.message)
            }).catch((err) => {
                toast.error(err?.response?.data?.message)
                console.log(err)
            })
    }

    return follow
} 