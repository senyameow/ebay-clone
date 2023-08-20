import Product from '@/app/components/Product'
import React from 'react'
import {BiLoader} from 'react-icons/bi'

const SimilarProducts = () => {

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
    <>
    <div className='border-b py-1 max-w-[1300px] mx-auto' />

    <div className='max-w-[1300px] mx-auto'>
        <div className='text-2xl font-bold py-2 mt-4'>Similar Products</div>

        { products.length > 0 ? <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4'>
            {products.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </div> : (
            <div className='flex items-center justify-center w-full'>
                <div className='flex items-center justify-center w-full font-bold text-[2rem] gap-4'>
                    <BiLoader size={44} />
                    <span>Loading products</span>
                </div>
            </div>
        )}
        
    </div>

    </>
  )
}

export default SimilarProducts