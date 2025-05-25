import { useState, useEffect } from 'react'
import style from "./NewProduct.module.css"
import data from "./data.js"
import ProductCard from "../../components/ProductCard.jsx";

import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("televisions");

  useEffect(() => {
    if (category === "laptops" || category === "smartphones") {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    }
    else {
      const filteredProducts = data.filter((product) => product.category === category);
      setProducts(filteredProducts);
    }

  }, [category]);




  return (
    <section className={style.newproducts}>
      <h2>Yeni Məhsullar</h2>
      <div className={style.categories}>
        <button onClick={() => setCategory("televisions")} className={category === "televisions" ? style.isActive : ""}>Telovizorlar</button>
        <button onClick={() => setCategory("laptops")} className={category === "laptops" ? style.isActive : ""}>Notbuklar</button>
        <button onClick={() => setCategory("smartphones")} className={category === "smartphones" ? style.isActive : ""}>Smartfonlar</button>
      </div>


      <Swiper className={`${style.products} products-swiper-new`}
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        slidesPerView={3}
        spaceBetween={20}
        scrollbar={{ draggable: true }}
        loop={true}
        observer={true}
        observeParents={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },

          500: {
            slidesPerView: 1.5,
          },
          701: {
            slidesPerView: 2,
          },
          931: {
            slidesPerView: 2.5,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {products.map((p) => (
          <SwiperSlide className={style.product} key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>


    </section>
  )
}

