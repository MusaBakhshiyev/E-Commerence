import React, { useState } from 'react'
import style from './Compare.module.css';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import { FaStar } from "react-icons/fa";

import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Compare() {
    const compareItems = useSelector(state => state.compare.items);
    const categories = compareItems.map(item => item.category);
    const uniqueCategories = [...new Set(categories)];
    const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);
    return (
        <section className={style.compare_section}>
            <div className={style.compare}>


                <div className={style.compare_products}>
                    <div className={style.categories}>
                        {uniqueCategories.map((c) => (
                            <button onClick={() => setSelectedCategory(c)} className={`${style.category} ${c == selectedCategory ? style.isActive : ""}`} key={c}>
                                <h2>{c}</h2>
                            </button>
                        ))}
                    </div>
                    <Swiper className={`products-swiper-compare`}
                        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                        slidesPerView={2}
                        spaceBetween={0}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            700: {
                                slidesPerView: 1.5,
                                spaceBetween: 15,
                            },
                            780: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            1000: {
                                slidesPerView: 2.5,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {compareItems.filter(i => i.category == selectedCategory).map((p) => (
                            <SwiperSlide className={style.product} key={p.id}>
                                <div className={style.products}>
                                    <ProductCard product={p} />
                                </div>
                                <div className={style.product_info}>
                                    <h2>{p.brand}</h2>
                                    <h2>{p.weight} kq</h2>
                                    <h2 className={style.rating}><span>{p.rating}</span> <span><FaStar /></span></h2>
                                    <h2>{p.dimensions.width} sm</h2>
                                    <h2>{p.dimensions.height} sm</h2>
                                    <h2>{p.dimensions.depth} sm</h2>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                <div className={style.compare_header}>
                    <div className={style.categories}>
                        {uniqueCategories.map((c) => (
                            <button onClick={() => setSelectedCategory(c)} className={`${style.category} ${c == selectedCategory ? style.isActive : ""}`} key={c}>
                               {c=="laptops"&& <h2>notbuklar</h2>}
                               {c=="smartphones"&& <h2>smartfonlar</h2>}
                               {c=="televisions"&& <h2>televizorlar</h2>}
                                
                            </button>
                        ))}
                    </div>
                    <div className={style.headers}>
                        <h2>Brend</h2>
                        <h2>Çəki</h2>
                        <h2>Reytinq</h2>
                        <h2>En</h2>
                        <h2>Uzunluq</h2>
                        <h2>Qalınlıq</h2>
                    </div>

                </div>
            </div>
        </section>
    )
}

