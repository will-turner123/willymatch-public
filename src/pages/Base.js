import NavBar from "../components/NavBar";
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <>
        <NavBar></NavBar>
        
        <Outlet />
        </>
    )
}

export default Layout;