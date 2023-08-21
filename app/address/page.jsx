'use client'
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import TextInput from '../components/TextInput'

const page = () => {
  return (
    <MainLayout>
        <div className='max-w-[600px] mx-auto px-2' id='AddressPage'>
            <div className='rounded-lg p-3 bg-white mx-auto'>
                <div className='text-center text-xl font-bold mb-2'>Address Details</div>

                <form>
                    <div className='mb-4'>
                        <TextInput error={'coudnt fetch data'} text={'test'} placeholder={'type smthng'} />
                    </div>

                    <button className='w-full bg-blue-500 text-white p-3 rounded-sm hover:opacity-[.9] mt-4 text-xl'>
                        Update Address
                    </button>
                </form>
            </div>
        </div>
    </MainLayout>
  )
}

export default page