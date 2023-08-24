'use client'

import { useEffect, useState } from 'react'
import CarouselComp from './components/CarouselComp'
import Product from './components/Product'
import MainLayout from './layouts/MainLayout'
import { useCart } from './context/cart'
import useIsLoading from './hooks/useIsLoading'
// сделаем лэйаут, чтобы все было норм и больше с этим не париться



export default function Home() {

  const cart = useCart()

  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const response = await fetch('/api/products')
    const results = await response.json()
    setProducts(results)
    useIsLoading(false)
  }

  useEffect(() => {
    useIsLoading(true)
    getAllProducts()

  }, [])

  return (
    <MainLayout>
      <CarouselComp />
      <div className='max-w-[1300px] mx-auto'>
        <span className='text-2xl font-bold mt-4 mb-6 px-4'>Products</span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
