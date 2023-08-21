'use client'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Link from 'next/link'
import CheckoutItem from '../components/CheckoutItem'

const page = () => {

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
        <div id='CheckOut' className='py-4 max-w-[1200px] mx-auto'>
            <div className='text-2xl font-bold py-4'>Checkout</div>

            <div className='relative flex gap-4 flex-row'>
                <div className='flex-[2] bg-white rounded-lg p-4 border flex flex-col gap-3'>
                    <div className='flex flex-col gap-0'>
                        <div className='text-xl font-semibold'>Shipping Address</div>
                        <Link href={'/'} className='text-blue-500 underline py-3 text-md font-semibold'>Update Address</Link>
                        <span>Name : test</span>
                        <span>Address : test</span>
                        <span>Zip : test</span>
                        <span>City : test</span>
                        <span>Country : test</span>
                    </div>
                    
                    <div className='bg-white rounded-lg w-full' id='Items'>
                        {products.map(product => (
                            <CheckoutItem key={product.id} product={product} />
                        ))}
                    </div>
                </div>
                <div className='flex-1'>
                <div id="PlaceOrder" className="sticky right-0 top-5 w-full border rounded-lg">
                            <div className="p-4">
                                <div className="flex items-baseline justify-between text-sm mb-1">
                                    <div>Items (3)</div>
                                    <div></div>
                                </div>
                                <div className="flex items-center justify-between mb-4 text-sm">
                                    <div>Shipping:</div>
                                    <div>Free</div>
                                </div>

                                <div className="border-t" />

                                <div className="flex items-center justify-between my-4">
                                    <div className="font-semibold">Order total</div>
                                    <div className="text-2xl font-semibold">
                                        
                                    </div>
                                </div>

                                <form onSubmit={() => {}}>
                                    <div 
                                        className="border border-gray-500 p-2 rounded-sm" 
                                        id="card-element" 
                                    />

                                    <p 
                                        id="card-error" 
                                        role="alert" 
                                        className="text-red-700 text-center font-semibold relative top-2" 
                                    />

                                    <button 
                                        type="submit"
                                        className="mt-4 bg-blue-600 text-lg w-full text-white font-semibold p-3 rounded-full"
                                    >
                                        <div>Confirm and pay</div>
                                    </button>
                                </form>
                            </div>

                        <div className="flex items-center p-4 justify-center gap-2 border-t">
                            <img width={50} src="/images/logo.svg" />
                            <div className=" font-light mb-2 mt-2">MONEY BACK GUARANTEE</div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default page