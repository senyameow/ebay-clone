// вся эта новая шняга с рутами

import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export async function GET() {
    const supabase = createServerComponentClient({ cookies })



    try {
        const { data: { user } } = await supabase.auth.getUser()


        if (!user) throw Error() // it's gonna trigger catch block

        // если юзер есть, то...

        const res = await prisma.addresses.findFirst({ where: { user_id: user?.id } }) //  в табличке адресов найди 1 такую строчку, где user_id = user.id (user = чел, который сейчас зареган )

        await prisma.$disconnect() // дисконектимся от призмы
        return NextResponse.json(res) // без new!!!!! 

    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return new NextResponse('Something went wrong', { status: 400 })
    }


}