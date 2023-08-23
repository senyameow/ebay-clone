
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {


    try {

        const { name } = context.params

        const products = await prisma.products.findMany({ take: 5, where: { title: { contains: name, mode: 'insensitive' } } })

        // выход из призмы 
        await prisma.$disconnect()
        // возвращаем отджейсоненные продукты
        return new NextResponse.json(products)

    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 })
    }
}
