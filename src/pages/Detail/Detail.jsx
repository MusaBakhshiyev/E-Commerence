import style from "./Detail.module.css"
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../../components/ProductCard";
import { FaStar } from "react-icons/fa";

export default function Detail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
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
            <h2>{product.weight} kq</h2>
          </div>
          <div className={style.detail}>
            <h2>Reytinq</h2>
            <h2>{product.rating} <span><FaStar/></span></h2>
          </div>
          <div className={style.detail}>
            <h2>En</h2>
            <h2>{product.dimensions.width} sm</h2>
          </div>
          <div className={style.detail}>
            <h2>Uzunluq</h2>
            <h2>{product.dimensions.height} sm</h2>
          </div>
          <div className={style.detail}>
            <h2>Qalınlıq</h2>
            <h2>{product.dimensions.depth} sm</h2>
          </div>
          <div className={style.detail}>
            <h2>Stok sayı</h2>
            <h2>{product.stock}</h2>
          </div>
           <button onClick={()=>navigate("/order",{state:{totalPrice:(product.price - product.price*product.discountPercentage/100).toFixed(2)}})} className={style.order}>Sifarişi rəsmiləşdir</button>
        </div>
      </div>
    </section>
  )
}

