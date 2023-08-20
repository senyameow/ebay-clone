'use client'

import Link from 'next/link'
import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import Image from 'next/image'

import {AiOutlineSearch} from 'react-icons/ai'

const MainHeader = () => {
  return (
    <div id='MainHeader' className='border-b'>
        <div className='w-full mx-auto max-w-[1200px] px-6'> {/* высота дива подстраивается под чилдренов */}
                <div className='flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto'>
                    <Link href={'/'}>
                      <Image src={'/images/logo.svg'} width={120} height={200} />
                    </Link>

                    
                    <div className='relative w-full flex items-center'>
                      
                        <div className='relative flex items-center border-2 border-gray-900 w-full p-2'>
                          <button className='flex items-center'>
                            <AiOutlineSearch size={22} className='' />
                          </button>
                          <input className='w-full placeholder-gray-400 text-sm pl-3 focus:outline-none' placeholder='search for anything...' type='text' />
                        </div>


                        <button className='flex items-center justify-center px-14 ml-2 text-md bg-blue-600 text-white h-full p-[8.5px]'>
                          Search
                        </button>

                        <div className='text-md text-gray-900 ml-2 hover:text-blue-500 cursor-pointer hover:underline'>
                          Advanced
                        </div>
                      </div>
                    
                  </div>
                
        </div>
    </div>
  )
}

export default MainHeader