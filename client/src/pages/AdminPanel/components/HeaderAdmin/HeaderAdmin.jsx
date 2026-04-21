import { Link } from "react-router-dom"
import logo2 from "@/assets/logo2.png"
import "./headerAdmin.css"
import DropDownSettings from "@/pages/Home/components/Header/Dropdown/DropDown.jsx"
import settingsIcon from "@/assets/settings-icon.png"

export default function HeaderAdmin () {
    return (
        <>
            <header className="headerAdmin">
                <div className="headerAdmin-box">

                    <div className="headerAdmin-subtitle-logo-box">

                        <Link to="/home">
                            <img className="headerAdmin-logo" src={logo2} alt="logo" />
                        </Link>

                        <h2 className="headerAdmin-subtitle">Admin panel</h2>

                    </div>


                    <div className="headerAdmin-search">
                        <input type="text" placeholder="Пошук фільмів..." aria-label="Search"/>
                    </div>


                    <div className="headerAdmin-right">

                        <DropDownSettings image={settingsIcon}/>
                        
                        <Link className="headerAdmin-pofile" to="/account">
                            <img className="headerAdmin-avatar" src="https://i.pravatar.cc/40?img=21" alt="avatar" />
                        </Link>
                    </div>


                </div>
            </header>
        </>
    )
}