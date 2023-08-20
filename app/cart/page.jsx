'use client'
import React from 'react'

import MainLayout from '../layouts/MainLayout'
import SimilarProducts from '../layouts/includes/SimilarProducts'
import SelectedProduct from '../components/SelectedProduct'

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
        <div className='w-[1300px] mx-auto min-h-[300px] mb-8'>
            <h1 className='text-[1.4rem] font-bold py-4'>Shopping Cart</h1>
            <div className='relative flex flex-row gap-2'>
                <div className='flex-[3] flex flex-col gap-1'>
                    {products.map(product => (
                        <SelectedProduct key={product.id} product={product} />
                    ))}
                </div>
                <div className='flex-[1]'>
                    <div id='GoToCheckOut' className='w-full sticky top-0 right-0 border p-4 flex-col gap-2 flex '>
                        <div>
                            <button className='flex items-center bg-blue-500 w-full py-3 justify-center text-white font-bold text-xl rounded-full hover:opacity-[.9]'>Go To checkout</button>
                        </div>
                        <div className='flex flex-row w-full justify-between'>
                            <span>{`Items (2)`}</span>
                            <span>{`$324.00`}</span>
                        </div>
                        <div className='flex flex-row w-full justify-between'>
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className='border-b-2 w-full' />

                        <div className='font-bold flex justify-between items-center text-[22px] py-3'>
                            <span>Subtotal</span>
                            <span>{`$324.00`}</span>
                        </div>
                    </div>
                </div>
            </div>
            

            <SimilarProducts />
        </div>
    </MainLayout>
  )
}

export default page