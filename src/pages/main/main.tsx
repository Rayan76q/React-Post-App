import "../../styles/main.css"
import { getDocs, collection } from "firebase/firestore";
import { db,auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";


export interface Post{
    title: string;
    desc: string;
    uid: string;
    username: string;
    id: string;
}

export const Main = () => {
    const [user] = useAuthState(auth);
    const [postList, setPostList] = useState<Post[] | null>(null);
    
    const posteRef = collection(db,"posts");

    const getPosts = async ()=>{
        try{
        const data = await getDocs(posteRef);
        setPostList(data.docs.map((doc)=>({...doc.data(), id:doc.id})) as Post[]);
        }catch(error){
            console.log("Error while Fetching (not logged).");
        }
    } 

    useEffect( ()=>{
        getPosts();
    },[]);

    return (<div><h1>Home Page</h1>{user && 
    <div>{postList?.map((post,key) => (<Post key={key} post={post} />))}</div>}
    </div>);
}

