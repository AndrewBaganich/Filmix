import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin"
import SideBar from "./components/SideBarAdmin/SideBar"
import { Outlet } from "react-router-dom"
import "./adminLayout.css"


export default function AdminLayout () {
    return (
        <>
            <HeaderAdmin/>
            
            <div className="adminPanel">
                <SideBar/>

                <main className="adminPanel-main">
                    <Outlet/>
                </main>

            </div>
        </>
    )
}
