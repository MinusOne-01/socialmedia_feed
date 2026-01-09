import createLike_db from "./like.repo.js";

export default async function createLike( userId, otherId ){
    
    try{
       const like = await createLike_db( userId, otherId );
       return like;
    }
    catch(error){
        if (error.code === 'P2002') {
            const message = "Already liked";
            return message;
        }
        if (error.code === 'P2003') {
            throw new Error("INVALID_POST");
        }
        throw error;
    }

}