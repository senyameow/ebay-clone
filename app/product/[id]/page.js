'use client'

import MainLayout from '@/app/layouts/MainLayout'
import Image from 'next/image'
import React from 'react'

const Product = ({params}) => {

    const product = {
        id: 0,
        title: 'product 1',
        description: 'cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it!',
        price: 2500,
        url: 'https://crobux.ru/wp-content/uploads/f/6/2/f62af33ecb7597c792bae1563398b607.jpeg'
      }

  return (
    <>
        <MainLayout>
            <div className='max-w-[1200px] mx-auto'>
                <div className='flex py-10 px-4'>
                    {product?.url ? <Image src={product.url} alt='product' width={280} height={280} className='w-[40%] rounded-lg' /> : <div className='w-[40%]'></div>}

                    <div className='px-4 pl-8 w-full flex flex-col text-[19px]'>
                        <div className='flex flex-col gap-3 border-b py-4'>
                            <span className='text-[22px] font-bold'>{product.title}</span>
                            <span className='text-[16px] font-normal text-gray-800'>Brand New - Full Warranty</span>
                        </div>
                        <div className='flex flex-row gap-3 border-b items-center py-4'>
                            <span className='text-[14px] font-bold'>
                                Condition:
                            </span>
                            <span className='font-bold'>New</span>
                        </div>
                        <div className='flex flew-row justify-between w-full border-b py-4'>
                            <div className='flex flex-row gap-3 items-center'>
                                <span className='text-[14px] font-bold'>Price: </span>
                                <span>{`GBP $${(product.price / 100).toFixed(2)}`}</span>
                            </div>
                            <button className='rounded-full bg-blue-500 flex justify-center items-center px-10 py-2 text-white hover:opacity-[.9] text-[14px]'>
                                Add To Cart
                            </button>
                        </div>
                        <div className='flex flex-col gap-2 py-4'>
                            <span className='text-[14px] font-bold'>
                                Description: 
                            </span>
                            <div className='w-full text-[14px]'>
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </>
  )
}

export default Product