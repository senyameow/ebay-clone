'use client'
import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import { MdOutlineLocalShipping } from 'react-icons/md'
import Link from 'next/link'
import { useUser } from '../context/user'
import { toast } from 'react-toastify'
import useIsLoading from '../hooks/useIsLoading'
import moment from 'moment/moment'

const Orders = () => {

    const { user } = useUser()
    const [orders, setOrders] = useState([])

    // мы хотим зафетчить на этой страничке все наши ордеры, через fetch api 

    const getOrders = async () => {


        try {
            if (!user && !user.id) return // если юзера нет, то остается пустой список, ему нужно сначала войти, чтобы увидеть заказы
            const result = await (await fetch('/api/orders')).json()
            setOrders(result)
            useIsLoading(false)

        } catch (error) {
            toast.error('something went wrong', { autoClose: 1000 })
            return useIsLoading(false)
        }
    }

    useEffect(() => {
        useIsLoading(true)
        getOrders()
    }, [user])

    return (
        <MainLayout>
            <div className='max-w-[1200px] mx-auto px-2 min-h-[50vh] py-4'>
                <div className='flex flex-col gap-3 text-xl bg-white w-full p-6 min-h-[150px]'>
                    <div className='flex flex-row items-start gap-3'>
                        <MdOutlineLocalShipping size={34} className='text-green-500' />
                        <h1 className='text-xl my-2'>Orders</h1>
                    </div>
                    {orders.length < 1 ? (
                        <div className='text-2xl font-semibold flex items-center justify-center'>
                            You don't have any orders
                        </div>
                    ) : null}

                    {orders.map(order => (
                        <div key={order.id} className='flex flex-col gap-1 border-b p-3 w-full'>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold'>Stripe ID:</span>
                                <span>{order.id}</span>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold'>Delivery Address:</span>
                                <span>{order.name}, {order.address}, {order.zipcode}, {order.city}, {order.country}</span>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold'>Total:</span>
                                <span>{`$${(order.total / 100).toFixed(2)}`}</span>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold'>Order Created:</span>
                                <span>{moment(order.created_at).calendar()}</span>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <span className='font-bold'>Delivery Time:</span>
                                <span>{moment(order.created_at).add(20, 'days').calendar()}</span> {/* типо через 20 дней приедет, юзаем moment - удобно */}
                            </div>

                            <div className='flex flex-row gap-3'>
                                {order.orderItem.map(item => (
                                    <div className='flex flex-col items-start'>
                                        <img src={item.product.url} alt={item.product.title} className='w-[130px] h-[130px] rounded object-cover' />
                                        <Link href={`/product/${item.product_id}`} className='text-blue-500 underline cursor-pointer text-sm font-semibold'>
                                            {item.product.title}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Orders