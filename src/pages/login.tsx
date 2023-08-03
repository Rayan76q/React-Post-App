import {auth,provider} from "../config/firebase"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () =>{
        await signInWithPopup(auth,provider);
        navigate("/");
    }
    return <div><h1>Login Page</h1>
        <div id="pannel">
        <p>Sign in with Google to continue</p>
        <button onClick={signInWithGoogle}>Sign in</button>
        </div>
    </div>;
}

