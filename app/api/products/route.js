
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {


    try {

        const products = await prisma.products.findMany() // нет никаких указателей какие именно найти, мы просто хотим получить из дб все продукты, которые там есть

        // выход из призмы 
        await prisma.$disconnect()
        // возвращаем отджейсоненные продукты
        return new NextResponse.json(products)

    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 })
    }
}

// т.е. перешли по руту http://localhost/api/products = получили все список из объектов (всех строк из таблицы products)