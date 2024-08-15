import React from 'react'
import { FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { useGetUsers } from '../Requests/GetRequest'
import { Avatar } from '@mui/material'

const RightSidebar = () => {
    const { users } = useGetUsers()
    return (
        <div className='h-full w-[22rem] border-l-2 border-zinc-500 bg-white py-10 px-6 xl:block hidden'>
            <div className='w-full'>
                <div className='w-full flex justify-between items-center pb-2'>
                    <h2 className='font-semibold text-zinc-700'>Sponsored</h2>
                    <h2 className='font-semibold text-zinc-500 text-sm'>Create ad</h2>
                </div>
                <div className='w-full h-[16rem] cursor-pointer rounded-xl bg-red-600 overflow-hidden'>
                    <img src="https://cdn.prod.website-files.com/66015f733bbb59672132aee2/66016301256cc8095aeca1fb_64703481041bb767ea996fe6_Startbucks%2520logo%2520on%2520product%2520gif%2520example.gif" alt="" className='w-full h-full object-cover' />
                </div>
                <div className='w-full flex justify-between items-center mt-4'>
                    <h2 className='font-semibold text-zinc-700'>White Soda</h2>
                    <h2 className='font-semibold text-zinc-500 text-sm'>soda.com</h2>
                </div>
                <p className='text-sm text-zinc-500 tracking-tight mt-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab eius quasi aliquam libero tenetur. Doloribus exercitationem hic laudantium. Quas.</p>
            </div>

            <div className='w-full mt-10'>
                <h2 className='font-semibold text-zinc-700'>Friend Suggestion</h2>
                <div className='w-full flex flex-col gap-5 mt-5'>
                    {
                        users.map((user) =>
                            <div key={user?._id} className='w-full flex justify-between items-center'>
                                <div className='flex gap-3 items-center'>
                                    <div className='w-14 h-14 rounded-full flex overflow-hidden'>
                                        <Avatar src={user?.profile?.url} style={{ width: "100%", height: "100%" }} alt="" />
                                    </div>
                                    <div>
                                        <h2 className='font-semibold'>{user?.fullName}</h2>
                                        <h4 className='text-sm font-semibold text-zinc-500'>{user?.username}</h4>
                                    </div>
                                </div>
                                <button className='p-2 bg-green-200 flex items-center justify-center rounded-full'>
                                    <FaUserPlus className='text-green-600' />
                                </button>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default RightSidebar
