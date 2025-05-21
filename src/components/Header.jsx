import logo from '../images/logo.png'
import style from "./Header.module.css"
import { IoNewspaperOutline } from "react-icons/io5";
import { GrContact } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { IoStorefrontOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import { RiScales3Line } from "react-icons/ri";
import { RiHeartAdd2Line } from "react-icons/ri";
import { TbShoppingCartPlus } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { RiMenuFoldLine } from "react-icons/ri";

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Header() {

    const navigate = useNavigate();
    const cartCount = useSelector(state =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const favoriteCount = useSelector(state => state.favorite.items.length);

    const compareCount = useSelector(state => state.compare.items.length);


    return (
        <header>
            <div className={style.header1}>
                <NavLink to='/'>
                    <span><IoHomeOutline /></span>
                    <span>Ana səhifə</span>
                </NavLink>
                <NavLink>
                    <span><IoNewspaperOutline /></span>
                    <span>Xəbərlər</span>
                </NavLink>
                <NavLink>
                    <span><GrContact /></span>
                    <span>Əlaqə</span>
                </NavLink>
                <NavLink>
                    <span><TbTruckDelivery /></span>
                    <span>Ödəniş və çatdırılma</span>
                </NavLink>
                <NavLink>
                    <span><IoStorefrontOutline /></span>
                    <span>Mağazalar</span>
                </NavLink>
                <NavLink>
                    <span><GrMapLocation /></span>
                    <span>Baş ofis - 28may</span>
                </NavLink>
            </div>


            <div className={style.header2}>
                <img src={logo} alt="logo" />
                <div className={style.search}>
                    <input type="text" />
                    <button><BsSearch /><span>Axtar</span></button>
                </div>
                <div className={style.options}>
                    <button onClick={() => navigate("/compare")} ><span><RiScales3Line /> <span className={style.compare_count}>{compareCount}</span></span> <span>Müqayisə</span> </button>
                    <button onClick={() => navigate("/favorite")}><span><RiHeartAdd2Line />  <span className={style.favorite_count}>{favoriteCount}</span> </span><span>Bəyəndim</span></button>
                    <button onClick={() => navigate("/cart")}><span><TbShoppingCartPlus /> <span className={style.cart_count}>{cartCount}</span></span> <span>Səbət</span></button>
                </div>
                <button className={style.catalog}><span><RiMenuFoldLine /></span> <span>Katalog</span> </button>
            </div>
        </header>

    )
}

