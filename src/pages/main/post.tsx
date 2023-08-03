import { addDoc,getDocs, collection,query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as postType } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "../../styles/post.css"

interface Props {
    post: postType;
}

interface Like {
    uid: string;
}

export const Post = (props : Props)=>{
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes , setLikes] = useState<Like[] | null>(null);

    
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postid","==",post.id ));

    const addLike = async () => {
        try{
        await addDoc(likesRef, {uid:user?.uid , postid: post.id});
        if(user){
        setLikes((prev)=> prev ? ([...prev, {uid:user.uid}]) : ([{uid:user.uid}]));
        }
        }
        catch(error){
            console.log(error);
        }
    }

    const removeLike = async () => {
        try{
        const likeToDeleteQuery = query(likesRef, where("postid","==",post.id), where("uid","==",user?.uid) );
        const likeToDeleteDocs = await getDocs(likeToDeleteQuery);
        const likeToDelete = doc(db,"likes",likeToDeleteDocs.docs[0].id);
        await deleteDoc(likeToDelete);
         if(user){
         setLikes((prev)=> prev && prev.filter(like=> like.uid!==user.uid));
         }
        }
        catch(error){
            console.log(error);
        }
    }

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=> ({uid: doc.data().uid})));
    }

    const hasLiked = likes?.find((like)=> like.uid === user?.uid);

    useEffect(()=>{
        getLikes();
    },[]);

    return (
    <div className="post">
        <div className="title">
            <h3>{post.title}</h3>
        </div>
        <div className="desc">
            <p>{post.desc}</p>
        </div>
        <div className="footer">
            <p id="sign">@{post.username}</p><div id="liking"><button onClick={hasLiked? removeLike : addLike}>{hasLiked ? <>&#128078;</> :<>&#128077;</> }</button>{likes && <span>
                
                Likes:&nbsp;{likes.length}</span>}</div>
        </div>
    </div>
    );
}