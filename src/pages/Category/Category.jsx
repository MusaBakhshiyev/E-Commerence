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
        <section className={style.category_section}>
            <div className={style.products}>
                {products.length > 0 && products.map(p=>
                    <div key={p.id} className={style.product}>
                        <ProductCard product={p} />
                    </div>
                )
                }
            </div>
        </section>
    )
}

