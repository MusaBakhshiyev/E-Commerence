import React from 'react'
import style from "./Footer.module.css"
import logo from "../images/logo.png"
import { useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className={style.footer}>
            <div className={style.company}>
                <h1>Şirkət</h1>
                <img src={logo} alt="logo" />
                <p onClick={()=>navigate("/about")}>Bizim haqqımızda</p>
                <p>İstifadə şərtləri</p>
                <p>Gizlilik siyasəti</p>
            </div>
            <div className={style.support}>
                <h1>Dəstək</h1>
                <p>Tez-tez verilən suallar</p>
                <p onClick={()=>navigate("/contact")}>Bizimlə əlaqə</p>
                <p>Geri dönüş</p>
            </div>
            <div className={style.contact}>
                <h1>Əlaqə</h1>
                <p>*0000</p>
            </div>
        </footer>
    )
}

