import { getfollowingList_db, getPostsList_db, getLikCount_db, getAuthorInfo_db, getLikedbyUser_db } from "./feed.repo.js";

export async function buildFeed( userId, cursor, limit ){
    try {

        // fetch all following ids, make a set
        const followed = await getfollowingList_db(userId);
        console.log("Followed-> ", followed);

        if (followed.length === 0) {
            return { Message: "Follow someone to get there posts" } ;
        }
        const followedIds = followed.map(p => p.followeeId);
        console.log(followedIds)

        // build cursor snippet for db
        let cursorCondition = {};
        if (cursor) {
            cursorCondition = {
                OR: [
                    { createdAt: { lt: new Date(createdAt) } },
                    {
                        createdAt: new Date(createdAt),
                        id: { lt: postId }
                    }
                ]
            };
        }

        // fetch all posts by followedIds
        const posts = await getPostsList_db(followedIds, cursorCondition, limit);
        console.log(posts)

        const postIds = posts.map(p => p.id);
        const authorIds = posts.map(p => p.userId);

        // fetch each post likes n make a map
        const likeCounts = await getLikCount_db(postIds);
        const likeCountMap = new Map( likeCounts.map(item => [item.postId, item._count] ));
        console.log("Likes->", likeCountMap)

        // fetch each post author info n make a map
        const authors = await getAuthorInfo_db(authorIds);
        const authorMap = new Map( authors.map(item => [item.id, item.username] ));
        console.log("Authors->", authorMap)

        // fetch user context likedByMe
        const liked = await getLikedbyUser_db(userId, postIds);
        const likedSet = new Set( liked.map(item => item.postId ));
        console.log(likedSet)

        const items = posts.map(post => ({
            post,
            author: authorMap[post.userId],
            stats: {
                likeCount: likeCountMap[post.id] ?? 0,
                likedByMe: likedSet.has(post.id)
            }
        }));

        return { items };
    }
    catch (error) {
        throw (error);
    }

}