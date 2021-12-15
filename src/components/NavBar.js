import React, { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import External from './External';
import firebase from 'firebase/compat/app';



const NavItems = () => {
    const [user, setUser] = useState(firebase.auth().currentUser)
    const location = useLocation();
    const {pathname} = location;

    useEffect(() => {setUser(firebase.auth().currentUser)})


    const splitLocation = pathname.split("/")[1];
    if(user === null){
        return(
            <ul class="navbar-nav">
                <li class={splitLocation[1] === "login" ? "nav-item active p-0" : "nav-item p-0"}>
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li class={splitLocation[1] === "register" ? "nav-item active p-0" : "nav-item p-0"}>
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    }
    else{
        return(
            <ul class="navbar-nav">
                <li class={splitLocation[1] === "discover" ? "nav-item active p-0" : "nav-item p-0"}>
                    <Link exact="true" to="/discover" className="nav-link">Discover</Link>
                </li>
                {/* <li class={splitLocation[1] === "profile" ? "nav-item active p-0" : "nav-item p-0"}>
                    <Link exact="true" to="/profile" className="nav-link">Profile</Link>
                </li> */}
                <li class={splitLocation[1] === "logout" ? "nav-item active p-0" : "nav-item p-0"}>
                    <Link exact="true" to="/logout" className="nav-link">Logout</Link>
                </li>
            </ul>
        )
    }
}

const NavBar = () => {
    const location = useLocation();
    const {pathname} = location;

    const splitLocation = pathname.split("/");
    // navbar brand could be missing custom attributes
    return (
        <nav class="navbar navbar-expand-lg fixed-top navbar-transparent" color-on-scroll="100">
            <div class="container">
                <div class="navbar-translate">
                    <Link exact="true" to="/" className="navbar-brand">
                        <div rel="tooltip" title="Best dating app ever!" data-placement="bottom"><span>Willy</span>Match</div>
                    </Link>
                    <button class="navbar-toggler navbar-toggler" type="button" 
                        data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index"
                        aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse justify-content-end" id="navigation">
                    <div class="navbar-collapse-header">
                        <div class="row">
                            <div class="col-6 collapse-brand">
                                WillyMatch
                            </div>
                            <div class="col-6 collapse-close text-right">
                                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navigation"
                                    aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle Navigation">
                                        <i class="tim-icons icon-simple-remove"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <NavItems></NavItems>
                </div>
            </div>
            <External script="navbar"/>
        </nav>
    )
}

export default NavBar;
