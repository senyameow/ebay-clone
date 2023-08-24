import { NextResponse } from "next/server"
import Stripe from "stripe"
// если нет юзерка, то выкинем ошибку, значит нужна авторизация, это все происходит на сервере, значит нужный способ добраться до клиента через серверкомпонент
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// createServerComponentClient требует куки, следовательно они тоже нам нужны
import { cookies } from "next/headers"



export async function POST(req) {

    const supabase = createServerComponentClient({ cookies })


    try {

        const { data: { user } } = await supabase.auth.getUser()

        if (!user.id) throw Error()

        // будем записывать что-то в страйп, значит нужно все в бади запихнуть

        const body = await req.json()

        const stripe = new Stripe(process.env.STRIPE_SK_KEY) // создаем страйп пихаем туда наш сикрет ключ

        // какой респонс будет?

        const res = await stripe.paymentIntents.create({
            amount: Number(body.amount), // из бади придет тотал и мы его записываем в amount
            currency: 'gbp', // баксы короче
            automatic_payment_methods: { enabled: true }
        })

        return NextResponse.json(res) // и возвращаем наш респонс

    } catch (error) {
        console.log(error)
        return new NextResponse('something went wrong', { status: 400 })
    }
}