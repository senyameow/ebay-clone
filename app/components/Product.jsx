'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Product = ({product}) => {
  return (
    <>
        <Link href={`/product/${product.id}`} className='max-w-[200px] max-h-[400px] p-2 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-50 rounded mx-auto'>
            <div className='flex flex-col gap-4'>
                <div className='flex-[1]'>
                    <Image src={'/images/pfp.jpg'} alt='product image' width={200} height={50} />
                </div>
                <div className='flex-1 flex flex-col gap-2 text-gray-900'>
                    <h2 className='text-[15px] font-bold'>{product.title}</h2>
                    <span className='text-[20px] font-extrabold'>{`$${(product.price / 100).toFixed(2)}`}</span>
                    <div className='flex flex-row gap-2 text-[13px] text-gray-400'>
                        <span className='line-through'>{`$${product.price + product.price*0.2}`}</span>
                        <span>-</span>
                        <span className='line-through'>20%</span>
                    </div>
                </div>
            </div>
        </Link>
    </>
  )
}

export default Product