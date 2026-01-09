import createFollow_db from "./follow.repo.js";

export default async function createFollow( userId, otherId ){
    
    try{
       const follow = await createFollow_db( userId, otherId );
       return follow;
    }
    catch(error){
        if (error.code === 'P2002') {
            throw new Error("ALREADY_FOLLOWING");
        }
        throw error;
    }

}