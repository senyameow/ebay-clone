import React from 'react'

const CheckoutItem = ({product}) => {
  return (
    <div className='w-full relative p-3 flex flex-row rounded-lg border mb-2 gap-2'>
        <img src={product.url} alt="logo" className='object-cover w-[150px] h-[150px] rounded-md' />
            <div className='flex flex-col justify-between gap-2 flex-1'>
                <div className='flex flex-row w-full justify-between items-center'>
                    <div className='underline font-semibold text-[1.3rem]'>{product.title}</div>
                    <div className='text-[1.3rem] font-bold'>{`$${(product.price / 100).toFixed(2)}`}</div>
                </div>
                <span className='text-xl font-bold'>NEW</span>
                <div className='text-[1.1rem] font-normal'>
                    {product.description.substring(0,150)}...
                </div>
                <div className='place-self-end '>
                    <button className={'text-blue-500 underline'}>
                        Remove
                    </button>
                </div>
            </div>
    </div>  
  )
}

export default CheckoutItem