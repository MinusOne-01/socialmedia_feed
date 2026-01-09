import createComment_db from "./comment.repo.js";

export default async function createComment( userId, otherId, content ){
    
    try{
       const like = await createComment_db( userId, otherId, content );
       return like;
    }
    catch(error){
        if (error.code === 'P2003') {
            throw new Error("INVALID_POST");
        }
        throw error;
    }

}