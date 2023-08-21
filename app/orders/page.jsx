import React from 'react'
import MainLayout from '../layouts/MainLayout'
import {MdOutlineLocalShipping} from 'react-icons/md'
import Link from 'next/link'

const Orders = () => {

    const orders = [
        {
            id: 0,
            stripe_id: '123123213',
            name: 'test',
            address: 'test',
            zipcode: 'test',
            city: 'test',
            country: 'test',
            total: 1299,
            orderItems: [
                {
                    id: 0,
                    title: 'product 1',
                    url: '/images/pfp.jpg'
                  },
                  {
                    id: 1,
                    title: 'product 2',
                    url: '/images/pfp.jpg'
                  },
            ]
        }
    ]

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
                            <div className='flex flex-row gap-3'>
                                {order.orderItems.map(item => (
                                    <div className='flex flex-col items-start'>
                                        <img src={item.url} alt={item.title} className='w-[130px] h-[130px] rounded object-cover' />
                                        <Link href={'/'} className='text-blue-500 underline cursor-pointer text-sm font-semibold'>
                                            {item.title}
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