import React from 'react'
import style from "./Footer.module.css"
import logo from "../images/logo.png"

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.company}>
                <h1>Şirkət</h1>
                <img src={logo} alt="logo" />
                <p>Bizim haqqımızda</p>
                <p>İş imkanları</p>
                <p>İstifadə şərtləri</p>
                <p>Gizlilik siyasəti</p>
            </div>
            <div className={style.support}>
                <h1>Dəstək</h1>
                <p>Tez-tez verilən suallar</p>
                <p>Bizimlə əlaqə</p>
                <p>Geri dönüş</p>
            </div>
            <div className={style.contact}>
                <h1>Əlaqə</h1>
                <p>*0000</p>
            </div>
        </footer>
    )
}

