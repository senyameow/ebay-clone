// вся эта новая шняга с рутами
// Здесь будем создавать адрес
//

import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export async function POST(req) { // записываем дату => POST и кидаем request 
    const supabase = createServerComponentClient({ cookies })

    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw Error() // it's gonna trigger catch block

        // если юзер есть, то...

        // const res = await prisma.addresses.findFirst({ where: { user_id: user.id } })

        // на этот раз мы создаем строчку, а не ищем ее

        const body = await req.json() // в бади записываем req.json()

        const res = await prisma.addresses.create({
            data: {
                user_id: user.id,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
            }
        })

        await prisma.$disconnect() // дисконектимся от призмы
        return new NextResponse.json(res)

    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return new NextResponse('Something went wrong', { status: 400 })
    }
}