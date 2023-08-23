'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useUser } from '@/app/context/user'
import { useCart } from '@/app/context/cart'
// теперь, когда у нас есть контекст юзера, мы можем делать очень крутые вещи

const TopMenu = () => {

    const user = useUser()

    const cart = useCart()

    console.log(user?.picture)

    const [isMenu, setIsMenu] = useState(false) // сделаем, чтобы менюшку можно было открывать по клику на кнопку

    const isLoggedIn = () => {
        if (user && user?.id) {
            return (
                <button onClick={() => setIsMenu(!isMenu)} className='flex justify-center items-center gap-2'>
                    <div className='text-[14px] font-semibold'><span>Hi, {user?.name}</span></div>
                    <BsChevronDown size={24} />
                </button>
            )
        }

        return (
            <Link href={'/auth'} className='flex items-center gap-2 hover:underline cursor-pointer text-xl'>
                Login
            </Link>
        )
    }

    return (
        <div id='TopMenu' className='border-b'>
            <div className='flex items-center justify-between w-full mx-auto max-w-[1200px]'> {/* высота дива подстраивается под чилдренов */}
                <ul id='TopMenuLeft' className='flex items-center text-[11px] text-[#333] px-2 h-8'> {/* менюшка слева */}

                    <li className='relative px-3'> {/* этот ли делаем relative, потому что хотим сделать дропдаун, который абсолют */}

                        {isLoggedIn()} {/* рендер кнопочки в зависимости от того, есть ли юзер или его нет */}

                        <div id='AuthDropdown' className={`${isMenu ? 'visible' : 'hidden'} absolute bg-white w-[200px] text-[#333] z-50 border-2 top-[20px] left-0 shadow-lg`}>
                            <div className='flex flex-row items-center justify-start gap-1 p-2'>
                                {user.picture && <Image src={user?.picture} alt='logo' width={50} height={50} />}
                                <div className='font-bold text-[13px]'>{user.name}</div>
                            </div>

                            <div className='border-b' /> {/* little border inside the modal */}


                            <ul className='bg-white'>
                                <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                    <Link href={'/orders'}>
                                        My Orders
                                    </Link>
                                </li>
                                <li
                                    onClick={() => {
                                        user.signOut()
                                        setIsMenu(false)
                                    }}
                                    className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                    Sign Out
                                </li>
                            </ul>

                        </div> {/* deropdown */}
                    </li>
                    <li className='relative px-3 text-lg hover:underline cursor-pointer'>
                        Daily Details
                    </li>
                    <li className='relative px-3 text-lg hover:underline cursor-pointer'>
                        Help & Contact
                    </li>
                </ul>


                <ul id='TopMenuRight' className='flex items-center text-[11px] text-[#333] px-2 gap-6'>
                    <li className='flex items-center gap-2 hover:underline cursor-pointer'>
                        <Image src={'/images/uk.png'} alt='uk' width={32} height={16} />
                        <span className='text-lg'>Ship to</span>
                    </li>
                    <li className='px-3 hover:underline cursor-pointer'>
                        <div className='relative'>
                            <AiOutlineShoppingCart size={22} />

                            {cart.cartCount() > 0 ? <div className='absolute text-[10px] -top-[2px] -right-[5px] w-[14px] h-[14px] bg-red-600 rounded-full text-white'>
                                <span className='flex items-center justify-center -mt-[2px] text-[12px] font-semibold'>{cart.cartCount()}</span>
                            </div> : (
                                <div></div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TopMenu