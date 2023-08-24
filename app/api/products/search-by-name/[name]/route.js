
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) { // req ОБЯЗАТЕЛЬНО НАДО КИДАТЬ, БЕЗ НЕГО НЕ ДАЕТ JSON


    try {

        const { name } = context.params

        const products = await prisma.products.findMany({
            take: 5,
            where: {
                title: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        }) // нет никаких указателей какие именно найти, мы просто хотим получить из дб все продукты, которые там есть

        // выход из призмы 
        await prisma.$disconnect()
        // возвращаем отджейсоненные продукты
        return NextResponse.json(products)

    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return new NextResponse('Something went wrong', { status: 400 })
    }
}

// т.е. перешли по руту http://localhost/api/products = получили все список из объектов (всех строк из таблицы products)