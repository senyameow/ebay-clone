'use client'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import {BsCheckCircle} from 'react-icons/bs'
import Link from 'next/link'

const page = () => {
  return (
    <MainLayout>
        <div id='SuccessPage' className='max-w-[1200px] mx-auto px-2 min-h-[50vh] flex items-center justify-center'>
            <div className='flex flex-col gap-3 items-center w-fit'>
                <div className='relative flex flex-row justify-center items-center w-full'>
                    <BsCheckCircle size={28} className='absolute top-1/2 left-0 -translate-y-1/2 text-green-400' />
                    <span className='text-xl font-semibold'>Payment Successful</span>
                </div>
                <span className='text-sm'>Thank you we've received your payment</span>
                <Link href={'/'} className='py-2 cursor-pointer hover:opacity-[.9] w-full flex justify-center items-center bg-blue-500 text-white'>Back to shop</Link>
            </div>
        </div>
    </MainLayout>
  )
}

export default page