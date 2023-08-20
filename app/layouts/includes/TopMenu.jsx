'use client'

import Link from 'next/link'
import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import Image from 'next/image'

import {AiOutlineShoppingCart} from 'react-icons/ai'

const TopMenu = () => {
  return (
    <div id='TopMenu' className='border-b'>
        <div className='flex items-center justify-between w-full mx-auto max-w-[1200px]'> {/* высота дива подстраивается под чилдренов */}
            <ul id='TopMenuLeft' className='flex items-center text-[11px] text-[#333] px-2 h-8'> {/* менюшка слева */}
                
                <li className='relative px-3'> {/* этот ли делаем relative, потому что хотим сделать дропдаун, который абсолют */}
                    <Link href={'/auth'} className='flex items-center gap-2 hover:underline cursor-pointer'>
                        <div className='text-lg'>Login</div>
                        <BsChevronDown size={24} />
                    </Link>

                    <div id='AuthDropdown' className='hidden absolute bg-white w-[200px] text-[#333] z-50 border-2 top-[20px] left-0 shadow-lg'> 
                        <div className='flex flex-row items-center justify-start gap-1 p-2'>
                            <Image src={'/images/pfp.jpg'} alt='logo' width={50} height={50} />
                            <div className='font-bold text-[13px]'>UserName</div>
                        </div>

                        <div className='border-b' /> {/* little border inside the modal */}


                        <ul className='bg-white'>
                            <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
                                <Link href={'/orders'}>
                                    My Orders
                                </Link>
                            </li>
                            <li className='text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer'>
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

                        <div className='absolute text-[10px] -top-[2px] -right-[5px] w-[14px] h-[14px] bg-red-600 rounded-full text-white'>
                            <span className='flex items-center justify-center -mt-[2px] text-[12px] font-semibold'>3</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default TopMenu