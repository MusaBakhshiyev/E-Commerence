import React from 'react'
import style from "./CatalogSlider.module.css"
import { MdComputer } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { SlScreenSmartphone } from "react-icons/sl";
import { SlScreenTablet } from "react-icons/sl";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CatalogSlider() {
    const data = [
        {
            id: 1,
            img: "https://irshad.az/cdn-cgi/image/width=876/storage/pages/2596/sayt-cover-29.png",
            title:"test1"
        },
        
        {
            id: 2,
            img: "https://irshad.az/cdn-cgi/image/width=876/storage/pages/2600/sayt-cover-1-4.png",
            title:"test2"
        }
    ]
    return (
        <div className={style.catalog_slider}>
            <div className={style.slider}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {data.map(d=>(
                        <SwiperSlide key={d.id}>
                            <img src={d.img} alt="image" />
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>

            <div className={style.catalog}>
                <ul>
                    <li>
                        <span><MdComputer /></span>
                        <span>Notbuklar</span>
                    </li>
                    <li>
                        <span><FaComputer /></span>
                        <span>Personal Kompüterlər</span>
                    </li>
                    <li>
                        <span><MdComputer /></span>
                        <span>Notbuklar</span>
                    </li>
                    <li>
                        <span><SlScreenSmartphone /></span>
                        <span>Smartfonlar</span>
                    </li>
                    <li>
                        <span><SlScreenTablet /></span>
                        <span>Panşetlər</span>
                    </li>
                </ul>
            </div>

        </div>
    )
}
