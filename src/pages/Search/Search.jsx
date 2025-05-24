import React, { useEffect, useState } from 'react'
import style from "./Search.module.css"
import data from "../Home/data.js"
import ProductCard from "../../components/ProductCard.jsx"
import { useLocation } from 'react-router-dom';

export default function Search() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const title = location.state?.title;

    useEffect(() => {
        const items = data.filter(p => p.title.toLowerCase().includes(title));
        setProducts(items);
    }, [title])

    return (
        <section className={style.search_container}>
            <h1>Axtarış nəticəsi</h1>
            <div className={style.products}>
                {products.length > 0 ?(products.map(p=>
                    <div key={p.id} className={style.product}>
                        <ProductCard product={p}/>
                    </div>
                )):<span>🙄 Nəticə tapılmadı</span>}
            </div>

        </section>
    )
}

