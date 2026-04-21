import "./header.css"
import settingsIcon from "@/assets/settings-icon.png";
import logo from "@/assets/logo2.png"
import DropDownSettings from "./Dropdown/DropDown.jsx"
import { Link, NavLink } from "react-router-dom";



export default function Header (){
    return(
     <header className="header">

        <div className="header-inner">
            <Link className="header-box-logo" to="/">
                <img className="header-logo" src={logo} alt="logo2" />
            </Link>

            <nav className="header-nav">
                <NavLink className="header-buttons" to="/home" end>Головна</NavLink>
                <NavLink className="header-buttons" to="/home/movies">Фільми</NavLink>
                <NavLink className="header-buttons" to="/home/serials">Серіали</NavLink>
                <NavLink className="header-buttons" to="/home/news">Новинки</NavLink>
            </nav>

            <div className="header-right">

                <div className="header-search">
                    <input type="text" placeholder="Пошук фільмів..." aria-label="Search"/>
                </div>

                <DropDownSettings image={settingsIcon}/>

                <Link className="header-pofile" to="/account">
                    <img className="header-avatar" src="https://i.pravatar.cc/40?img=21" alt="avatar" />
                </Link>

            </div>
        </div>
    </header>
    );
}

