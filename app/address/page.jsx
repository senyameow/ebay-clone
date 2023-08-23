'use client'
import React, { useEffect, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import TextInput from '../components/TextInput'

// начинается самое веселое - щас будем хукать руты

import { useUser } from '../context/user'
import { useRouter } from 'next/navigation'
import useIsLoading from '../hooks/useIsLoading'
import { NextResponse } from 'next/server'
import useUserAddress from '../hooks/useUserAddress'
import { toast } from 'react-toastify'
import useCreateAddress from '../hooks/useCreateAddress'
import ClientOnly from '../components/ClientOnly'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


const Address = () => {

    const router = useRouter() // берем раутер 
    const { user } = useUser() // и юзера 

    // теперь момент с тем, где мы будем хранить наши респонсы (инфу)

    // просто будем запихивать в стейты

    const [addressId, setAddressId] = useState(null)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false) // для лоадинга
    const [error, setError] = useState({}) // также сторим ошибку

    // создаем функции

    // первое, для ошибок 

    const showError = (type) => {

        if (Object.entries(error).length > 0 && error.type == type) {
            return error.message
        }
        return ''
    }

    // начинаем получать и заполнять стейты

    const getAddress = async () => { // все эти фунцкции будут асинхронными

        // нужна проверка юзера (ПОЭКСПЕРЕМЕНТИРОВАТЬ!!!)

        if (user.id == null || user.id == undefined) {
            return useIsLoading(false) // вот так можно управлять оверлеем для лоадинга
        }

        const response = await useUserAddress()

        if (response) {
            setCurrentAddress(response) // сохраняем адрес
            return useIsLoading(false)
        }

        useIsLoading(false)

    }


    useEffect(() => {
        useIsLoading(true)
        getAddress()
    }, [user])


    const setCurrentAddress = (res) => {
        setAddressId(res.id)
        setAddress(res.address)
        setName(res.name)
        setCity(res.city)
        setCountry(res.country)
        setZipcode(res.zipcode)

    }

    const validate = () => {

        setError({}) // сбрасываем ошибки

        let isError = false // создаем локальную isError и потом ее вернем как true или false

        if (!name) {
            setError({ type: 'name', message: 'field name is requiered' })
            isError = true
        } else if (!address) {
            setError({ type: 'address', message: 'field address is required' })
            isError = true
        } else if (!country) {
            setError({ type: 'country', message: 'field country is required' })
            isError = true
        } else if (!city) {
            setError({ type: 'city', message: 'field city is required' })
            isError = true
        } else if (!zipcode) {
            setError({ type: 'zipcode', message: 'field zipcode is required' })
            isError = true
        }
        return isError
    } // функция для валидации формы (обычная простенькая, просто если не заполнили)


    const submit = async e => { // эту функцию запихнем в onSubmit

        // первый кейс всегда ошибка

        e.preventDefault()
        let isError = validate()

        if (isError) {
            console.log('THERE IS AN ERROR!')
            toast.error(error.message)
            return
        } // затестить просто showError

        try {

            setIsUpdatingAddress(true)

            const response = await useCreateAddress({
                addressId,
                name,
                address,
                zipcode,
                city,
                country
            })

            setCurrentAddress(response)
            setIsUpdatingAddress(false)

            toast.success('Address updated!', { autoClose: 3000 })

            router.push('/checkout')

            console.log(addressId, address)

        } catch (error) {
            setIsUpdatingAddress(false)
            console.log(error)
        }


    }

    return (
        <MainLayout>
            <div className='max-w-[600px] mx-auto px-2' id='AddressPage'>
                <div className='rounded-lg p-3 bg-white mx-auto'>
                    <div className='text-center text-xl font-bold mb-2'>Address Details</div>

                    <form onSubmit={e => submit(e)}>
                        <div className='mb-4'>
                            <ClientOnly>
                                <TextInput error={showError('name')} text={name} placeholder={'name'} onUpdate={setName} />
                            </ClientOnly>

                        </div>
                        <div className='mb-4'>
                            <ClientOnly>
                                <TextInput error={showError('address')} text={address} placeholder={'address'} onUpdate={setAddress} />
                            </ClientOnly>

                        </div>
                        <div className='mb-4'>
                            <ClientOnly>
                                <TextInput error={showError('country')} text={country} placeholder={'country'} onUpdate={setCountry} />
                            </ClientOnly>

                        </div>
                        <div className='mb-4'>
                            <ClientOnly>
                                <TextInput error={showError('city')} text={city} placeholder={'city'} onUpdate={setCity} />
                            </ClientOnly>

                        </div>
                        <div className='mb-4'>
                            <ClientOnly>
                                <TextInput error={showError('zipcode')} text={zipcode} placeholder={'zipcode'} onUpdate={setZipcode} />
                            </ClientOnly>

                        </div>

                        <button type='submit' disabled={isUpdatingAddress} className={`${isUpdatingAddress && 'bg-green-300'} w-full bg-blue-500 text-white p-3 rounded-sm hover:opacity-[.9] mt-4 text-xl`}>
                            {!isUpdatingAddress ? <div>Update address</div> : (
                                <div className='flex justify-center items-center gap-2'>
                                    <AiOutlineLoading3Quarters size={32} className='animate-spin' />
                                    Address is updaiting..
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default Address;