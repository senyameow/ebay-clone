import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data } = await supabase.auth.getSession()

    // console.log('req', req.nextUrl.pathname)
    // return NextResponse.next()

    // if (req.nextUrl.pathname.startsWith('/auth')) { // если я делаю запрос на /auth, то ...
    //     console.log('req', req.nextUrl.pathname) // будет выводить req /(pathname на который я дал запрос)
    //     return NextResponse.next() // просто надо.
    // }


    if (data.session && req.nextUrl.pathname.startsWith('/auth')) { // 
        return NextResponse.redirect(new URL('/', req.url)) // req.url - база  (http://localhost:3000) без нее выдаст ошибку инвалид юрл /
    } // тут написано, что если юзер уже вошел в систему, то, если он переходит на /auth, его редиректит на /

    // также надо захендлить кейс, когда мы не зареганы
    // т.е. мы не вошли и мы не можем зайти в ордеры, нам надо, чтобы нас редиректило на auth страничку (что было бы очень очень круто!)

    if (!data.session && (
        req.nextUrl.pathname.startsWith('/address') ||
        req.nextUrl.pathname.startsWith('/checkout') ||
        req.nextUrl.pathname.startsWith('/cart') ||
        req.nextUrl.pathname.startsWith('/success') ||
        req.nextUrl.pathname.startsWith('/orders')
    )) {
        return NextResponse.redirect(new URL('/auth', req.url)) // тут наоборот, если юзера нет, то его кинет на auth почти во всех кейсах
    }

    // if (data.session && req.nextUrl.pathname.startsWith('/cart')) {
    //     const allCookies = req.cookies
    //     console.log('all cookies', allCookies)
    //     return NextResponse.next()
    // }


    return res
}

//Next.js Middleware runs immediately before each route is rendered
//We'll use Middleware to refresh the user's session before loading Server Component routes.