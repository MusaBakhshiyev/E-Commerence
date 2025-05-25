import style from "./About.module.css"
import React from 'react'
import image1 from "../../images/NewStoreImage.png"
import image2 from "../../images/StoreInside.png"

import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function About() {
    const images = [image1,image2,image1, image2];

    return (
        <section className={style.about_container}>
            <h1>Şirkət haqqında</h1>
            <p>GadGetAll şirkəti 25/05/2025 tarixində yaradılmış bir texnologiya mağazasıdır. Mağazamızda televizorlar, smartfonlar, notbuklar və digər məhsulları tapa bilərsiniz. </p>

            <Swiper className={style.images}
                modules={[EffectCoverflow]}
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={1.7}
                centeredSlides = {true}
                coverflowEffect={{
                    rotate:50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
            >
                {images.map((img,index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt="image" />
                    </SwiperSlide>
                ))}

            </Swiper>

        </section>
    )
}

