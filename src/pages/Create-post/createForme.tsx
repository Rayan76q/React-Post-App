import { useForm } from "react-hook-form";
import * as yup from "yup"; 
import {yupResolver} from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore";
import { auth,db } from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";


interface post {
    title: string;
    desc: string;
}


export const CreateForme= ()=>{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title required"),
        desc: yup.string().required("Description missing").max(300).min(3)
    });

    const {register, handleSubmit, formState:{errors}} = useForm<post>({resolver:yupResolver(schema)});

    const postRef = collection(db, "posts");

    const onCreatepost = async (data:post) => {
        await addDoc(postRef, {...data, username: user?.displayName, uid: user?.uid });
        navigate("/");
    }


    return (<><h1>Create post</h1>
        <form onSubmit={handleSubmit(onCreatepost)}>
        <>
        <label htmlFor="inp" className="inp">
        <input type="text" id="inp" placeholder="&nbsp;" {...register("title")}/>
        <span className="label">Title</span>
        <span className="focus-bg"></span>
        </label>
        </>
            {<p style={{color:"red"}}>{errors.title?.message}</p>}
        <>
        <label htmlFor="inp" className="inp">
        <textarea {...register("desc")} />
        <span className="label" id="desc">Description</span>
        <span className="focus-bg"></span>
        </label>
        </>
        {<p style={{color:"red"}}>{errors.desc?.message}</p>}
            <input type="submit" id="button" value="Submit" />
        </form>
    </>);
}