'use client'
import React, { useEffect } from 'react'

import MainLayout from '../layouts/MainLayout'
import SimilarProducts from '../layouts/includes/SimilarProducts'
import SelectedProduct from '../components/SelectedProduct'
import { useCart } from '../context/cart'
import { useRouter } from 'next/navigation'
import useIsLoading from '../hooks/useIsLoading'
import { toast } from 'react-toastify'
import ClientOnly from '../components/ClientOnly'

const page = () => {

    const cart = useCart()
    const router = useRouter()

    useEffect(() => {
        useIsLoading(true)
        cart.getCart() // на этой страничке хочу получить просто айтемы карты
        cart.cartTotal() // и тотал для штуки справа
        useIsLoading(false)
    }, [cart])

    const goToCheckout = () => {
        useIsLoading(true)
        if (!cart.cartTotal()) {
            return toast.error(`you don't have any items in the cart`)
        } // если же тотал не равен нуль, то...

        router.push('/checkout')

    }

    const products = [
        {
            id: 0,
            title: 'product 1',
            description: 'cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it!',
            price: 2500,
            url: '/images/pfp.jpg'
        },
        {
            id: 1,
            title: 'product 2',
            description: 'cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it cool product buy it!',
            price: 1900,
            url: '/images/pfp.jpg'
        },
    ]

    return (
        <MainLayout>
            <div className='max-w-[1300px] mx-auto min-h-[300px] mb-8'>
                <h1 className='text-[1.4rem] font-bold py-4'>Shopping Cart</h1>
                <div className='w-full relative flex flex-row gap-2 items-center min-h-fit'>
                    <ClientOnly>
                        <div className='flex-1 flex flex-col gap-1'>
                            {cart.getCart().map(product => (
                                <SelectedProduct key={product.id} product={product} />
                            ))}
                        </div>
                    </ClientOnly>

                    <div className='w-[35%]'>
                        <ClientOnly>
                            <div id='GoToCheckOut' className='w-full sticky top-0 right-0 border p-4 flex-col gap-2 flex '>
                                <div>
                                    <button onClick={goToCheckout} className='flex items-center bg-blue-500 w-full py-3 justify-center text-white font-bold text-xl rounded-full hover:opacity-[.9]'>Go To checkout</button>
                                </div>
                                <div className='flex flex-row w-full justify-between'>
                                    <span>{`Items ${cart.cartCount()}`}</span>
                                    <span>{(cart.cartTotal() / 100).toFixed(2)}</span>
                                </div>
                                <div className='flex flex-row w-full justify-between'>
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div className='border-b-2 w-full' />

                                <div className='font-bold flex justify-between items-center text-[22px] py-3'>
                                    <span>Subtotal</span>
                                    <span>{(cart.cartTotal() / 100).toFixed(2)}$</span>
                                </div>
                            </div>
                        </ClientOnly>
                    </div>
                </div>


                <SimilarProducts />
            </div>
        </MainLayout>
    )
}

export default page