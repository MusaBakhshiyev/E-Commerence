import style from "./Detail.module.css"
import React from 'react'
import { useLocation } from "react-router-dom"
import ProductCard from "../../components/ProductCard";

export default function Detail() {
  const location = useLocation();
  const product = location.state?.product;
  return (
    <section className={style.detail_container}>
      <div className={style.detail_product}>
        <div className={style.product}>
          <ProductCard product={product} />
        </div>
        <div className={style.details}>
          <div className={style.detail}>
            <h2>Brend</h2>
            <h2>{product.brand}</h2>
          </div>
          <div className={style.detail}>
            <h2>Çəki</h2>
            <h2>{product.weight}</h2>
          </div>
          <div className={style.detail}>
            <h2>Reytinq</h2>
            <h2>{product.rating}</h2>
          </div>
          <div className={style.detail}>
            <h2>En</h2>
            <h2>{product.dimensions.width}</h2>
          </div>
          <div className={style.detail}>
            <h2>Uzunluq</h2>
            <h2>{product.dimensions.height}</h2>
          </div>
          <div className={style.detail}>
            <h2>Qalınlıq</h2>
            <h2>{product.dimensions.depth}</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

