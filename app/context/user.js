'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// создаем контекст юзера

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// There are 5 ways to access the Supabase client with the Next.js Auth Helpers:

// Client Components — createClientComponentClient in Client Components
// Server Components — createServerComponentClient in Server Components
// Server Actions — createServerActionClient in Server Actions
// Route Handlers — createRouteHandlerClient in Route Handlers
// Middleware — createMiddlewareClient in Middleware

// короче делаем мегаполезный контекст, который будет нам давать всё!


const Context = createContext()

const UserProvider = ({ children }) => {
    const router = useRouter()

    const [user, setUser] = useState(null) // из supabase возьмем
    const [id, setId] = useState(null) // user.id
    const [email, setEmail] = useState(null) // 
    const [name, setName] = useState(null) //
    const [picture, setPicture] = useState(null) // (для профиля)

    // стейтим всю инфу о юзере, которая нам понадобится

    const supabaseClient = createClientComponentClient() // берем клиент



    const getCurrentSession = async () => { // Sets the session data from the current session.
        const res = await supabaseClient.auth.getSession() // берем сессию

        // нужна проверка (что если нет сессии)

        if (res && res.data.session) {
            return res.data.session
        }

        clearUser()
        return null
    }

    // Gets the current user details if there is an existing session.

    const getCurrentUser = async () => {
        if (id) return // если уже есть айдишник юзера, то мы выходим из функции (зачем она если уже есть юзер!!)
        // если юзера нет, то ...
        const res = await supabaseClient.auth.getUser()

        // и та же самая проверка

        if (res.data.user && res) {

            const currentUser = res.data.user

            console.log(currentUser)

            // если мы получили ответ, то нам нужно куда-то засторить юзера (и всю инфу о нем)

            setUser(currentUser)
            setId(currentUser.id)
            setEmail(currentUser.email)
            setName(currentUser.identities[0].identity_data.name) // чтобы найти имя в юзере надо покапаться немного
            setPicture(currentUser.identities[0].identity_data.picture)

        }
    }

    useEffect(() => { // async directly in the useEffect function isn't allowed (поэтому создаем вснутри хука свою функцию, уже которая будет асинк)
        const setUserDetails = async () => {
            const CurrentSession = await getCurrentSession() // вернет либо сессиюю и будет тру и мы запустим getCurrentUser, либо вернет нулл и будет false
            if (CurrentSession) await getCurrentUser() // подождали ответ от сессии, и если она есть, то быстренько заполняем все наши стейты
        }

        setUserDetails() // просто вызываем эту функцию, и стейты заполняются (либо нет), возвращать ничего нам не надо
    }, []) // не забываем добавить депенденси эррэй (пустой, т.к. мы хотим онмаунт)

    const signOut = async () => {
        const { error } = await supabaseClient.auth.signOut()

        if (error) {
            return toast.error(error.message) // если ошибка, затостим ее, и вообще я не очень хочу его домой отправлять пусть решает проблему (ретерним)
        }

        // если выход произошел успешно, то отчищаем все стейты нашего юзера + отправляем его на главную страницу

        clearUser() // отчистка стейтов
        router.push('/')
    }

    const clearUser = () => {
        setUser(null)
        setId(null)
        setPicture(null)
        setName(null)
        setEmail(null)
    }

    // вполне хороший контекст получился, можем создавать объект value, куда запихнем все добро

    const value = {
        user,
        id,
        email,
        name,
        picture,
        signOut
    }


    // и создаем провайдер

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )


}

export const useUser = () => useContext(Context) // хук для получения даты

export default UserProvider; // wrap children in layout.js around Provider

// когда обернули чилдренов в лэйауте, всё что мы брали о юзере мы можем юзать везде в нашем приложении, вызывая useUser