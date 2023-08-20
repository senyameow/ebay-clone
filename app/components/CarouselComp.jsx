'use client'

import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from "next/image"

import React from 'react'

const CarouselComp = () => {
  return (
    <div className="max-w-[1300px] mx-auto pb-6">
        <Carousel showArrows={true} autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false} className="w-full">
            <div className="w-full h-[450px]">
                <Image src={'/images/banner/1.png'} alt="banner" fill />
            </div>
            <div className="w-full h-[450px]">
                <Image src={'/images/banner/2.png'} alt="banner" fill />
            </div>
            <div className="w-full h-[450px]">
                <Image src={'/images/banner/3.png'} alt="banner" fill />
            </div>
        </Carousel>
    </div>
  )
}

export default CarouselComp