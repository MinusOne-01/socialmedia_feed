import { createPost_db, getPostInfo_db } from "./post.repo.js";

export async function createPost( userId, content ){
    try{
        const post = await createPost_db(userId, content);
        return post;
    }
    catch(error){
        throw(error);
    }
}

export async function getPostInfo( postId ){
    try{

        const post = getPostInfo_db( postId );
        return post;

    }
    catch(error){
        throw(error);
    }
}