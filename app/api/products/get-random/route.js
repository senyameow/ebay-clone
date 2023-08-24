
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() { // нам ничего не надо


    try {

        const countProducts = await prisma.products.count() // посчитали сколько всего продуктов (динамический подсчет, т.к. продукты могут добавлять в теории, поэтому мы не говорим ВСЕ ИХ 20 И ВСЕ)

        const skip = Math.floor(Math.random() * countProducts) // получили рандомное число от 0 до 20

        // теперь берем несколько (типо похожих продуктов) 

        const products = await prisma.products.findMany({ take: 5, skip: skip, orderBy: { id: 'asc' } }) // чтобы взять рандомные юзаем skip

        // выход из призмы 
        await prisma.$disconnect()
        // возвращаем отджейсоненные продукты
        return NextResponse.json(products)

    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 })
    }
}
