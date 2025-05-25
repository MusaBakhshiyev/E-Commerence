import style from "./News.module.css"
import image1 from "../../images/NewStoreImage.png"
import image2 from "../../images/StoreInside.png"

import React from 'react'

export default function News() {
  return (
    <section className={style.news_section}>
      <h1>Xəbərlər</h1>
      <div className={style.news}>
        <div className={style.new}>
          <h2>Yeni mağazamız açıldı</h2>
          <img src={image1} alt="new store" />
          <h3>01/05/2025 tarixində "28 may" - da yeni mağazamızın açılışı oldu.</h3>
          <div className={style.content}></div>
        </div>
        <div className={style.new}>
          <h2>Yeni mağazamız açıldı</h2>
          <img src={image2} alt="new store" />
          <h3>01/05/2025 tarixində "28 may" - da yeni mağazamızın açılışı oldu.</h3>
          <div className={style.content}></div>
        </div>
        <div className={style.new}>
          <h2>Yeni mağazamız açıldı</h2>
          <img src={image1} alt="new store" />
          <h3>01/05/2025 tarixində "28 may" - da yeni mağazamızın açılışı oldu.</h3>
          <div className={style.content}></div>
        </div>
      </div>
      <div className={style.new}>
          <h2>Yeni mağazamız açıldı</h2>
          <img src={image2} alt="new store" />
          <h3>01/05/2025 tarixində "28 may" - da yeni mağazamızın açılışı oldu.</h3>
          <div className={style.content}></div>
        </div>
    </section>
  )
}
