import { getfollowingList_db, getPostsList_db, getLikCount_db, getAuthorInfo_db, getLikedbyUser_db } from "./feed.repo.js";

export async function buildFeed( userId, cursor, limit ){
    try {

        // fetch all following ids, make a set
        const followed = await getfollowingList_db(userId);


        if (followed.length === 0) {
            return { Message: "Follow someone to get there posts" } ;
        }
        const followedIds = followed.map(p => p.followeeId);


        // build cursor snippet for db
        let cursorCondition = {};
        if (cursor) {
            cursorCondition = {
                OR: [
                    { createdAt: { lt: cursor.createdAt } },
                    {
                        createdAt: cursor.createdAt,
                        id: { lt: cursor.postId }
                    }
                ]
            };
        }

        // fetch all posts by followedIds
        const posts = await getPostsList_db(followedIds, cursorCondition, limit);


        const postIds = posts.map(p => p.id);
        const authorIds = posts.map(p => p.userId);

        // fetch each post likes n make a map
        const likeCounts = await getLikCount_db(postIds);
        const likeCountMap = new Map( likeCounts.map(item => [item.postId, item._count] ));


        // fetch each post author info n make a map
        const authors = await getAuthorInfo_db(authorIds);
        const authorMap = new Map( authors.map(item => [item.id, item.username] ));


        // fetch user context likedByMe
        const liked = await getLikedbyUser_db(userId, postIds);
        const likedSet = new Set( liked.map(item => item.postId ));


        const items = posts.map(post => ({
            post,
            author: authorMap[post.userId],
            stats: {
                likeCount: likeCountMap.get(post.id) ?? 0,
                likedByMe: likedSet.has(post.id)
            }
        }));

        let nextCursor = null;

        if (posts.length === limit) {
            const last = posts[posts.length - 1];
            nextCursor = {
                createdAt: last.createdAt,
                postId: last.id
            };
        }

        return { items, nextCursor };
    }
    catch (error) {
        throw (error);
    }

}