import { useState } from "react";
import { Link } from "react-router-dom";

import "./dropDown.css"


export default function DropDownSettings (props){
    
    const[open, setOpen] = useState(false)

    return (
        <div>
            <img className="dropdown-settings-icon" src={props.image} alt="settings" onClick={() => setOpen(!open)}/>

            {open && (
                <div className="dropdown-menu">
                    <ul>
                        <li className="dropdown-list">
                            <Link to="/settings" onClick={() => setOpen(false)} >Налаштування</Link>
                        </li>
                        <li className="dropdown-list">
                            <Link to="/favorite" onClick={() => setOpen(false)} >Улюблене</Link>
                        </li>
                        <li className="dropdown-list" onClick={() => setOpen(false)} >Вихід</li>

                        <li className="dropdown-list">
                            <Link to="/adminPanel" onClick={() => setOpen(false)} >Адмін панель</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}