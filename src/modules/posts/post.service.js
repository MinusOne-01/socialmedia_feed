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

        const result = await getPostInfo_db( postId );
        console.log(result);

        const formattedResponse = {
            post: {
                id: result.id,
                content: result.content,
                author: result.userId,
            },
            stats: {
                likeCount: result._count.postLikes,
                commentCount: result._count.postComments,
                // Check if the array contains the record we filtered for
                likedByMe: result.postLikes ? result.postLikes.length > 0 : false
            },
            comments: result.postComments
        };

        return formattedResponse;

    }
    catch(error){
        throw(error);
    }
}