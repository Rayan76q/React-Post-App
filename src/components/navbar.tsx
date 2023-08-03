import { Link } from "react-router-dom"
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";
import "../styles/navbar.css"

export const Navbar = () =>{
    const [user, loading,error] = useAuthState(auth);

    const logOut = async ()=>{
       await signOut(auth);
    }

    return (<div className="navbar">
        <Link to="/" className="links">Home</Link>
        {!user ? <Link to="/login" className="links">Login</Link>:
         <Link to="/createposte" className="links">Post</Link>}

        <div id = "user">
            {user && (
                <>
            <span>{user?.displayName}</span>
            <img src={user?.photoURL || ""} alt="" width="40" height="40"/>
            <button onClick={logOut} id="logout">Log Out</button></>)
            }
        </div>
    </div>);
}