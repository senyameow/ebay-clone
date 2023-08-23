'use client' // клиент может изменять дату
// создадим контекст еще один контекст

import React, { useState, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'

const Context = createContext()

const CartProvider = ({ children }) => {

    const router = useRouter()

    const [isItemAdded, setIsItemAdded] = useState(false) // нужен стейт для кнопки (если добавлен айтем, то кнопка убрать и наоборот)

    const getCart = () => {
        let cart = [] // создаем пустой список, куда будем добавлять вещи
        if (typeof localStorage !== 'undefined') {

        }
        cart = JSON.parse(localStorage.getItem('cart')) || []



        return cart // вернем либо все айтемы из ключа cart, либо пустой список, если список под ключом cart пуст

    } // функция для получения всех айтемов из карта (т.к. нам эти вещи придется пропихнуть в ордер)

    const addToCart = (product) => { // прокидываем продукт в функцию
        let cart = [] // опять создаем списочек

        if (typeof localStorage !== 'undefined') {

            cart = JSON.parse(localStorage.getItem('cart')) || [] // положили
        }
        // но в карт сразу положим те вещи, которые уже выбрали (из стора)

        // теперь гоу положим наш продукт (на который нажали)

        cart.push(product)

        localStorage.setItem('cart', JSON.stringify(cart)) // так, мы хотим запихнуть что-то в значение cart (а как запихивать будем?)
        // просто cart мы написать не можем, надо JSON.stringify его

        // что мы сделали? - мы сохранили под ключом cart, текущее состоянее (уже с добавленным нашим айтемом)

        isItemAddedToCart(product)
        router.refresh() // и обновляем страничку (чтобы дата отобразилась на UI), и юзеру не пришлось ф5 нажимать, чтобы посмотреть на дату

    }

    const removeFromCart = (product) => {
        // все то же самое


        let cart = []
        if (typeof localStorage !== 'undefined') {

            cart = JSON.parse(localStorage.getItem('cart')) || []
        }


        // с помощью filter вернем в карт новый список, где не будет этого продукта (на который нажали)ъ

        cart = cart.filter(item => item.id !== product.id) // базовый прием

        localStorage.setItem('cart', JSON.stringify(cart)); // не забываем засейвить текущее значение под этим ключом

        isItemAddedToCart(product)
        router.refresh()
    }

    const isItemAddedToCart = (product) => { // с помощью этой функции будем изменять кнопку (с добавить на убрать и вайса верса)


        let cart = []

        if (typeof localStorage !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart')) || []

        }

        cart = cart.filter(item => item.id === product.id) // получим либо пустой список, либо список из одного продукта (на который нажали)

        if (cart.length > 0) return setIsItemAdded(true) // и если этот список не пустой, значит айтем добавлен (и выйдем)

        setIsItemAdded(false) // если же нет, то стейт сбрасывается, таким образом, мы получим стейт для каждого продукта
    } // немного сложная функция (*поэксперементировать*)

    // сделаем функцию для этого кружочка около коляски сверху)))

    const cartCount = () => {


        let cart = []

        if (typeof localStorage !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart')) || []

        }
        return cart.length
    } // тут все просто, берем да возвращаем длину списка

    // для подсчета total

    const cartTotal = () => {


        let cart = []

        if (typeof localStorage !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart')) || []

        }

        console.log(cart.reduce((total, item) => total + item.price, 0))
        return cart.reduce((total, item) => total + item.price, 0)
    } // хороший кейс для юза редюсера

    // также нас интересует функция для отчистки всего карта (если мы сделали заказ, то мы отчищаем карт)

    const clearCart = () => {
        localStorage.removeItem('cart') // сделаем это с помощью localStorage.removeItem
        // ** Этот метод успешно выполнится даже если указанного ключа не существует в хранилище.
        router.refresh() // и просто рефрешим (TEST) (make sure that everything is updated)
    }

    // localStorage - undefined (что делать?)
    // проверка на undefined

    const value = {
        isItemAdded,
        getCart,
        addToCart,
        removeFromCart,
        isItemAddedToCart,
        cartCount,
        cartTotal,
        clearCart,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useCart = () => useContext(Context)

export default CartProvider;

// идем опять в лэйаут и оборачиваем чилдренов

// можно было это сделать с помощью цустанда, но я чет уже свыкся с контекстом (надо отучаться на самом деле и переходить на редакс или цустанд)
