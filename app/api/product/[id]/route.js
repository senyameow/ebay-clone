
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// переходим по http://localhost:3000/api/product/[id] динамеческий айди и описываем логику тут, что происходит, если мы переходим сюда

export async function GET(req, context) {





    try {

        const { id } = context.params // как нам взять цифру айдишника (или не цифру)
        // например, http://localhost:3000/api/product/5
        //а вот так, const {id} = context.params
        // зачем мы взяли айдишник?
        // потому что по этому айдишнику мы будем сейчас брать продукт из таблички с помощью призмы

        const product = await prisma.products.findFirst({ where: { id: Number(id) } }) // превращаем в намбер айдишник на всякий т.к. мб строчка будет (хотя хз)

        // перешли по http://localhost:3000/api/product/5
        // middleware выполнил логику, путь не начинается с обозначенных мною путей, если юзер не зареган (значит пустит и незареганного юзера) и вернул респонс (отработал)
        // выполняется логика рута.. 
        // т.к. мы ничего не записываем, то это GET
        // в id записывается 5 (как строчка => обернем в намбер)
        // дальше мы говорим: жди пока в product призма запишет объект, который она найдет в табличке products, при этом это будет первая такая строчка, где айдишник этого продукта равен цифре 5
        // т.е. в продукт продукт под айдишником 5 (что нам и надо)






        await prisma.$disconnect() // дисконектимся от призмы
        return new NextResponse.json(res)

    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return new NextResponse('Something went wrong', { status: 400 })
    }


}