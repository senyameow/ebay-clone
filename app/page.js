'use client'

import CarouselComp from './components/CarouselComp'
import Product from './components/Product'
import MainLayout from './layouts/MainLayout'
// сделаем лэйаут, чтобы все было норм и больше с этим не париться



export default function Home() {

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
      <CarouselComp />
      <div className='max-w-[1300px] mx-auto'>
        <span className='text-2xl font-bold mt-4 mb-6 px-4'>Products</span>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8'>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
