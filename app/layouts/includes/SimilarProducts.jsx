import Product from '@/app/components/Product'
import useIsLoading from '@/app/hooks/useIsLoading'
import React, { useEffect, useState } from 'react'
import { BiLoader } from 'react-icons/bi'
import { toast } from 'react-toastify'

const SimilarProducts = () => {

  const [products, setProducts] = useState([])

  const getSimilarProducts = async () => {
    try {

      const response = await fetch('/api/products/get-random')
      const results = await response.json()

      if (results) {

        return setProducts(results)
      }

      setProducts([])

    } catch (error) {

      toast.error(error.message)
    }
  }

  useEffect(() => {

    getSimilarProducts()

  }, [])

  return (
    <>
      <div className='border-b py-1 max-w-[1300px] mx-auto' />

      <div className='max-w-[1300px] mx-auto'>
        <div className='text-2xl font-bold py-2 mt-4'>Similar Products</div>

        {products.length > 0 ? <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4'>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div> : (
          <div className='flex items-center justify-center w-full'>
            <div className='flex items-center justify-center w-full font-bold text-[2rem] gap-4'>
              <BiLoader size={44} className='animate-spin' />
              <span>Loading products</span>
            </div>
          </div>
        )}

      </div>

    </>
  )
}

export default SimilarProducts