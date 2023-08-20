'use client'

import Link from 'next/link'
import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import Image from 'next/image'

import {AiOutlineShoppingCart} from 'react-icons/ai'


const SubMenu = () => {

    const menuItems = [
        { id: 1, name: 'Home' },
        { id: 2, name: 'Saved' },
        { id: 3, name: 'Electronics' },
        { id: 4, name: 'Motors' },
        { id: 5, name: 'Fashion' },
        { id: 6, name: 'Collectables and Art' },
        { id: 7, name: 'Sports' },
        { id: 8, name: 'Health & Beauty' },
        { id: 9, name: 'Industrial Equipment' },
        { id: 10, name: 'Home & Garden' },
        { id: 11, name: 'Sell' },
    ]

  return (
    <div id='TopMenu' className='border-b'>
        <div className='flex items-center justify-between w-full mx-auto max-w-[1200px]'> {/* высота дива подстраивается под чилдренов */}
            <ul className='h-8 flex items-center justify-center gap-6 mx-auto'>
                {menuItems.map(item => (
                    <li className='text-sm hover:text-blue-500 cursor-pointer hover:underline'>
                        <Link href={`/${item.name}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default SubMenu