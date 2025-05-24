import React from 'react'
import CatalogSlider from './CatalogSlider'
import style from "./Home.module.css"
import NewProducts from './NewProducts'
import PopularCategories from './PopularCategories'

export default function Home() {
    return (
        <section>
            <CatalogSlider/>
            <NewProducts/>
            <PopularCategories/>
        </section>
    )
}

