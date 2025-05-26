import { useLocation } from "react-router-dom"
import style from "./Order.module.css"
import React from 'react'

export default function Order() {
    const location = useLocation();
    const totalPrice = location.state?.totalPrice;
    return (
        <section className={style.order_section}>
            <h1>Sifarişi rəsmiləşdir - ({totalPrice} AZN)</h1>
            <div className={style.information}>
                <div className={style.info}>
                    <h2>Ad:</h2>
                    <input placeholder="Adınızı yazın" />
                </div>
                <div className={style.info}>
                    <h2>Soyad:</h2>
                    <input placeholder="Soyadınızı yazın" />
                </div>
                <div className={style.info}>
                    <h2>Nömrə:</h2>
                    <input placeholder="+994 - " />
                </div>
                <button className={style.buy}>Al</button>
            </div>
        </section>
    )
}

