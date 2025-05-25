import style from "./Category.module.css"
import React, { useEffect } from 'react'
import ProductCard from "../../components/ProductCard"
import { useLocation } from "react-router-dom"
import { useState } from "react";
import data from "../Home/data.js"

export default function Category() {
    const location = useLocation();
    const category = location.state?.category;
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState("priceUp");

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


    useEffect(() => {
        if (order == "priceUp") {
            setProducts(prev => prev.sort((a,b)=>a.price-b.price));
            console.log("up");
        }
        else if (order == "priceDown") {
            setProducts(prev => prev.sort((a,b)=>b.price-a.price));
            console.log("down");
        }
        if (order == "discount") {
            setProducts(prev => prev.sort((a,b)=>b.discountPercentage-a.discountPercentage));
        }
        if (order == "time") {
            setProducts(prev => prev.sort((a,b)=>new Date(b.meta.createdAt)-new Date(a.meta.createdAt)));
        }

    }, [order])

    return (
        <section className={style.category_section}>
            <select className={style.orders}>
                <option onClick={(e) => setOrder(e.value)} value="priceUp">Qiymət (artan sıra ilə)</option>
                <option onClick={(e) => setOrder(e.value)} value="priceDown">Qiymət (azalan sıra ilə)</option>
                <option onClick={(e) => setOrder(e.value)} value="discount">Endirimli məhsullar</option>
                <option onClick={(e) => setOrder(e.value)} value="time">Yeni məhsullar</option>
            </select>
            <div className={style.products}>
                {products.length > 0 && products.map(p =>
                    <div key={p.id} className={style.product}>
                        <ProductCard product={p} />
                    </div>
                )
                }
            </div>
        </section>
    )
}

