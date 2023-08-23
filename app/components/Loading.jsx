import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
    return (
        <div className='fixed bg-black/70 inset-0 w-full z-40 flex justify-center items-center h-[100vh] overflow-hidden'>
            <AiOutlineLoading3Quarters size={32} className='animate-spin text-blue-400' />
            <div className='text-center p-5 text-xl font-bold text-white'>Loading</div>
        </div>
    )
}

export default Loading