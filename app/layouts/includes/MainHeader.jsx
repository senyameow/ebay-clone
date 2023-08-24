'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import Image from 'next/image'

import { AiOutlineSearch } from 'react-icons/ai'
import { debounce } from 'debounce'
import { toast } from 'react-toastify'
import { BiLoaderCircle } from 'react-icons/bi'

const MainHeader = () => {

  const [items, setItems] = useState([]) // сюда сторим айтемы, которые подходят по поиску
  const [isSearching, setIsSearching] = useState(false) // 

  const handleSearch = debounce(async (e) => {
    setIsSearching(true)

    try {
      const response = await fetch(`/api/products/search-by-name/${e.target.value}`)
      const results = await response.json()

      if (results) {
        setItems(results)
        setIsSearching(false)
        return
      } // если есть результат, то его стейтим, убираем стейт с поиска и выходим

      // если же нет, то ..

      setItems([])
      setIsSearching(false)



    } catch (error) {

      return toast.error(error.message)

    }
    setIsSearching(false)

  }, 700) // с помощью дебаунса мы не закидываем дбшку 1239123123 реквестам

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
              <input onChange={handleSearch} className='w-full placeholder-gray-400 text-sm pl-3 focus:outline-none' placeholder='search for anything...' type='text' />

              {isSearching && <BiLoaderCircle size={24} className='animate-spin text-blue-300' />}

              {items.length > 0 ? (
                <div className='absolute bg-white max-w-[910px] w-full z-20 left-0 top-12 border'>
                  {items.map(item => (
                    <Link key={item.id} className='p-2 border flex max-h-[160px] items-center justify-between w-full cursor-pointer hover:bg-gray-100' href={`/product/${item.id}`}>
                      <div className='flex items-center'>
                        <img src={item.url} alt={item.title} className='w-[100px] h-[100px] rounded-md object-cover' />
                        <span className='ml-2 font-semibold'>{item.title}</span>
                      </div>
                      <div className='text-[18px] mr-5'>{(item.price / 100).toFixed(2)}$</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
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