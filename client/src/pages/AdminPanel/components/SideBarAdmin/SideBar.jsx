import { NavLink } from "react-router-dom"
import "./sideBar.css"

export default function SideBar() {
    return(
        <>
            <header className="sidebar">
                <div className="sidebar-box">
                    <nav className="sidebar-content">
                        <NavLink to="/adminPanel" className="sidebar-list" end>
                            Дашборд
                        </NavLink>

                        <NavLink to="/adminPanel/crud" className="sidebar-list">
                            CRUD
                        </NavLink>

                        <NavLink to="/adminPanel/users" className="sidebar-list">
                            Користувачі
                        </NavLink>
                    </nav>
                </div>
            </header>
        </>
    )
}