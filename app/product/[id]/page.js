'use client'

import { useCart } from '@/app/context/cart'
import MainLayout from '@/app/layouts/MainLayout'
import SimilarProducts from '@/app/layouts/includes/SimilarProducts'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'

const Product = ({ params }) => {

    const cart = useCart()

    const product = {
        id: 0,
        title: 'product 1',
        description: 'cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it!',
        price: 2500,
        url: 'https://crobux.ru/wp-content/uploads/f/6/2/f62af33ecb7597c792bae1563398b607.jpeg'
    }

    const handleClick = () => {
        console.log(cart.isItemAdded)
        if (cart.isItemAdded) {
            cart.removeFromCart(product)
            toast.info('Item has been removed', { autoClose: 3000 })
        } else {
            cart.addToCart(product)
            toast.info('Item has been added', { autoClose: 3000 })
        }
        console.log(cart.cartCount())
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
                                <button
                                    onClick={handleClick}
                                    className={`rounded-full ${cart.isItemAdded ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} flex justify-center items-center px-10 py-2 text-white hover:opacity-[.9] text-[14px]`}>
                                    {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'} {/* в зависимости от стейта будет выводиться разный текст */}
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
                <SimilarProducts />
            </MainLayout>
        </>
    )
}

export default Product